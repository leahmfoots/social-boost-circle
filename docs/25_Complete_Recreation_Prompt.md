
# Complete Recreation Prompt for RoundAbout Platform

## 🎯 MASTER RECREATION PROMPT FOR LOVABLE

Use this comprehensive prompt in a new Lovable chat to recreate the entire RoundAbout creator engagement platform:

---

**RECREATE ROUNDABOUT - COMPLETE CREATOR ENGAGEMENT PLATFORM**

Create a comprehensive creator engagement platform called "RoundAbout" with the following exact specifications:

## CORE ARCHITECTURE & TECH STACK
- **React 18** with TypeScript and Vite
- **Supabase** backend (authentication, database, real-time, edge functions)
- **Stripe** payment integration with React Stripe Elements
- **Tailwind CSS** + **Shadcn/UI** design system (40+ components)
- **React Router DOM** for navigation
- **TanStack React Query** for state management
- **Lucide React** for icons
- **Recharts** for analytics visualization

## EXACT PAGES TO CREATE (14 Total):

### **Public Pages**
1. **Index** (`/`) - Landing page with:
   - Hero section: "Empower Your Creator Journey"
   - Features showcase (engagement tracking, analytics, community)
   - Pricing tiers (Free, Pro $29/month, Enterprise $99/month)
   - Call-to-action buttons and testimonials

2. **Auth** (`/auth`) - Unified authentication with:
   - Login and signup forms using Supabase auth
   - Email/password authentication
   - Form validation and error handling

### **Protected Dashboard Pages**
3. **Dashboard** (`/dashboard`) - Main hub with:
   - Stats grid: followers, engagement rate, points, revenue
   - Interactive engagement chart (daily/weekly/monthly views)
   - Recent activity feed
   - Quick action buttons

4. **EngagementPage** (`/engagement`) - Social engagement tracking:
   - Engagement opportunities table with filters
   - Platform filter (Instagram, YouTube, Twitter, TikTok, LinkedIn)
   - Status tracking (available, in-progress, completed)
   - Points system integration
   - Grid and list view options

5. **AccountsPage** (`/accounts`) - Social account management:
   - Platform connection cards with OAuth placeholders
   - Account status indicators
   - Follower count and verification badges
   - Connection/disconnection functionality

6. **AnalyticsPage** (`/analytics`) - Data visualization:
   - Interactive charts using Recharts
   - Platform-specific metrics
   - Growth trend analysis
   - Performance comparisons
   - Export functionality

7. **CommunityPage** (`/community`) - Social networking:
   - Creator profile cards
   - Group discovery and creation
   - Community challenges
   - Networking opportunities

8. **CreatorProfilePage** (`/creator/:id`) - Individual profiles:
   - Creator bio and stats
   - Portfolio showcase
   - Follow/unfollow functionality
   - Content gallery

9. **GroupDetailsPage** (`/community/group/:id`) - Group management:
   - Group information and members
   - Discussion threads
   - Member roles and permissions
   - Activity feed

10. **MessagingPage** (`/messages`) - Communication center:
    - Chat interface with contact list
    - Real-time message simulation
    - Message status indicators
    - Search and filter options

11. **NotificationsPage** (`/notifications`) - Notification management:
    - Notification feed with categories
    - Mark as read/unread functionality
    - Notification preferences
    - Email, push, and in-app settings

12. **RewardsPage** (`/rewards`) - Gamification system:
    - Points overview and history
    - Available rewards catalog
    - Achievement tracking with progress bars
    - Reward redemption flow
    - Points transaction history

13. **SettingsPage** (`/settings`) - User preferences:
    - Profile editing
    - Account settings
    - Privacy controls
    - Theme preferences

14. **Premium** (`/premium`) - Subscription management:
    - Pricing plans comparison
    - Stripe integration for payments
    - Subscription status display
    - Customer portal access

## DATABASE SCHEMA - CREATE THESE EXACT TABLES:

```sql
-- User Management
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  theme VARCHAR DEFAULT 'system',
  notification_preferences JSONB DEFAULT '{"email": true, "push": false, "sms": false}',
  dashboard_layout VARCHAR DEFAULT 'default',
  chart_style VARCHAR DEFAULT 'candles',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES auth.users(id) NOT NULL,
  following_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

-- Social Media Integration
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  platform VARCHAR NOT NULL, -- instagram, youtube, twitter, tiktok, linkedin
  account_id VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  followers_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  connected_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  platform VARCHAR NOT NULL,
  type VARCHAR NOT NULL, -- like, comment, share, follow
  target_url TEXT,
  points_earned INTEGER DEFAULT 0,
  status VARCHAR DEFAULT 'pending', -- pending, verified, rejected
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Community Features
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) NOT NULL,
  owner_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  price NUMERIC,
  royalty_percentage NUMERIC DEFAULT 5.00,
  is_for_sale BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  nft_id UUID REFERENCES nfts(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_id UUID REFERENCES memories(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  themes TEXT[] DEFAULT '{}',
  emotional_tone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Groups and Community
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES auth.users(id) NOT NULL,
  is_public BOOLEAN DEFAULT true,
  member_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  role VARCHAR DEFAULT 'member', -- admin, moderator, member
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Trading/Finance (for future crypto features)
CREATE TABLE trading_bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR NOT NULL,
  strategy VARCHAR NOT NULL,
  pair VARCHAR NOT NULL,
  timeframe VARCHAR NOT NULL,
  allocation_percentage NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT false,
  config JSONB,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  symbol VARCHAR NOT NULL,
  type VARCHAR NOT NULL, -- buy, sell
  quantity NUMERIC NOT NULL,
  price NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  fee NUMERIC DEFAULT 0,
  exchange VARCHAR,
  status VARCHAR DEFAULT 'completed',
  executed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## ROW LEVEL SECURITY - ENABLE FOR ALL TABLES:

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagements ENABLE ROW LEVEL SECURITY;
-- ... continue for all tables

-- Create policies (users can only access their own data)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
-- ... create similar policies for all tables
```

## KEY COMPONENTS TO BUILD:

### **Layout Components**
- `Layout.tsx` - Main app wrapper with sidebar navigation
- `Navbar.tsx` - Top navigation with auth state and theme toggle
- `Footer.tsx` - Site footer with links
- `DashboardLayout.tsx` - Protected route layout
- `ThemeProvider.tsx` - Dark/light theme management

### **Authentication Components**
- `LoginForm.tsx` - Email/password login with validation
- `SignupForm.tsx` - User registration form
- `ProtectedRoute.tsx` - Route protection wrapper
- `AuthContext.tsx` - Global authentication state

### **Dashboard Components**
- `DashboardStatsGrid.tsx` - Key metrics display (4 stat cards)
- `EngagementChart.tsx` - Interactive chart with Recharts
- Recent activity feed component
- Quick action buttons

### **Social Integration**
- `SocialAccountManager.tsx` - Account connection hub
- `PlatformConnections.tsx` - Platform-specific cards
- `AccountConnectModal.tsx` - OAuth connection flow
- Connection status indicators

### **Engagement System**
- `EngagementTable.tsx` - Opportunities list with filters
- `EngagementOpportunity.tsx` - Individual engagement cards
- `EngagementFilter.tsx` - Filter controls
- Points calculation and tracking

### **Community Features**
- `CreatorCard.tsx` - Creator profile preview cards
- `CreatorProfile.tsx` - Full creator profile pages
- `GroupCard.tsx` - Group overview cards
- `GroupForm.tsx` - Group creation/editing
- `GroupMemberList.tsx` - Member management

### **Rewards System**
- `RewardsSection.tsx` - Available rewards display
- `RewardClaimModal.tsx` - Reward redemption flow
- `PointsHistory.tsx` - Points transaction history
- `AchievementsSection.tsx` - Achievement tracking
- `RewardsProgress.tsx` - Progress indicators

### **Analytics Dashboard**
- Interactive charts with Recharts library
- Platform-specific metrics
- Growth trend analysis
- Export functionality

### **Communication**
- `MessagingCenter.tsx` - Chat interface
- `NotificationCenter.tsx` - Notification management
- Real-time message simulation

### **Payment Integration**
- `StripeProvider.tsx` - Stripe context wrapper
- `SubscriptionManager.tsx` - Subscription handling
- `SubscriptionPlan.tsx` - Plan selection cards
- Checkout flow integration

## DESIGN SYSTEM REQUIREMENTS:

### **Color Scheme**
```css
:root {
  --primary: 220 90% 56%; /* Blue primary */
  --primary-foreground: 0 0% 100%;
  --secondary: 264 83% 58%; /* Purple accent */
  --muted: 220 14.3% 95.9%;
  --accent: 220 14.3% 95.9%;
  --background: 0 0% 100%;
  --foreground: 220.9 39.3% 11%;
  --card: 0 0% 100%;
  --border: 220 13% 91%;
}

[data-theme="dark"] {
  --background: 220.9 39.3% 11%;
  --foreground: 0 0% 100%;
  --card: 224 71.4% 4.1%;
  --muted: 215 27.9% 16.9%;
  --border: 215 27.9% 16.9%;
}
```

### **Typography**
- Font family: Inter or system fonts
- Heading scales: text-3xl, text-2xl, text-xl, text-lg
- Body text: text-base, text-sm, text-xs
- Font weights: font-normal, font-medium, font-semibold, font-bold

### **Components**
Use Shadcn/UI components: Button, Card, Dialog, Input, Select, Tabs, Badge, Avatar, Progress, and 30+ more

### **Responsive Design**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid layouts with responsive columns
- Touch-friendly interactions

## FEATURES TO IMPLEMENT:

### **Core Features**
1. **User Authentication** - Complete signup/login with Supabase
2. **Dashboard** - Stats, charts, activity feed
3. **Social Account Management** - Platform connection interface
4. **Engagement Tracking** - Opportunities, points, verification
5. **Community** - Creator profiles, groups, networking
6. **Rewards System** - Points, achievements, redemption
7. **Analytics** - Charts, metrics, insights
8. **Messaging** - Chat interface, real-time simulation
9. **Notifications** - Feed, preferences, management
10. **Premium Subscriptions** - Stripe integration, plans

### **Advanced Features**
- **Search & Discovery** - Global search with filters
- **Theme System** - Dark/light mode toggle
- **Real-time Updates** - Simulated real-time features
- **Mobile Optimization** - Responsive design
- **SEO Optimization** - Meta tags, structured data

## STRIPE INTEGRATION:
- Create checkout sessions for subscriptions
- Customer portal for subscription management  
- Webhook handling for subscription events
- Three tiers: Free, Pro ($29/month), Enterprise ($99/month)

## SAMPLE DATA:
Include realistic sample data for:
- Creator profiles with avatars and bios
- Engagement opportunities with points
- Rewards catalog with categories
- Achievement system with progress
- Analytics data for charts
- Notification examples
- Message conversations

## TECHNICAL REQUIREMENTS:

### **Performance**
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Loading states and error boundaries

### **Security**
- Row Level Security (RLS) on all database tables
- Input validation and sanitization
- Secure authentication flow
- API rate limiting

### **Development Experience**
- TypeScript for type safety
- ESLint and Prettier for code quality
- Component-based architecture
- Reusable hooks and utilities

## DEPLOYMENT READY:
- Environment variable configuration
- Build optimization
- Supabase project integration
- Production deployment setup

## IMMEDIATE IMPLEMENTATION ORDER:
1. Set up project with Vite, React, TypeScript, Tailwind
2. Install and configure Supabase client
3. Create authentication system and context
4. Build main layout with navigation
5. Implement dashboard with stats and charts
6. Create all 14 pages with routing
7. Add social account management interface
8. Build engagement tracking system
9. Implement rewards and achievements
10. Add community features
11. Set up notifications system
12. Integrate Stripe for payments
13. Add analytics dashboard
14. Implement messaging center
15. Polish UI/UX and add animations

## FINAL RESULT:
A production-ready creator engagement platform that looks professional, functions smoothly, and provides real value to content creators. The platform should feel modern, responsive, and ready for real users.

---

**Start with authentication and dashboard, then build out each feature systematically. Focus on creating a polished, cohesive user experience that showcases the platform's value for content creators.**

Create this as a complete, functional application that demonstrates modern web development best practices and provides an excellent foundation for a creator engagement platform.

```

## 🎯 ALTERNATIVE: PROGRESSIVE BUILD PROMPTS

If the master prompt is too comprehensive, use these sequential prompts for incremental development:

### **Phase 1: Foundation (30 minutes)**
```
Set up RoundAbout foundation:
- React + TypeScript + Vite project
- Supabase authentication and database
- Tailwind CSS + Shadcn/UI components  
- Landing page with "Empower Your Creator Journey"
- Auth system with login/signup
- Protected dashboard with basic layout
- Theme provider with dark/light modes
```

### **Phase 2: Core Features (45 minutes)**
```
Add RoundAbout core features:
- Dashboard stats grid and engagement chart
- Social account connection interface
- Engagement opportunities tracking system
- Points and rewards basic framework
- User profile management
- Navigation between all main sections
```

### **Phase 3: Advanced Features (60 minutes)**
```
Complete RoundAbout advanced features:
- Community system with creator profiles and groups
- Analytics dashboard with interactive charts
- Messaging and notification systems
- Advanced search and filtering
- Complete rewards and achievement system
- Mobile responsive optimization
```

### **Phase 4: Premium Features (30 minutes)**
```
Finalize RoundAbout with premium features:
- Stripe payment integration
- Subscription management system
- Premium feature gates
- Customer portal integration
- Production optimization
- Complete documentation
```

## 🔧 SPECIALIZED FEATURE PROMPTS:

### **AI Integration Prompt**
```
Add AI features to RoundAbout:
- Content suggestion system using OpenAI
- Engagement optimization recommendations
- Trend analysis and predictions  
- Automated insights dashboard
- AI-powered content moderation
```

### **Real-time Features Prompt**
```
Implement real-time capabilities:
- WebSocket connections for live messaging
- Real-time notification updates
- Live engagement tracking
- Presence indicators
- Live collaboration tools
```

### **Mobile App Prompt**
```
Optimize RoundAbout for mobile:
- Touch-friendly interface
- Swipe gestures for navigation
- Mobile-specific layouts
- Offline functionality
- Push notification support
```

## 📱 QUICK START PROMPTS:

### **MVP Version (15 minutes)**
```
Create RoundAbout MVP:
- Landing + auth + basic dashboard
- Simple engagement tracking
- Social account placeholders
- Basic points system
- Clean responsive design
```

### **Demo Version (45 minutes)**
```
Build demo-ready RoundAbout:
- All main pages with sample data
- Working navigation and auth
- Interactive engagement system
- Community features preview
- Professional UI/UX
```

### **Production Version (2 hours)**
```
Create production RoundAbout:
- Complete feature set
- Database with RLS policies
- Stripe payment integration
- Real-time capabilities
- SEO and performance optimization
- Comprehensive error handling
```

---

Use these prompts based on your timeline and requirements. The master prompt creates the complete platform, while the progressive prompts allow incremental development with user feedback at each stage.
