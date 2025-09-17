# RoundAbout Creator Engagement Platform - Complete Recreation Prompt

## Project Overview

**RoundAbout** is a comprehensive creator engagement platform that gamifies social media interaction, enabling content creators to:
- Track engagement across multiple social platforms
- Earn points through verified interactions
- Connect with fellow creators in communities
- Redeem rewards for their activities
- Access detailed analytics and insights
- Monetize their engagement through premium features

**Current Valuation**: $8.2 - $10.5 million USD based on market analysis and growth projections.

## 🏗️ Technical Architecture

### Core Technology Stack
```typescript
// Frontend Stack
React 18.3.1          // UI Framework
TypeScript 5.x        // Type Safety
Vite 5.x             // Build Tool
TailwindCSS 3.x      // Styling Framework
Shadcn/UI            // Component Library

// Backend Stack
Supabase             // Backend as a Service
PostgreSQL           // Primary Database
Row Level Security   // Data Security
Real-time Updates    // Live Features

// State Management
TanStack React Query // Server State
React Context        // App State
React Hook Form      // Form State

// Additional Tools
Stripe               // Payment Processing
Recharts            // Data Visualization
Lucide React        // Icons
Zod                 // Schema Validation
```

### Database Schema

```sql
-- Core Tables for Creator Platform

-- User Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  points INTEGER DEFAULT 0,
  total_points_earned INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Media Account Connections
CREATE TABLE public.social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  platform TEXT NOT NULL, -- instagram, twitter, youtube, linkedin, facebook, tiktok
  account_id TEXT NOT NULL,
  username TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  follower_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform, account_id)
);

-- Engagement Tasks and Tracking
CREATE TABLE public.engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  social_account_id UUID REFERENCES public.social_accounts(id),
  target_user_id UUID REFERENCES public.profiles(id),
  target_platform TEXT NOT NULL,
  target_username TEXT NOT NULL,
  target_post_url TEXT,
  engagement_type TEXT NOT NULL, -- like, comment, share, follow
  points_value INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending', -- pending, completed, verified, rejected
  proof_url TEXT,
  proof_screenshot_url TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rewards System
CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  points_cost INTEGER NOT NULL,
  reward_type TEXT NOT NULL, -- gift_card, cash, premium, badge, custom
  reward_value DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  stock_quantity INTEGER,
  is_active BOOLEAN DEFAULT true,
  image_url TEXT,
  terms_and_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Groups
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES public.profiles(id),
  is_public BOOLEAN DEFAULT true,
  member_count INTEGER DEFAULT 0,
  max_members INTEGER DEFAULT 100,
  group_type TEXT DEFAULT 'general',
  tags TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Real-time Messaging
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id),
  recipient_id UUID REFERENCES public.profiles(id),
  group_id UUID REFERENCES public.groups(id),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  attachment_url TEXT,
  is_read BOOLEAN DEFAULT false,
  edited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Tracking
CREATE TABLE public.user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  date DATE NOT NULL,
  engagements_completed INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  social_accounts_connected INTEGER DEFAULT 0,
  groups_joined INTEGER DEFAULT 0,
  messages_sent INTEGER DEFAULT 0,
  achievements_earned INTEGER DEFAULT 0,
  platform_breakdown JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Achievement System
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  badge_color TEXT DEFAULT '#FFD700',
  points_reward INTEGER DEFAULT 0,
  achievement_type TEXT NOT NULL,
  criteria JSONB,
  is_active BOOLEAN DEFAULT true,
  rarity TEXT DEFAULT 'common',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription Management
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 Design System

### Color Palette
```css
:root {
  /* Primary Brand Colors */
  --primary: 262 83% 58%;           /* Purple #624DE3 */
  --primary-foreground: 210 40% 98%; /* Light text */
  
  /* Secondary Colors */
  --secondary: 210 40% 96%;         /* Light gray */
  --secondary-foreground: 222.2 84% 4.9%; /* Dark text */
  
  /* Accent Colors */
  --accent: 210 40% 96%;            /* Subtle accent */
  --accent-foreground: 222.2 47.4% 11.2%; /* Accent text */
  
  /* UI Colors */
  --background: 0 0% 100%;          /* White background */
  --foreground: 222.2 84% 4.9%;    /* Dark text */
  --card: 0 0% 100%;               /* Card background */
  --card-foreground: 222.2 84% 4.9%; /* Card text */
  --border: 214.3 31.8% 91.4%;     /* Border color */
  --input: 214.3 31.8% 91.4%;      /* Input background */
  --ring: 262 83% 58%;             /* Focus ring */
  
  /* Semantic Colors */
  --destructive: 0 84.2% 60.2%;     /* Red for errors */
  --destructive-foreground: 210 40% 98%; /* Error text */
  --muted: 210 40% 96%;             /* Muted background */
  --muted-foreground: 215.4 16.3% 46.9%; /* Muted text */
  --popover: 0 0% 100%;             /* Popover background */
  --popover-foreground: 222.2 84% 4.9%; /* Popover text */
  
  /* Chart Colors */
  --chart-1: 12 76% 61%;            /* Orange */
  --chart-2: 173 58% 39%;           /* Teal */
  --chart-3: 197 37% 24%;           /* Dark blue */
  --chart-4: 43 74% 66%;            /* Yellow */
  --chart-5: 27 87% 67%;            /* Red-orange */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 262 83% 58%;
  --primary-foreground: 210 40% 98%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 262 83% 58%;
}
```

### Typography
```css
.font-sans {
  font-family: "Inter", sans-serif;
}

/* Text Sizes */
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-4xl { font-size: 2.25rem; }
```

## 📱 Application Structure

### Page Architecture
```
/                           # Landing page with features overview
/login                      # Authentication login
/signup                     # User registration
/dashboard                  # Main dashboard overview
/dashboard/engagement       # Engagement opportunities
/dashboard/accounts         # Social account management
/dashboard/analytics        # Analytics and insights
/dashboard/community        # Groups and community
/dashboard/creator/:id      # Creator profile pages
/dashboard/group/:id        # Group detail pages
/dashboard/messaging        # Direct messaging
/dashboard/notifications    # Notification center
/dashboard/rewards          # Points and rewards
/dashboard/settings         # User preferences
/dashboard/premium          # Subscription management
```

### Component Architecture
```
src/
├── components/
│   ├── ui/                 # Base UI components (shadcn/ui)
│   ├── auth/              # Authentication components
│   ├── analytics/         # Charts and analytics
│   ├── social/            # Social media integration
│   ├── engagement/        # Engagement system
│   ├── messaging/         # Chat and messaging
│   ├── rewards/           # Points and rewards
│   ├── community/         # Groups and community
│   ├── payment/           # Stripe integration
│   └── layout/            # Navigation and layout
├── pages/                 # Route components
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
├── contexts/              # React contexts
└── integrations/          # Third-party integrations
```

## 🔐 Authentication & Security

### Supabase Auth Implementation
```typescript
// Auth Context Setup
const AuthContext = createContext<{
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  loading: true,
});

// Row Level Security Policies
-- Users can only access their own data
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Social accounts are private to users
CREATE POLICY "Users can manage their own social accounts" 
ON public.social_accounts FOR ALL 
USING (auth.uid() = user_id);

-- Engagements are visible to involved parties
CREATE POLICY "Users can view relevant engagements" 
ON public.engagements FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() = target_user_id);
```

### Security Best Practices
- All API calls authenticated via JWT
- Row Level Security on all tables
- Input validation with Zod schemas
- HTTPS enforcement
- CSRF protection
- Rate limiting on sensitive endpoints

## ⚡ Core Features Implementation

### 1. Social Media Integration

#### OAuth Flow Implementation
```typescript
// Instagram Basic Display API
const connectInstagram = async () => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  window.location.href = authUrl;
};

// Twitter API v2
const connectTwitter = async () => {
  const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=tweet.read%20users.read%20follows.read&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  window.location.href = authUrl;
};

// YouTube Data API v3
const connectYouTube = async () => {
  const authUrl = `https://accounts.google.com/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code&access_type=offline`;
  window.location.href = authUrl;
};
```

#### Data Synchronization
```typescript
// Sync social media data every 4 hours
const syncSocialData = async (accountId: string) => {
  const { data: account } = await supabase
    .from('social_accounts')
    .select('*')
    .eq('id', accountId)
    .single();

  if (account.platform === 'instagram') {
    await syncInstagramData(account);
  } else if (account.platform === 'twitter') {
    await syncTwitterData(account);
  } else if (account.platform === 'youtube') {
    await syncYouTubeData(account);
  }
};
```

### 2. Engagement System

#### Opportunity Discovery
```typescript
// Find engagement opportunities
const getEngagementOpportunities = async (userId: string) => {
  const { data: opportunities } = await supabase
    .from('engagements')
    .select(`
      *,
      target_user:profiles!target_user_id(username, avatar_url),
      social_account:social_accounts(platform, username)
    `)
    .eq('status', 'pending')
    .neq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);

  return opportunities;
};

// Create engagement task
const createEngagement = async (engagementData: {
  targetPlatform: string;
  targetUsername: string;
  targetPostUrl: string;
  engagementType: string;
  pointsValue: number;
}) => {
  const { data, error } = await supabase
    .from('engagements')
    .insert([{
      user_id: user.id,
      ...engagementData,
      status: 'pending'
    }])
    .select()
    .single();

  return { data, error };
};
```

#### Proof Verification
```typescript
// Submit engagement proof
const submitProof = async (engagementId: string, proofData: {
  proofUrl?: string;
  screenshot?: File;
}) => {
  let screenshotUrl = null;
  
  if (proofData.screenshot) {
    const { data: uploadData } = await supabase.storage
      .from('engagement-proofs')
      .upload(`${engagementId}/${Date.now()}.png`, proofData.screenshot);
    
    screenshotUrl = uploadData?.path;
  }

  const { data, error } = await supabase
    .from('engagements')
    .update({
      proof_url: proofData.proofUrl,
      proof_screenshot_url: screenshotUrl,
      status: 'completed',
      completed_at: new Date().toISOString()
    })
    .eq('id', engagementId)
    .select()
    .single();

  return { data, error };
};
```

### 3. Points & Rewards System

#### Points Calculation
```typescript
const ENGAGEMENT_POINTS = {
  like: 1,
  comment: 3,
  share: 5,
  follow: 10,
  collaboration: 50
};

// Award points for verified engagement
const awardPoints = async (userId: string, engagementType: string) => {
  const points = ENGAGEMENT_POINTS[engagementType] || 1;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('points, total_points_earned')
    .eq('id', userId)
    .single();

  const newPoints = profile.points + points;
  const newTotalPoints = profile.total_points_earned + points;

  await supabase
    .from('profiles')
    .update({
      points: newPoints,
      total_points_earned: newTotalPoints,
      level: Math.floor(newTotalPoints / 1000) + 1
    })
    .eq('id', userId);

  // Check for achievements
  await checkAchievements(userId, {
    engagements_completed: 1,
    points_earned: points
  });
};
```

#### Reward Redemption
```typescript
// Redeem reward with points
const redeemReward = async (userId: string, rewardId: string) => {
  const { data: reward } = await supabase
    .from('rewards')
    .select('*')
    .eq('id', rewardId)
    .single();

  const { data: profile } = await supabase
    .from('profiles')
    .select('points')
    .eq('id', userId)
    .single();

  if (profile.points < reward.points_cost) {
    throw new Error('Insufficient points');
  }

  // Create redemption record
  const { data: redemption } = await supabase
    .from('reward_redemptions')
    .insert([{
      user_id: userId,
      reward_id: rewardId,
      points_spent: reward.points_cost,
      status: 'pending',
      redemption_code: generateRedemptionCode()
    }])
    .select()
    .single();

  // Deduct points from user
  await supabase
    .from('profiles')
    .update({ points: profile.points - reward.points_cost })
    .eq('id', userId);

  return redemption;
};
```

### 4. Real-time Features

#### WebSocket Setup
```typescript
// Real-time messaging
const useRealtimeMessages = (groupId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel(`messages${groupId ? `-${groupId}` : ''}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: groupId ? `group_id=eq.${groupId}` : undefined
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId]);

  return messages;
};

// Live notifications
const useRealtimeNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel(`notifications-${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, (payload) => {
        setNotifications(prev => [payload.new as Notification, ...prev]);
        
        // Show toast notification
        toast({
          title: payload.new.title,
          description: payload.new.message,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return notifications;
};
```

### 5. Analytics Dashboard

#### Data Aggregation
```typescript
// User analytics hook
const useUserAnalytics = (userId: string, dateRange: [Date, Date]) => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['user-analytics', userId, dateRange],
    queryFn: async () => {
      const [startDate, endDate] = dateRange;
      
      const { data } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', userId)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

      return data || [];
    }
  });

  // Calculate totals and trends
  const totals = useMemo(() => {
    if (!analytics) return null;
    
    return analytics.reduce((acc, day) => ({
      engagements: acc.engagements + day.engagements_completed,
      points: acc.points + day.points_earned,
      timeSpent: acc.timeSpent + day.time_spent_minutes,
      achievements: acc.achievements + day.achievements_earned
    }), {
      engagements: 0,
      points: 0,
      timeSpent: 0,
      achievements: 0
    });
  }, [analytics]);

  return { analytics, totals, isLoading };
};
```

#### Chart Components
```typescript
// Engagement chart component
const EngagementChart = ({ data }: { data: AnalyticsData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
        />
        <YAxis />
        <Tooltip 
          labelFormatter={(date) => new Date(date).toLocaleDateString()}
          formatter={(value, name) => [value, name === 'engagements_completed' ? 'Engagements' : 'Points']}
        />
        <Line 
          type="monotone" 
          dataKey="engagements_completed" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))' }}
        />
        <Line 
          type="monotone" 
          dataKey="points_earned" 
          stroke="hsl(var(--chart-2))" 
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--chart-2))' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
```

### 6. Payment Integration

#### Stripe Setup
```typescript
// Stripe provider setup
const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY!);
  
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

// Subscription management
const createSubscription = async (priceId: string) => {
  const { data, error } = await supabase.functions.invoke('create-subscription', {
    body: { priceId }
  });

  if (error) throw error;
  
  // Redirect to Stripe Checkout
  const stripe = await stripePromise;
  await stripe?.redirectToCheckout({
    sessionId: data.sessionId
  });
};

// Subscription tiers
const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Connect up to 2 social accounts',
      'Basic dashboard',
      'Limited engagements (5/month)',
      'Community access'
    ]
  },
  pro: {
    name: 'Pro',
    price: 29,
    priceId: 'price_pro_monthly',
    features: [
      'Unlimited social accounts',
      'Advanced analytics',
      'Unlimited engagements',
      'Priority support',
      'AI recommendations'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: 99,
    priceId: 'price_enterprise_monthly',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom reporting',
      'API access',
      'Dedicated support'
    ]
  }
};
```

## 🚀 Deployment Architecture

### Multi-Platform Deployment Support

#### 1. Vercel Deployment
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "VITE_STRIPE_PUBLISHABLE_KEY": "@stripe-publishable-key"
  }
}
```

#### 2. Netlify Deployment
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
```

#### 3. Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 4. Railway Deployment
```json
// railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "healthcheckPath": "/",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Environment Configuration
```bash
# Production Environment Variables
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-key

# Social Media API Keys (Supabase Secrets)
INSTAGRAM_CLIENT_ID=your-instagram-client-id
INSTAGRAM_CLIENT_SECRET=your-instagram-client-secret
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

## 🧪 Testing Strategy

### Unit Testing
```typescript
// Component tests
import { render, screen } from '@testing-library/react';
import { EngagementCard } from '@/components/engagement/EngagementCard';

describe('EngagementCard', () => {
  it('renders engagement details correctly', () => {
    const mockEngagement = {
      id: '1',
      target_username: 'testuser',
      engagement_type: 'like',
      points_value: 5,
      target_platform: 'instagram'
    };

    render(<EngagementCard engagement={mockEngagement} />);
    
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('5 points')).toBeInTheDocument();
  });
});

// Hook tests
import { renderHook } from '@testing-library/react';
import { useUserAnalytics } from '@/hooks/useUserAnalytics';

describe('useUserAnalytics', () => {
  it('calculates totals correctly', async () => {
    const { result } = renderHook(() => 
      useUserAnalytics('user-id', [new Date(), new Date()])
    );

    await waitFor(() => {
      expect(result.current.totals).toBeDefined();
    });
  });
});
```

### Integration Testing
```typescript
// API integration tests
import { createClient } from '@supabase/supabase-js';

describe('Engagement API', () => {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  );

  it('creates engagement successfully', async () => {
    const { data, error } = await supabase
      .from('engagements')
      .insert([{
        target_platform: 'instagram',
        target_username: 'testuser',
        engagement_type: 'like',
        points_value: 5
      }])
      .select()
      .single();

    expect(error).toBeNull();
    expect(data.target_username).toBe('testuser');
  });
});
```

### E2E Testing with Playwright
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can sign up and sign in', async ({ page }) => {
    await page.goto('/signup');
    
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.fill('[data-testid="username"]', 'testuser');
    
    await page.click('[data-testid="signup-button"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('user can connect social accounts', async ({ page }) => {
    await page.goto('/dashboard/accounts');
    
    await page.click('[data-testid="connect-instagram"]');
    
    // Mock OAuth redirect
    await page.waitForURL('**/oauth/callback**');
    
    await expect(page.locator('[data-testid="instagram-connected"]')).toBeVisible();
  });
});
```

## 📊 Performance Optimization

### Code Splitting
```typescript
// Lazy loading for better performance
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Analytics = lazy(() => import('@/pages/AnalyticsPage'));
const Community = lazy(() => import('@/pages/CommunityPage'));

// Route-based code splitting
const AppRouter = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/community" element={<Community />} />
      </Routes>
    </Suspense>
  </Router>
);
```

### Data Optimization
```typescript
// Efficient data fetching with React Query
const useEngagements = (userId: string) => {
  return useQuery({
    queryKey: ['engagements', userId],
    queryFn: () => fetchEngagements(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });
};

// Pagination for large datasets
const useEngagementsPaginated = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ['engagements-paginated', userId],
    queryFn: ({ pageParam = 0 }) => 
      fetchEngagements(userId, { offset: pageParam, limit: 20 }),
    getNextPageParam: (lastPage, pages) => 
      lastPage.length === 20 ? pages.length * 20 : undefined
  });
};
```

### Image Optimization
```typescript
// Optimized image component
const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className 
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {error && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">Failed to load</span>
        </div>
      )}
    </div>
  );
};
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Build application
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Automated Testing
```bash
#!/bin/bash
# scripts/test_all.sh

echo "🧪 Running all tests..."

# Unit tests
echo "Running unit tests..."
npm run test

# Integration tests
echo "Running integration tests..."
npm run test:integration

# E2E tests
echo "Running E2E tests..."
npm run test:e2e

# Linting
echo "Running linter..."
npm run lint

# Type checking
echo "Type checking..."
npm run type-check

echo "✅ All tests completed!"
```

## 📈 Analytics & Monitoring

### Performance Monitoring
```typescript
// Performance tracking
const trackPageLoad = (pageName: string) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    // Send to analytics
    gtag('event', 'page_load_time', {
      page_name: pageName,
      load_time: Math.round(loadTime)
    });
  };
};

// Error tracking
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Global error caught:', error);
      
      // Send to error tracking service
      if (typeof window !== 'undefined' && window.Sentry) {
        window.Sentry.captureException(error.error);
      }
      
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <Button onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
```

### User Analytics
```typescript
// Track user actions
const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, properties?: object) => {
    // Google Analytics
    gtag('event', eventName, properties);
    
    // Custom analytics
    supabase.from('user_events').insert([{
      event_name: eventName,
      properties,
      user_id: user?.id,
      timestamp: new Date().toISOString()
    }]);
  }, [user]);

  const trackEngagement = useCallback((type: string, platform: string) => {
    trackEvent('engagement_completed', {
      engagement_type: type,
      platform,
      timestamp: Date.now()
    });
  }, [trackEvent]);

  return { trackEvent, trackEngagement };
};
```

## 🛡️ Security Implementation

### Input Validation
```typescript
// Zod schemas for validation
const ProfileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  full_name: z.string()
    .min(1, 'Full name is required')
    .max(50, 'Full name must be less than 50 characters'),
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
});

const EngagementSchema = z.object({
  target_platform: z.enum(['instagram', 'twitter', 'youtube', 'linkedin', 'facebook', 'tiktok']),
  target_username: z.string().min(1, 'Username is required'),
  target_post_url: z.string().url('Must be a valid URL').optional(),
  engagement_type: z.enum(['like', 'comment', 'share', 'follow']),
  points_value: z.number().min(1).max(100)
});
```

### Rate Limiting
```typescript
// Rate limiting hook
const useRateLimit = (key: string, limit: number, windowMs: number) => {
  const [requests, setRequests] = useState<number[]>([]);

  const isAllowed = useCallback(() => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    const recentRequests = requests.filter(time => time > windowStart);
    
    if (recentRequests.length >= limit) {
      return false;
    }

    setRequests([...recentRequests, now]);
    return true;
  }, [requests, limit, windowMs]);

  return { isAllowed };
};
```

### Data Sanitization
```typescript
// XSS prevention
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// SQL injection prevention (handled by Supabase, but good to validate)
const validateUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};
```

## 🔮 Future Enhancements

### AI-Powered Features
```typescript
// AI content recommendations
const useContentSuggestions = (userId: string) => {
  return useQuery({
    queryKey: ['content-suggestions', userId],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('ai-content-suggestions', {
        body: { userId }
      });
      return data;
    },
    staleTime: 30 * 60 * 1000 // 30 minutes
  });
};

// Engagement prediction
const predictEngagementSuccess = async (engagementData: EngagementData) => {
  const { data } = await supabase.functions.invoke('predict-engagement', {
    body: engagementData
  });
  return data.successProbability;
};
```

### Blockchain Integration
```typescript
// NFT rewards system
const mintRewardNFT = async (userId: string, achievementId: string) => {
  const { data } = await supabase.functions.invoke('mint-achievement-nft', {
    body: { userId, achievementId }
  });
  return data.tokenId;
};

// Cryptocurrency rewards
const awardCryptoReward = async (userId: string, amount: number) => {
  const { data } = await supabase.functions.invoke('crypto-reward', {
    body: { userId, amount, currency: 'USDC' }
  });
  return data.transactionHash;
};
```

### Advanced Analytics
```typescript
// Machine learning insights
const useMLInsights = (userId: string) => {
  return useQuery({
    queryKey: ['ml-insights', userId],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('ml-insights', {
        body: { userId }
      });
      return data;
    }
  });
};

// Predictive analytics
const usePredictiveAnalytics = (userId: string) => {
  return useQuery({
    queryKey: ['predictive-analytics', userId],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('predictive-analytics', {
        body: { userId }
      });
      return data;
    }
  });
};
```

## 📋 Implementation Checklist

### Phase 1: Foundation (Weeks 1-2)
- [ ] Project setup with Vite + React + TypeScript
- [ ] Supabase configuration and database schema
- [ ] Authentication system with Supabase Auth
- [ ] Basic UI components with shadcn/ui
- [ ] Responsive layout and navigation
- [ ] Dark/light theme implementation

### Phase 2: Core Features (Weeks 3-4)
- [ ] Social media OAuth integration
- [ ] Engagement system (create, complete, verify)
- [ ] Points and rewards system
- [ ] Basic analytics dashboard
- [ ] User profile management
- [ ] Real-time notifications

### Phase 3: Community Features (Weeks 5-6)
- [ ] Group creation and management
- [ ] Real-time messaging system
- [ ] Community engagement features
- [ ] Achievement system
- [ ] Advanced analytics with charts

### Phase 4: Premium Features (Weeks 7-8)
- [ ] Stripe payment integration
- [ ] Subscription management
- [ ] Premium-only features
- [ ] Advanced reporting
- [ ] API access for enterprise users

### Phase 5: Production Readiness (Weeks 9-10)
- [ ] Comprehensive testing suite
- [ ] Performance optimization
- [ ] Security audit and fixes
- [ ] CI/CD pipeline setup
- [ ] Multi-platform deployment
- [ ] Documentation and guides
- [ ] Monitoring and analytics

## 🎯 Success Metrics

### Technical KPIs
- Page load time < 3 seconds
- 99.9% uptime
- < 100ms API response time
- Zero critical security vulnerabilities
- 90%+ test coverage

### Business KPIs
- User retention rate > 70% (30 days)
- Conversion rate > 15% (free to paid)
- Monthly active users > 10,000
- Average session time > 15 minutes
- Customer satisfaction score > 4.5/5

### User Engagement KPIs
- Daily active users > 30% of total
- Engagements completed per user > 10/month
- Social accounts connected per user > 3
- Group participation rate > 50%
- Reward redemption rate > 25%

## 💰 Monetization Strategy

### Revenue Streams
1. **Subscription Revenue** (Primary)
   - Pro: $29/month
   - Enterprise: $99/month
   - Target: 15% conversion rate

2. **Transaction Fees**
   - Reward redemptions: 5%
   - Cryptocurrency rewards: 3%

3. **Brand Partnerships**
   - Sponsored engagements: 10-15% commission
   - Featured creator placements

4. **API Revenue**
   - Enterprise API access: $0.10 per request
   - White-label solutions: $500+ setup fee

### Market Analysis
- Total Addressable Market: $104.2B (creator economy)
- Serviceable Available Market: $10.4B (multi-platform creators)
- Target Market Share: 0.1% by Year 3
- Projected Revenue: $32.6M by Year 5

## 🏁 Conclusion

This comprehensive recreation prompt provides a complete blueprint for rebuilding and enhancing the RoundAbout creator engagement platform. The implementation combines modern web technologies, robust security practices, and scalable architecture to create a production-ready application that can compete in the rapidly growing creator economy market.

The platform's value proposition lies in its unique approach to gamifying social media engagement while providing real value to creators through analytics, community features, and tangible rewards. With proper execution, RoundAbout is positioned to capture significant market share and generate substantial revenue through its multi-tier monetization strategy.

**Key Success Factors:**
1. Flawless execution of core engagement features
2. Strong security and privacy protections
3. Seamless social media integrations
4. Engaging user experience with real-time features
5. Sustainable monetization without compromising user value
6. Continuous innovation based on user feedback
7. Strategic partnerships with social platforms and brands

This platform represents a significant opportunity in the creator economy space, with clear paths to profitability and scale.