
# Configuration Reference

This document provides comprehensive information about configuring the RoundAbout platform for different environments and use cases.

## 🔧 Environment Variables

### Core Application Settings

#### Required Variables
```env
# Supabase Configuration (REQUIRED)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Application URL (REQUIRED for production)
VITE_APP_URL=https://yourdomain.com
```

#### Optional Variables
```env
# Application Information
VITE_APP_NAME="RoundAbout"
VITE_APP_DESCRIPTION="Creator Engagement Platform"
VITE_APP_VERSION="1.0.0"

# Environment Configuration
NODE_ENV=production
VITE_APP_ENV=production
VITE_DEBUG_LOGS=false
VITE_LOG_LEVEL=info
```

### Payment Integration

#### Stripe Configuration
```env
# Stripe Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-test-key
# Note: Secret key should be stored in Supabase Edge Function secrets

# Webhook Configuration
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### Social Media Integration

#### OAuth Client IDs
```env
# Instagram Basic Display
VITE_INSTAGRAM_CLIENT_ID=your-instagram-client-id

# Twitter API v2
VITE_TWITTER_CLIENT_ID=your-twitter-client-id

# YouTube Data API
VITE_YOUTUBE_CLIENT_ID=your-youtube-client-id

# LinkedIn API
VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id

# Facebook Graph API
VITE_FACEBOOK_CLIENT_ID=your-facebook-client-id

# TikTok API
VITE_TIKTOK_CLIENT_ID=your-tiktok-client-id
```

### Analytics and Monitoring

#### Error Tracking
```env
# Sentry Configuration
VITE_SENTRY_DSN=https://your-sentry-dsn
VITE_SENTRY_ENVIRONMENT=production
VITE_SENTRY_RELEASE=1.0.0
```

#### Analytics
```env
# Google Analytics
VITE_GA_TRACKING_ID=GA-XXXXXXXXX

# PostHog
VITE_POSTHOG_KEY=phc_your-posthog-key
VITE_POSTHOG_HOST=https://app.posthog.com
```

### Development Settings

#### Debug Configuration
```env
# Development Environment
VITE_DEV_MODE=true
VITE_DEBUG_LOGS=true
VITE_LOG_LEVEL=debug
VITE_SHOW_DEVTOOLS=true

# Mock Data
VITE_USE_MOCK_DATA=true
VITE_MOCK_SOCIAL_ACCOUNTS=true
```

#### Feature Flags
```env
# Feature Toggles
VITE_FEATURE_REAL_TIME_MESSAGING=true
VITE_FEATURE_PREMIUM_SUBSCRIPTIONS=true
VITE_FEATURE_SOCIAL_OAUTH=true
VITE_FEATURE_ANALYTICS_DASHBOARD=true
VITE_FEATURE_AI_ASSISTANT=false
```

## 🏗️ Application Configuration

### Feature Configuration
Create `src/config/features.ts`:
```typescript
export const FEATURES = {
  // Core Features
  REAL_TIME_MESSAGING: import.meta.env.VITE_FEATURE_REAL_TIME_MESSAGING === 'true',
  PREMIUM_SUBSCRIPTIONS: import.meta.env.VITE_FEATURE_PREMIUM_SUBSCRIPTIONS === 'true',
  SOCIAL_OAUTH: import.meta.env.VITE_FEATURE_SOCIAL_OAUTH === 'true',
  ANALYTICS_DASHBOARD: import.meta.env.VITE_FEATURE_ANALYTICS_DASHBOARD === 'true',
  
  // Beta Features
  AI_ASSISTANT: import.meta.env.VITE_FEATURE_AI_ASSISTANT === 'true',
  MOBILE_APP: import.meta.env.VITE_FEATURE_MOBILE_APP === 'true',
  VIDEO_CALLING: import.meta.env.VITE_FEATURE_VIDEO_CALLING === 'true',
  
  // Advanced Features
  MULTI_LANGUAGE: import.meta.env.VITE_FEATURE_MULTI_LANGUAGE === 'true',
  DARK_MODE: true, // Always enabled
  OFFLINE_MODE: import.meta.env.VITE_FEATURE_OFFLINE_MODE === 'true',
} as const;

// Feature availability by subscription tier
export const TIER_FEATURES = {
  free: ['REAL_TIME_MESSAGING', 'SOCIAL_OAUTH'],
  pro: ['REAL_TIME_MESSAGING', 'SOCIAL_OAUTH', 'ANALYTICS_DASHBOARD', 'AI_ASSISTANT'],
  enterprise: Object.keys(FEATURES), // All features
} as const;
```

### API Configuration
Create `src/config/api.ts`:
```typescript
export const API_CONFIG = {
  // Base URLs
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // Timeout Settings
  DEFAULT_TIMEOUT: 10000, // 10 seconds
  UPLOAD_TIMEOUT: 60000,  // 60 seconds
  
  // Rate Limiting
  MAX_REQUESTS_PER_MINUTE: 60,
  BURST_LIMIT: 10,
  
  // Retry Configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Cache Settings
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  STALE_TIME: 30 * 1000, // 30 seconds
} as const;

// Social Media API Endpoints
export const SOCIAL_API_ENDPOINTS = {
  instagram: {
    baseUrl: 'https://graph.instagram.com',
    version: 'v18.0',
    scopes: ['user_profile', 'user_media'],
  },
  twitter: {
    baseUrl: 'https://api.twitter.com',
    version: '2',
    scopes: ['tweet.read', 'users.read', 'follows.read'],
  },
  youtube: {
    baseUrl: 'https://www.googleapis.com/youtube',
    version: 'v3',
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  },
} as const;
```

### Theme Configuration
Create `src/config/theme.ts`:
```typescript
export const THEME_CONFIG = {
  // Default Theme
  defaultTheme: 'system', // 'light' | 'dark' | 'system'
  
  // Color Schemes
  colors: {
    primary: {
      light: 'hsl(263, 85%, 62%)',
      dark: 'hsl(263, 85%, 72%)',
    },
    secondary: {
      light: 'hsl(210, 40%, 98%)',
      dark: 'hsl(222, 84%, 5%)',
    },
  },
  
  // Typography
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  // Animation Settings
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
} as const;
```

## 🗄️ Database Configuration

### Supabase Configuration
Create `src/config/database.ts`:
```typescript
export const DATABASE_CONFIG = {
  // Connection Settings
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // Client Options
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  
  // Real-time Settings
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  
  // Storage Configuration
  storage: {
    buckets: {
      avatars: 'avatars',
      attachments: 'message-attachments',
      proofs: 'engagement-proofs',
    },
  },
} as const;

// Table Names
export const TABLES = {
  PROFILES: 'profiles',
  SOCIAL_ACCOUNTS: 'social_accounts',
  ENGAGEMENTS: 'engagements',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  REWARDS: 'rewards',
  REWARD_REDEMPTIONS: 'reward_redemptions',
  GROUPS: 'groups',
  GROUP_MEMBERSHIPS: 'group_memberships',
  ACHIEVEMENTS: 'achievements',
  USER_ACHIEVEMENTS: 'user_achievements',
  USER_ANALYTICS: 'user_analytics',
  SUBSCRIPTIONS: 'subscriptions',
} as const;
```

### Local Database Configuration
For local development with PostgreSQL:
```env
# Local PostgreSQL
DATABASE_URL=postgresql://postgres:password@localhost:5432/roundabout_dev
DATABASE_TYPE=postgresql

# SQLite (offline development)
DATABASE_URL=./data/roundabout.db
DATABASE_TYPE=sqlite
```

## 🎨 UI Configuration

### Component Configuration
Create `src/config/ui.ts`:
```typescript
export const UI_CONFIG = {
  // Layout Settings
  layout: {
    maxWidth: '1200px',
    sidebarWidth: '280px',
    headerHeight: '64px',
    footerHeight: '120px',
  },
  
  // Breakpoints (Tailwind CSS)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Component Sizes
  avatar: {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  },
  
  // Card Configurations
  card: {
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    radius: 'rounded-lg',
    shadow: 'shadow-sm hover:shadow-md transition-shadow',
  },
} as const;

// Form Configuration
export const FORM_CONFIG = {
  validation: {
    username: {
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
    },
    password: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
    },
    bio: {
      maxLength: 500,
    },
  },
  
  // Auto-save Settings
  autoSave: {
    enabled: true,
    delay: 2000, // 2 seconds
  },
} as const;
```

## 📊 Analytics Configuration

### Tracking Configuration
Create `src/config/analytics.ts`:
```typescript
export const ANALYTICS_CONFIG = {
  // Google Analytics
  ga: {
    trackingId: import.meta.env.VITE_GA_TRACKING_ID,
    enabled: !!import.meta.env.VITE_GA_TRACKING_ID,
    config: {
      anonymize_ip: true,
      cookie_expires: 63072000, // 2 years
    },
  },
  
  // PostHog
  posthog: {
    key: import.meta.env.VITE_POSTHOG_KEY,
    host: import.meta.env.VITE_POSTHOG_HOST,
    enabled: !!import.meta.env.VITE_POSTHOG_KEY,
    config: {
      capture_pageview: true,
      capture_pageleave: true,
    },
  },
  
  // Custom Events
  events: {
    // User Actions
    USER_SIGNUP: 'user_signup',
    USER_LOGIN: 'user_login',
    USER_LOGOUT: 'user_logout',
    
    // Engagement Actions
    ENGAGEMENT_CREATED: 'engagement_created',
    ENGAGEMENT_COMPLETED: 'engagement_completed',
    POINTS_EARNED: 'points_earned',
    REWARD_REDEEMED: 'reward_redeemed',
    
    // Social Actions
    SOCIAL_ACCOUNT_CONNECTED: 'social_account_connected',
    MESSAGE_SENT: 'message_sent',
    GROUP_JOINED: 'group_joined',
    
    // Navigation
    PAGE_VIEW: 'page_view',
    FEATURE_USED: 'feature_used',
  },
} as const;
```

## 🔐 Security Configuration

### Security Settings
Create `src/config/security.ts`:
```typescript
export const SECURITY_CONFIG = {
  // Password Requirements
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    preventCommonPasswords: true,
  },
  
  // Session Settings
  session: {
    timeout: 24 * 60 * 60 * 1000, // 24 hours
    refreshThreshold: 5 * 60 * 1000, // 5 minutes
    rememberMe: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  
  // Rate Limiting
  rateLimiting: {
    login: {
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    },
    api: {
      maxRequests: 100,
      windowMs: 60 * 1000, // 1 minute
    },
    upload: {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    },
  },
  
  // Content Security Policy
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://js.stripe.com'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https://api.stripe.com', 'wss://realtime.supabase.com'],
  },
} as const;
```

## 🚀 Performance Configuration

### Performance Settings
Create `src/config/performance.ts`:
```typescript
export const PERFORMANCE_CONFIG = {
  // Code Splitting
  codeSplitting: {
    enabled: true,
    chunkSize: 244 * 1024, // 244KB
    dynamicImports: true,
  },
  
  // Image Optimization
  images: {
    lazy: true,
    placeholder: 'blur',
    formats: ['webp', 'jpg', 'png'],
    sizes: [320, 640, 750, 828, 1080, 1200, 1920],
  },
  
  // Caching Strategy
  cache: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  },
  
  // Bundle Analysis
  bundle: {
    analyzer: process.env.NODE_ENV === 'development',
    sizeLimit: 500 * 1024, // 500KB
  },
} as const;

// Service Worker Configuration
export const SW_CONFIG = {
  enabled: process.env.NODE_ENV === 'production',
  scope: '/',
  cacheName: 'roundabout-v1',
  strategies: {
    pages: 'NetworkFirst',
    assets: 'CacheFirst',
    api: 'NetworkFirst',
  },
} as const;
```

## 🌐 Internationalization Configuration

### i18n Configuration
Create `src/config/i18n.ts`:
```typescript
export const I18N_CONFIG = {
  // Default Language
  defaultLocale: 'en',
  
  // Supported Languages
  locales: ['en', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'zh'],
  
  // Locale Settings
  localeMap: {
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    pt: { name: 'Português', flag: '🇧🇷' },
    ja: { name: '日本語', flag: '🇯🇵' },
    ko: { name: '한국어', flag: '🇰🇷' },
    zh: { name: '中文', flag: '🇨🇳' },
  },
  
  // Date/Time Formatting
  dateTime: {
    dateFormat: 'PP', // Jan 1, 2024
    timeFormat: 'p',  // 12:00 AM
    dateTimeFormat: 'PPp', // Jan 1, 2024 at 12:00 AM
  },
  
  // Number Formatting
  numbers: {
    currency: {
      style: 'currency',
      minimumFractionDigits: 2,
    },
    decimal: {
      style: 'decimal',
      maximumFractionDigits: 2,
    },
  },
} as const;
```

## 📱 Mobile Configuration

### PWA Configuration
Create `public/manifest.json`:
```json
{
  "name": "RoundAbout - Creator Engagement Platform",
  "short_name": "RoundAbout",
  "description": "Gamified social media engagement for creators",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#624DE3",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🔧 Environment-Specific Configurations

### Development Configuration
```javascript
// vite.config.ts for development
export default defineConfig({
  plugins: [react()],
  define: {
    __DEV__: JSON.stringify(true),
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    sourcemap: true,
  },
});
```

### Production Configuration
```javascript
// vite.config.ts for production
export default defineConfig({
  plugins: [react()],
  define: {
    __DEV__: JSON.stringify(false),
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog'],
        },
      },
    },
  },
});
```

### Testing Configuration
```javascript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
      ],
    },
  },
});
```

---

Next: [Testing Guide](testing.md) →
