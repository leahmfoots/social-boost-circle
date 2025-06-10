
# Deployment Guide

This document provides comprehensive instructions for deploying the RoundAbout platform across different environments, from development to production.

## Deployment Overview

The RoundAbout platform uses a modern deployment stack:
- **Frontend**: React application built with Vite
- **Backend**: Supabase (Database, Authentication, Edge Functions)
- **Hosting**: Lovable platform for staging, optional custom hosting for production
- **CDN**: Integrated content delivery for static assets
- **Domain**: Custom domain support available

## Prerequisites

### Required Accounts and Services
- [ ] Supabase account and project
- [ ] Stripe account (for payments)
- [ ] Custom domain (optional, for production)
- [ ] Email service provider (for notifications)

### Environment Setup
- [ ] Node.js 18+ installed
- [ ] Git repository configured
- [ ] Environment variables configured
- [ ] SSL certificates (for custom domains)

## Environment Configuration

### Development Environment
```bash
# Local development setup
npm install
npm run dev

# Environment variables (.env.local)
VITE_SUPABASE_URL=your-development-supabase-url
VITE_SUPABASE_ANON_KEY=your-development-anon-key
```

### Staging Environment
```bash
# Staging configuration
VITE_SUPABASE_URL=your-staging-supabase-url
VITE_SUPABASE_ANON_KEY=your-staging-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Production Environment
```bash
# Production configuration
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Supabase Setup

### Database Migration
```sql
-- Run migrations in order
\i supabase/migrations/001_initial_schema.sql
\i supabase/migrations/002_add_social_accounts.sql
\i supabase/migrations/003_add_engagement_system.sql
```

### Edge Functions Deployment
```bash
# Deploy all edge functions
supabase functions deploy create-subscription
supabase functions deploy check-subscription
supabase functions deploy customer-portal
supabase functions deploy connect-social-account

# Set environment variables
supabase secrets set STRIPE_SECRET_KEY=sk_...
supabase secrets set INSTAGRAM_CLIENT_SECRET=...
supabase secrets set TWITTER_CLIENT_SECRET=...
```

### Row Level Security (RLS) Setup
```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## Frontend Deployment

### Build Process
```bash
# Install dependencies
npm ci

# Run tests
npm run test

# Build for production
npm run build

# Preview build locally
npm run preview
```

### Build Optimization
```typescript
// vite.config.ts optimization
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
        },
      },
    },
    sourcemap: true,
    minify: 'terser',
  },
});
```

### Lovable Platform Deployment
```bash
# Automatic deployment on Lovable
# 1. Click "Publish" button in Lovable interface
# 2. Choose deployment settings
# 3. Configure custom domain (if needed)
# 4. Deploy to staging or production
```

### Custom Hosting Deployment

#### Netlify Deployment
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### Vercel Deployment
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

#### AWS S3 + CloudFront
```bash
# Build and deploy to S3
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Database Deployment

### Production Database Setup
```sql
-- Create production database
CREATE DATABASE roundabout_production;

-- Run all migrations
\i migrations/001_initial_schema.sql
\i migrations/002_add_indexes.sql
\i migrations/003_add_rls_policies.sql

-- Create database backups
pg_dump roundabout_production > backup_$(date +%Y%m%d).sql
```

### Connection Pooling
```javascript
// Supabase connection configuration
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
```

## API Deployment

### Edge Functions Configuration
```typescript
// Function environment configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
const rateLimiter = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
};
```

### API Monitoring
```typescript
// Health check endpoint
export const healthCheck = async (req: Request) => {
  const checks = {
    database: await checkDatabase(),
    stripe: await checkStripe(),
    socialAPIs: await checkSocialAPIs(),
  };
  
  const isHealthy = Object.values(checks).every(check => check.status === 'ok');
  
  return new Response(JSON.stringify({
    status: isHealthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString(),
  }), {
    status: isHealthy ? 200 : 503,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

## SSL and Security

### SSL Certificate Setup
```bash
# For custom domains, configure SSL
# Let's Encrypt with Certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Verify SSL configuration
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

### Security Headers
```nginx
# Nginx security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;
```

## CDN Configuration

### CloudFront Setup
```json
{
  "DistributionConfig": {
    "Origins": [{
      "DomainName": "your-origin-domain.com",
      "Id": "S3-roundabout-assets",
      "CustomOriginConfig": {
        "HTTPPort": 443,
        "OriginProtocolPolicy": "https-only"
      }
    }],
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3-roundabout-assets",
      "ViewerProtocolPolicy": "redirect-to-https",
      "Compress": true,
      "CachePolicyId": "managed-caching-optimized"
    }
  }
}
```

## Monitoring and Logging

### Application Monitoring
```typescript
// Error tracking setup
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring
```typescript
// Performance tracking
const trackPageLoad = () => {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    analytics.track('Page Load Time', {
      loadTime: perfData.loadEventEnd - perfData.loadEventStart,
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
    });
  });
};
```

### Log Aggregation
```bash
# Centralized logging setup
# Configure log shipping to aggregation service
tail -f /var/log/nginx/access.log | your-log-shipper
```

## Backup and Recovery

### Database Backups
```bash
# Automated daily backups
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > "backup_$DATE.sql"
aws s3 cp "backup_$DATE.sql" s3://your-backup-bucket/
rm "backup_$DATE.sql"
```

### Application Backups
```bash
# Code and configuration backup
git archive --format=tar.gz HEAD > "app_backup_$(date +%Y%m%d).tar.gz"
aws s3 cp "app_backup_$(date +%Y%m%d).tar.gz" s3://your-backup-bucket/code/
```

### Recovery Procedures
```bash
# Database recovery
pg_restore --clean --if-exists -d $DATABASE_URL backup_file.sql

# Application recovery
git checkout main
npm ci
npm run build
```

## Deployment Pipeline

### CI/CD with GitHub Actions
```yaml
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
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Production
        run: |
          npm run build
          # Deploy to your hosting platform
```

### Blue-Green Deployment
```bash
# Blue-green deployment script
#!/bin/bash
CURRENT_ENV=$(get_current_environment)
NEW_ENV=$([ "$CURRENT_ENV" = "blue" ] && echo "green" || echo "blue")

# Deploy to new environment
deploy_to_environment $NEW_ENV

# Run health checks
if health_check $NEW_ENV; then
  # Switch traffic
  switch_traffic_to $NEW_ENV
  echo "Deployment successful to $NEW_ENV"
else
  echo "Health check failed, rolling back"
  exit 1
fi
```

## Performance Optimization

### Asset Optimization
```typescript
// Bundle analysis
import { defineConfig } from 'vite';
import { Bundle } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    Bundle({
      filename: 'dist/stats.html',
      open: true,
    }),
  ],
});
```

### Caching Strategy
```nginx
# Nginx caching configuration
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location /api/ {
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

## Rollback Procedures

### Application Rollback
```bash
# Quick rollback script
#!/bin/bash
PREVIOUS_VERSION=$(git rev-parse HEAD~1)
git checkout $PREVIOUS_VERSION
npm ci
npm run build
deploy_to_production
```

### Database Rollback
```sql
-- Database rollback procedure
BEGIN;
-- Apply reverse migration
-- Verify data integrity
-- COMMIT or ROLLBACK based on verification
```

## Post-Deployment Checklist

### Immediate Verification
- [ ] Application loads successfully
- [ ] User authentication works
- [ ] Database connections are stable
- [ ] API endpoints respond correctly
- [ ] Payment processing functions
- [ ] Social media integrations work

### Performance Verification
- [ ] Page load times meet targets
- [ ] API response times are acceptable
- [ ] Database queries perform efficiently
- [ ] CDN is serving assets correctly

### Security Verification
- [ ] SSL certificates are valid
- [ ] Security headers are present
- [ ] Authentication is enforced
- [ ] Data encryption is active

### Monitoring Setup
- [ ] Error tracking is configured
- [ ] Performance monitoring is active
- [ ] Uptime monitoring is running
- [ ] Log aggregation is working
- [ ] Alerts are configured

## Troubleshooting

### Common Deployment Issues

**Build Failures**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment Variable Issues**
```bash
# Verify environment variables
echo $VITE_SUPABASE_URL
echo $VITE_STRIPE_PUBLISHABLE_KEY
```

**Database Connection Issues**
```sql
-- Test database connectivity
SELECT 1;
-- Check active connections
SELECT count(*) FROM pg_stat_activity;
```

**Performance Issues**
```bash
# Check resource usage
top
df -h
free -m
```

This deployment guide ensures a smooth, secure, and reliable deployment process for the RoundAbout platform across all environments.
