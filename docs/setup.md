
# Setup Guide

This comprehensive guide will help you set up the RoundAbout platform in various environments, from local development to production deployment.

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (or yarn 1.22+)
- **Git**: Latest version
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

### Development Tools (Recommended)
- **VS Code**: With recommended extensions
- **Supabase CLI**: For database management
- **Docker**: For containerized development (optional)

## 🔧 Local Development Setup

### 1. Clone Repository
```bash
# Clone the repository
git clone https://github.com/your-org/roundabout-platform.git
cd roundabout-platform

# Verify Node.js version
node --version  # Should be 18.0 or higher
npm --version   # Should be 8.0 or higher
```

### 2. Install Dependencies
```bash
# Install all dependencies
npm install

# Alternative with yarn
yarn install

# Verify installation
npm list --depth=0
```

### 3. Environment Configuration

#### Copy Environment Template
```bash
# Copy the environment template
cp .env.example .env

# For Windows
copy .env.example .env
```

#### Configure Environment Variables
Edit the `.env` file with your specific values:

```env
# =================================
# SUPABASE CONFIGURATION
# =================================
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# =================================
# STRIPE CONFIGURATION (OPTIONAL)
# =================================
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key

# =================================
# APPLICATION CONFIGURATION
# =================================
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=RoundAbout
VITE_APP_DESCRIPTION=Creator Engagement Platform

# =================================
# DEVELOPMENT SETTINGS
# =================================
VITE_DEV_MODE=true
VITE_DEBUG_LOGS=true
```

### 4. Supabase Setup

#### Install Supabase CLI
```bash
# Install globally
npm install -g supabase

# Verify installation
supabase --version
```

#### Login to Supabase
```bash
# Login to your Supabase account
supabase login

# This will open your browser for authentication
```

#### Link Project
```bash
# Link to your Supabase project
supabase link --project-ref your-project-reference-id

# You can find your project reference in the Supabase dashboard URL
# Example: https://app.supabase.com/project/your-project-ref
```

#### Initialize Database
```bash
# Run database migrations
supabase db reset

# This will:
# - Create all necessary tables
# - Set up Row Level Security policies
# - Insert sample data for development
```

### 5. Start Development Server
```bash
# Start the development server
npm run dev

# Alternative with yarn
yarn dev

# The application will be available at:
# http://localhost:5173
```

### 6. Verify Installation
Open your browser and navigate to `http://localhost:5173`. You should see:
- ✅ Landing page loads correctly
- ✅ Navigation works
- ✅ Authentication forms are accessible
- ✅ No console errors (check browser dev tools)

## 🗄️ Database Configuration

### Local PostgreSQL (Alternative to Supabase)
If you prefer to run PostgreSQL locally:

```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql
brew services start postgresql

# Create database
createdb roundabout_dev

# Run migrations manually
psql -d roundabout_dev -f supabase/migrations/001_initial_schema.sql
```

### SQLite for Offline Development
For completely offline development:

```bash
# Install SQLite adapter
npm install better-sqlite3

# Use SQLite configuration
export DATABASE_TYPE=sqlite
export DATABASE_URL=./roundabout.db

# Start with SQLite mode
npm run dev:offline
```

## 🔌 External Service Integration

### Social Media API Setup

#### Instagram Basic Display API
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display product
4. Configure OAuth redirect URI: `http://localhost:5173/auth/callback/instagram`
5. Add credentials to `.env`:
```env
VITE_INSTAGRAM_CLIENT_ID=your-instagram-client-id
```

#### Twitter API v2
1. Apply for Twitter API access at [developer.twitter.com](https://developer.twitter.com/)
2. Create a new project and app
3. Configure OAuth 2.0 settings
4. Add credentials to `.env`:
```env
VITE_TWITTER_CLIENT_ID=your-twitter-client-id
```

#### YouTube Data API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable YouTube Data API v3
3. Create OAuth 2.0 credentials
4. Add credentials to `.env`:
```env
VITE_YOUTUBE_CLIENT_ID=your-youtube-client-id
```

### Stripe Integration
For payment processing and subscriptions:

```env
# Test keys for development
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Add webhook endpoint in Stripe dashboard:
# http://localhost:5173/api/webhooks/stripe
```

## 🐳 Docker Development

### Using Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Docker Configuration
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    
  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: roundabout
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## ⚙️ IDE Configuration

### VS Code Setup
Install recommended extensions:
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "dbaeumer.vscode-eslint",
    "supabase.supabase",
    "formulahendry.auto-rename-tag"
  ]
}
```

### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^\"'`]*)(?:'|\"|`)"]
  ]
}
```

## 🧪 Testing Setup

### Install Testing Dependencies
```bash
# Install testing utilities
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test vitest jsdom

# Install type definitions
npm install -D @types/jest @types/testing-library__jest-dom
```

### Configure Test Environment
Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```

### Run Tests
```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

## 🔧 Troubleshooting

### Common Issues

#### Node.js Version Issues
```bash
# Check Node.js version
node --version

# Update Node.js using nvm
nvm install 18
nvm use 18

# Or download from nodejs.org
```

#### Port Already in Use
```bash
# Find process using port 5173
lsof -ti:5173

# Kill the process
kill -9 $(lsof -ti:5173)

# Or use different port
npm run dev -- --port 3000
```

#### Module Resolution Errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Supabase Connection Issues
```bash
# Check Supabase status
supabase status

# Restart local Supabase
supabase stop
supabase start

# Check environment variables
echo $VITE_SUPABASE_URL
```

### Debug Mode
Enable debug logging:
```env
# In .env file
VITE_DEBUG_LOGS=true
VITE_LOG_LEVEL=debug
```

### Performance Issues
```bash
# Check bundle size
npm run build:analyze

# Clean build cache
rm -rf dist .vite

# Rebuild
npm run build
```

## 📱 Mobile Development

### iOS Simulator Testing
```bash
# Install iOS Simulator (requires Xcode)
# Open simulator and navigate to localhost:5173

# Or use remote debugging
# Settings > Safari > Advanced > Web Inspector
```

### Android Testing
```bash
# Enable USB debugging on Android device
# Connect device and run:
adb devices

# Forward port
adb reverse tcp:5173 tcp:5173

# Open Chrome and go to chrome://inspect
```

## 🚀 Production Preparation

### Build Optimization
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview

# Analyze bundle size
npm run build:analyze
```

### Environment Validation
```bash
# Validate production environment
npm run validate:env

# Check for security issues
npm audit

# Update dependencies
npm update
```

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Social media APIs configured
- [ ] SSL certificates ready
- [ ] Domain DNS configured
- [ ] Error monitoring setup

## 📞 Getting Help

### Community Support
- **GitHub Issues**: Report bugs and request features
- **Discord**: Real-time community help
- **Stack Overflow**: Tag questions with `roundabout-platform`

### Documentation
- **API Reference**: Complete API documentation
- **Component Library**: UI component examples
- **Architecture Guide**: Technical deep dive

### Professional Support
- **Email**: dev-support@roundabout.com
- **Enterprise**: Dedicated Slack channel for enterprise customers

---

Next: [Deployment Guide](deployment.md) →
