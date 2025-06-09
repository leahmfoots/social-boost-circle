
# Deployment Guide

## Overview

This guide covers the complete deployment process for RoundAbout, including environment setup, build configuration, deployment strategies, and monitoring. The application uses modern deployment practices with automated CI/CD pipelines.

## Deployment Architecture

### Infrastructure Overview
- **Frontend**: Static site hosting (Vercel/Netlify)
- **Backend**: Supabase managed services
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **CDN**: Global content delivery network
- **Monitoring**: Error tracking and performance monitoring

### Environment Strategy
- **Development**: Local development environment
- **Staging**: Pre-production testing environment
- **Production**: Live user-facing environment

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (unit, integration, e2e)
- [ ] Code coverage meets minimum threshold (80%)
- [ ] No TypeScript errors or warnings
- [ ] ESLint and Prettier checks passing
- [ ] Security audit complete (npm audit)

### Configuration
- [ ] Environment variables configured
- [ ] API keys and secrets properly set
- [ ] Database migrations ready
- [ ] Supabase project configured
- [ ] Stripe integration tested

### Performance
- [ ] Bundle size optimized
- [ ] Images optimized and compressed
- [ ] Performance budget met
- [ ] Lighthouse scores acceptable
- [ ] Core Web Vitals passing

### Security
- [ ] Authentication flows tested
- [ ] Authorization rules verified
- [ ] CORS policies configured
- [ ] Content Security Policy set
- [ ] HTTPS enforced

## Environment Configuration

### Development Environment
```bash
# .env.local
VITE_SUPABASE_URL=https://your-dev-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-dev-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-test-key
VITE_APP_URL=http://localhost:5173
VITE_ENVIRONMENT=development
```

### Staging Environment
```bash
# .env.staging
VITE_SUPABASE_URL=https://your-staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-staging-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-test-key
VITE_APP_URL=https://staging.roundabout.app
VITE_ENVIRONMENT=staging
```

### Production Environment
```bash
# .env.production
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-prod-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-live-key
VITE_APP_URL=https://app.roundabout.com
VITE_ENVIRONMENT=production
```

## Build Process

### Production Build
```bash
# Install dependencies
npm ci

# Run tests
npm run test

# Type checking
npm run type-check

# Build for production
npm run build

# Verify build
npm run preview
```

### Build Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-dialog'],
          charts: ['recharts'],
          stripe: ['@stripe/stripe-js', '@stripe/react-stripe-js']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
});
```

## Deployment Platforms

### Vercel Deployment

#### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "VITE_STRIPE_PUBLISHABLE_KEY": "@stripe-publishable-key"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### Deployment Commands
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to staging
vercel --env .env.staging

# Deploy to production
vercel --prod --env .env.production
```

### Netlify Deployment

#### Netlify Configuration
```toml
# netlify.toml
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
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[context.production.environment]
  VITE_ENVIRONMENT = "production"

[context.deploy-preview.environment]
  VITE_ENVIRONMENT = "staging"
```

#### Deployment Process
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build and deploy
netlify build
netlify deploy --prod
```

## Database Deployment

### Supabase Setup

#### Migration Process
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Deploy edge functions
supabase functions deploy
```

#### Database Migrations
```sql
-- Migration: 001_initial_schema.sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  subscription_tier TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

#### Edge Functions Deployment
```bash
# Deploy individual function
supabase functions deploy check-subscription

# Deploy all functions
supabase functions deploy

# Set secrets
supabase secrets set STRIPE_SECRET_KEY=sk_live_your_secret_key
```

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_STRIPE_PUBLISHABLE_KEY: ${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    environment: staging
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/

      - name: Deploy to Vercel (Staging)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_TEAM_ID }}

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/

      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_TEAM_ID }}

      - name: Deploy Supabase Functions
        run: |
          npm install -g supabase
          supabase login --token ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          supabase functions deploy --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
```

## Security Configuration

### Content Security Policy
```html
<!-- In index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://js.stripe.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://*.supabase.co https://api.stripe.com;
  frame-src https://js.stripe.com;
">
```

### Environment Security
```typescript
// src/lib/config.ts
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_STRIPE_PUBLISHABLE_KEY'
];

// Validate environment variables
requiredEnvVars.forEach(envVar => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  appUrl: import.meta.env.VITE_APP_URL,
  environment: import.meta.env.VITE_ENVIRONMENT || 'development'
} as const;
```

## Monitoring and Logging

### Error Tracking Setup
```typescript
// src/lib/monitoring.ts
import * as Sentry from '@sentry/react';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENVIRONMENT,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay()
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0
  });
}
```

### Performance Monitoring
```typescript
// src/lib/analytics.ts
export const trackPageView = (path: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path
    });
  }
};

export const trackEvent = (action: string, parameters?: any) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, parameters);
  }
};
```

### Health Checks
```typescript
// src/lib/health.ts
export const healthCheck = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    return !error;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};
```

## Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --analyze

# Check bundle composition
npx vite-bundle-analyzer dist
```

### Image Optimization
```typescript
// vite.config.ts - Add image optimization
import { defineConfig } from 'vite';
import { imageOptimize } from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    imageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.6, 0.8] },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false }
        ]
      }
    })
  ]
});
```

### Caching Strategy
```typescript
// public/_headers (Netlify) or vercel.json (Vercel)
/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

## Rollback Strategy

### Automated Rollback
```bash
# Vercel rollback
vercel rollback [deployment-url]

# Netlify rollback
netlify deploy --restore [deploy-id]

# Manual rollback
git revert [commit-hash]
git push origin main
```

### Database Rollback
```bash
# Supabase migration rollback
supabase migration down

# Manual SQL rollback
supabase db reset --db-url [connection-string]
```

## Post-Deployment Verification

### Automated Checks
```bash
# Health check script
#!/bin/bash
echo "Running post-deployment checks..."

# Check application is responding
curl -f https://app.roundabout.com/health || exit 1

# Check authentication endpoint
curl -f https://app.roundabout.com/api/auth/status || exit 1

# Check database connectivity
curl -f https://app.roundabout.com/api/health/db || exit 1

echo "All checks passed!"
```

### Manual Verification
- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] Login/logout functionality
- [ ] Dashboard displays data
- [ ] Payment flow functions
- [ ] Social account connections work
- [ ] Mobile responsiveness
- [ ] Performance metrics acceptable

## Deployment Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check

# Verify environment variables
echo $VITE_SUPABASE_URL
```

#### Runtime Errors
```bash
# Check browser console for errors
# Verify API endpoints are accessible
# Check CORS configuration
# Validate environment variables
```

#### Performance Issues
```bash
# Analyze bundle size
npm run build -- --analyze

# Check lighthouse scores
lighthouse https://your-domain.com

# Monitor Core Web Vitals
# Check CDN configuration
```

### Support Contacts
- **DevOps Team**: devops@roundabout.com
- **On-call Engineer**: +1-xxx-xxx-xxxx
- **Incident Response**: incidents@roundabout.com

This deployment guide ensures reliable, secure, and performant deployments of the RoundAbout platform across all environments.
