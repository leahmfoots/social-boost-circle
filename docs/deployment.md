
# Deployment Guide

This comprehensive guide covers deploying RoundAbout to various platforms, from simple static hosting to full-stack cloud deployments.

## 🎯 Deployment Overview

### Deployment Options
- **Vercel** (Recommended) - Zero-config React deployments
- **Netlify** - JAMstack hosting with form handling
- **Railway** - Full-stack with database hosting
- **Render** - Simple cloud hosting
- **Docker** - Containerized deployment anywhere
- **GitHub Pages** - Free static hosting
- **Self-hosted** - Your own VPS or server

### Architecture Considerations
- **Frontend**: Static React app (SPA)
- **Backend**: Supabase (BaaS) or custom API
- **Database**: PostgreSQL (Supabase) or SQLite
- **CDN**: Automatic with most platforms
- **SSL**: Automatic with custom domains

## 🚀 Quick Deploy Options

### 1. Deploy to Vercel (Recommended)

#### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/roundabout)

#### Manual Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod

# Follow the prompts to configure:
# - Project name
# - Framework preset (Vite)
# - Build command: npm run build
# - Output directory: dist
```

#### Vercel Configuration
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

### 2. Deploy to Netlify

#### Drag & Drop Deploy
1. Run `npm run build`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the `dist` folder to deploy

#### Git-based Deploy
```bash
# Connect your Git repository to Netlify
# Build settings:
# - Build command: npm run build
# - Publish directory: dist
```

#### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

### 3. Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

Create `railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

## 🐳 Docker Deployment

### Multi-Stage Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration
Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if needed)
    location /api/ {
        proxy_pass http://backend:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: roundabout
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./supabase/migrations:/docker-entrypoint-initdb.d
    restart: unless-stopped
    
  redis:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  postgres_data:
```

### Deploy with Docker
```bash
# Build image
docker build -t roundabout .

# Run container
docker run -d \
  --name roundabout \
  -p 80:80 \
  -e VITE_SUPABASE_URL=your-url \
  -e VITE_SUPABASE_ANON_KEY=your-key \
  roundabout

# Or use Docker Compose
docker-compose up -d
```

## ☁️ Cloud Platform Deployments

### AWS S3 + CloudFront

#### S3 Static Website
```bash
# Build the app
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Configure S3 bucket for static website hosting
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

#### CloudFront Distribution
```json
{
  "DistributionConfig": {
    "Origins": [{
      "DomainName": "your-bucket.s3.amazonaws.com",
      "Id": "S3-roundabout",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }],
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3-roundabout",
      "ViewerProtocolPolicy": "redirect-to-https",
      "Compress": true,
      "ForwardedValues": {
        "QueryString": false,
        "Cookies": {"Forward": "none"}
      }
    },
    "CustomErrorResponses": [{
      "ErrorCode": 404,
      "ResponseCode": 200,
      "ResponsePagePath": "/index.html"
    }]
  }
}
```

### Google Cloud Platform

#### App Engine Deployment
```yaml
# app.yaml
runtime: nodejs18

handlers:
  - url: /static
    static_dir: dist/static
    
  - url: /.*
    static_files: dist/index.html
    upload: dist/index.html
    
env_variables:
  VITE_SUPABASE_URL: "your-supabase-url"
  VITE_SUPABASE_ANON_KEY: "your-supabase-key"
```

```bash
# Deploy to App Engine
gcloud app deploy
```

### Azure Static Web Apps
```bash
# Install Azure CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy --env production
```

## 🌐 Custom Domain Setup

### DNS Configuration
```dns
# A Record (for root domain)
Type: A
Name: @
Value: [Your hosting provider's IP]

# CNAME Record (for www subdomain)
Type: CNAME
Name: www
Value: your-app.vercel.app

# For custom domains on various platforms:
# Vercel: your-app.vercel.app
# Netlify: your-app.netlify.app
# Railway: your-app.railway.app
```

### SSL Certificate Setup
Most modern hosting platforms provide automatic SSL certificates. For custom setups:

```bash
# Using Let's Encrypt with Certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Verify SSL
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

## 📊 Environment-Specific Configurations

### Production Environment Variables
```env
# Production .env
NODE_ENV=production
VITE_APP_ENV=production
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-prod-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-live-key
VITE_APP_URL=https://yourdomain.com
VITE_DEBUG_LOGS=false
```

### Staging Environment
```env
# Staging .env
NODE_ENV=production
VITE_APP_ENV=staging
VITE_SUPABASE_URL=https://your-staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-staging-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-test-key
VITE_APP_URL=https://staging.yourdomain.com
VITE_DEBUG_LOGS=true
```

## 🔒 Security Configuration

### Security Headers
```javascript
// Add to your hosting platform or reverse proxy
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};
```

### Environment Secrets Management
```bash
# Vercel
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Netlify
netlify env:set VITE_SUPABASE_URL "your-value"

# Railway
railway variables set VITE_SUPABASE_URL=your-value

# Docker secrets
echo "your-secret-value" | docker secret create supabase_key -
```

## 📈 Performance Optimization

### Build Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Disable in production
  },
});
```

### CDN Configuration
```javascript
// Configure CDN for static assets
const CDN_URL = 'https://cdn.yourdomain.com';

// In build process, replace asset URLs
// This can be done with a Vite plugin or build script
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      
      # Deploy to Vercel
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Automated Testing
```yaml
  e2e-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run preview &
      - run: npm run test:e2e
```

## 📊 Monitoring and Analytics

### Error Tracking
```javascript
// Install Sentry
npm install @sentry/react

// Configure in main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_APP_ENV,
});
```

### Performance Monitoring
```javascript
// Web Vitals tracking
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onFCP(console.log);
onLCP(console.log);
onTTFB(console.log);
```

### Uptime Monitoring
```javascript
// Health check endpoint for monitoring services
// Add to your hosting platform or API
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

## 🚨 Rollback Procedures

### Quick Rollback
```bash
# Vercel
vercel rollback [deployment-url]

# Netlify
netlify deploy --prod --dir=previous-dist

# Docker
docker tag roundabout:previous roundabout:latest
docker service update --image roundabout:latest roundabout_app
```

### Blue-Green Deployment
```bash
#!/bin/bash
# blue-green-deploy.sh

CURRENT=$(curl -s https://yourdomain.com/api/version)
NEW_VERSION=$1

# Deploy to green environment
deploy_to_green $NEW_VERSION

# Run health checks
if health_check_green; then
  # Switch traffic
  switch_traffic_to_green
  echo "Deployment successful"
else
  echo "Health check failed, keeping current version"
  exit 1
fi
```

## 🔧 Troubleshooting Deployments

### Common Issues

#### Build Failures
```bash
# Check build locally
npm run build

# Clear cache and retry
rm -rf node_modules dist .vite
npm install
npm run build
```

#### Environment Variable Issues
```bash
# Verify environment variables are set
printenv | grep VITE_

# Check in production build
console.log(import.meta.env.VITE_SUPABASE_URL)
```

#### Routing Issues (404 on Refresh)
Ensure your hosting platform is configured for SPA routing:
```nginx
# Nginx
try_files $uri $uri/ /index.html;

# Apache
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

#### Performance Issues
```bash
# Analyze bundle
npm run build:analyze

# Check for large dependencies
npm ls --depth=0 | grep MB
```

## 📞 Deployment Support

### Platform-Specific Help
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Railway**: [docs.railway.app](https://docs.railway.app)

### Community Resources
- **GitHub Discussions**: Deployment-specific questions
- **Discord**: Real-time deployment help
- **Documentation**: Platform-specific guides

---

Next: [Configuration Guide](config.md) →
