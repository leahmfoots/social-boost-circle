
# RoundAbout Platform - Complete Recreation Guide

## 🚀 Project Overview

RoundAbout is a comprehensive creator platform that gamifies social media engagement through a points-based reward system. Creators can connect their social media accounts, complete engagement tasks, earn points, and redeem rewards while building a community.

## 🏗️ Architecture & Tech Stack

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime

### Backend Stack
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **API**: Supabase REST API
- **File Storage**: Supabase Storage
- **Edge Functions**: Supabase Edge Functions
- **Real-time**: Supabase Realtime subscriptions

### Key Dependencies
```json
{
  "@supabase/supabase-js": "^2.50.5",
  "@tanstack/react-query": "^5.56.2",
  "@stripe/stripe-js": "^7.3.1",
  "@stripe/react-stripe-js": "^3.7.0",
  "react": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "lucide-react": "^0.462.0",
  "recharts": "^2.12.7",
  "zod": "^3.23.8",
  "react-hook-form": "^7.53.0"
}
```

## 📊 Database Schema

### Core Tables

#### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website_url TEXT,
  location TEXT,
  points INTEGER DEFAULT 0,
  subscription_tier TEXT DEFAULT 'free',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### social_accounts
```sql
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  platform TEXT NOT NULL,
  username TEXT NOT NULL,
  account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  is_connected BOOLEAN DEFAULT true,
  connected_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, platform)
);
```

#### engagements
```sql
CREATE TABLE engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  target_user_id UUID REFERENCES profiles(id),
  platform TEXT NOT NULL,
  engagement_type TEXT NOT NULL,
  content_url TEXT NOT NULL,
  content_title TEXT,
  points_value INTEGER NOT NULL DEFAULT 10,
  status TEXT DEFAULT 'pending',
  proof_url TEXT,
  proof_screenshot TEXT,
  submitted_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Additional Tables
- `rewards` - Reward catalog with points requirements
- `reward_redemptions` - User reward redemption history
- `groups` - Community groups/channels
- `group_memberships` - Group membership tracking
- `messages` - Real-time messaging system
- `notifications` - User notifications
- `achievements` - Gamification achievements
- `user_achievements` - User achievement progress
- `user_analytics` - Activity tracking
- `subscriptions` - Premium subscription management

## 🎨 Design System

### Color Palette
- **Primary**: `hsl(263, 85%, 62%)` (#624DE3)
- **Secondary**: `hsl(210, 40%, 98%)` 
- **Accent**: `hsl(142, 76%, 36%)`
- **Muted**: `hsl(210, 40%, 96%)`
- **Border**: `hsl(214, 32%, 91%)`

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: JetBrains Mono

### Components
All UI components use shadcn/ui with custom theming:
- Buttons, Cards, Dialogs, Forms
- Data tables with sorting/filtering
- Charts and analytics displays
- Real-time messaging interface

## 🔐 Authentication & Security

### Authentication Flow
1. **Signup**: Email/password with profile creation
2. **Login**: Email/password authentication
3. **OAuth**: Social media platform integration
4. **Session Management**: Automatic token refresh

### Security Features
- Row Level Security (RLS) policies
- Protected routes with auth guards
- Secure token storage
- API rate limiting
- Input validation with Zod schemas

## 🚀 Core Features Implementation

### 1. User Management
```typescript
// Profile management with real-time updates
const useProfile = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      return data;
    }
  });
};
```

### 2. Social Media Integration
```typescript
// OAuth connection handling
const connectSocialAccount = async (platform: string) => {
  const { data, error } = await supabase.functions.invoke('connect-social-account', {
    body: { platform }
  });
};
```

### 3. Engagement System
```typescript
// Engagement opportunity creation and tracking
const createEngagement = async (engagement: EngagementData) => {
  const { data } = await supabase
    .from('engagements')
    .insert(engagement)
    .select()
    .single();
};
```

### 4. Points & Rewards System
```typescript
// Points calculation and reward redemption
const redeemReward = async (rewardId: string) => {
  const { data } = await supabase
    .from('reward_redemptions')
    .insert({
      user_id: user.id,
      reward_id: rewardId,
      points_used: reward.points_required
    });
};
```

### 5. Real-time Features
```typescript
// Real-time subscriptions for live updates
useEffect(() => {
  const channel = supabase
    .channel('notifications')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${user.id}`
    }, handleNewNotification)
    .subscribe();
}, []);
```

## 📱 Page Structure

### Public Pages
- `/` - Landing page with hero and features
- `/login` - Authentication
- `/signup` - User registration

### Protected Dashboard
- `/dashboard` - Main dashboard with stats
- `/dashboard/engagement` - Engagement opportunities
- `/dashboard/rewards` - Rewards catalog
- `/dashboard/community` - Groups and messaging
- `/dashboard/analytics` - Performance metrics
- `/dashboard/accounts` - Social account management
- `/dashboard/settings` - User preferences
- `/dashboard/notifications` - Notification center
- `/dashboard/ai-bot` - AI-powered chat assistant

## 🛠️ Development Setup

### Prerequisites
```bash
# Node.js 18+
# Supabase CLI
# Git
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd roundabout-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add Supabase credentials

# Start development server
npm run dev
```

### Environment Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

## 🚀 Deployment

### Supabase Setup
1. Create new Supabase project
2. Run database migrations
3. Configure authentication providers
4. Set up storage buckets
5. Deploy edge functions

### Frontend Deployment
```bash
# Build production bundle
npm run build

# Deploy to Vercel/Netlify
npm run deploy
```

### Edge Functions
```bash
# Deploy Supabase functions
supabase functions deploy connect-social-account
supabase functions deploy create-subscription
supabase functions deploy customer-portal
```

## 📊 Analytics & Monitoring

### User Analytics
- Page views and engagement metrics
- Social media performance tracking
- Points earning and spending patterns
- Community participation metrics

### Performance Monitoring
- Real-time error tracking
- API response times
- Database query performance
- User session analytics

## 🔧 API Integration

### Social Media APIs
- **Instagram Basic Display API**
- **Twitter API v2**
- **YouTube Data API v3**
- **LinkedIn API**
- **TikTok API**
- **Facebook Graph API**

### Payment Processing
- **Stripe**: Subscription management
- **PayPal**: Cash rewards
- **Gift card APIs**: Automated fulfillment

### AI Integration
- **OpenAI GPT**: Chat assistance
- **Content analysis**: Engagement optimization
- **Recommendation engine**: Personalized content

## 🧪 Testing Strategy

### Unit Tests
```bash
# Component testing with React Testing Library
npm run test

# Coverage reporting
npm run test:coverage
```

### Integration Tests
```bash
# API endpoint testing
npm run test:integration

# Database operations testing
npm run test:db
```

### E2E Tests
```bash
# Playwright end-to-end testing
npm run test:e2e
```

## 📈 Performance Optimization

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Bundle size analysis and optimization
- Service worker for offline functionality

### Database Optimization
- Proper indexing strategies
- Query optimization
- Connection pooling
- Read replicas for scaling

### Caching Strategy
- React Query for client-side caching
- CDN for static assets
- Redis for session storage
- Edge caching for API responses

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

## 🎯 Future Enhancements

### Planned Features
- Mobile app (React Native)
- Advanced analytics dashboard
- Influencer marketplace
- Content collaboration tools
- Advanced AI recommendations
- Multi-language support
- Blockchain integration for NFT rewards

### Scalability Improvements
- Microservices architecture
- Event-driven architecture
- Advanced caching layers
- Geographic distribution
- Load balancing optimization

## 📝 Development Guidelines

### Code Standards
- TypeScript strict mode
- ESLint + Prettier configuration
- Conventional commits
- Component documentation
- API documentation

### Git Workflow
- Feature branches for development
- Pull request reviews required
- Automated testing on PRs
- Semantic versioning
- Changelog maintenance

This comprehensive guide provides everything needed to recreate the RoundAbout platform from scratch, including all architectural decisions, implementation details, and best practices.
