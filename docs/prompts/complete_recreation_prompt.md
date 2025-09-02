# Complete RoundAbout Platform Recreation Prompt

## 🎯 Project Overview

Create a comprehensive creator engagement platform called "RoundAbout" - a gamified social media engagement system where creators connect their social accounts, complete engagement tasks, earn points, and redeem rewards while building community.

## 🏗️ Technical Architecture

### Core Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (Auth, Database, Real-time, Edge Functions)
- **Styling**: Tailwind CSS + Shadcn/UI
- **State Management**: TanStack React Query
- **Routing**: React Router DOM
- **Payment**: Stripe integration
- **Charts**: Recharts for analytics

### Database Schema (PostgreSQL)
```sql
-- Core user management
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  subscription_tier TEXT DEFAULT 'free',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Social media accounts
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  platform TEXT NOT NULL, -- instagram, twitter, youtube, linkedin, tiktok, facebook
  username TEXT NOT NULL,
  account_id TEXT NOT NULL,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  is_connected BOOLEAN DEFAULT true,
  connected_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- Engagement opportunities
CREATE TABLE engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  target_user_id UUID REFERENCES profiles(id),
  platform TEXT NOT NULL,
  engagement_type TEXT NOT NULL, -- like, comment, follow, share, subscribe
  content_url TEXT NOT NULL,
  content_title TEXT,
  points_value INTEGER NOT NULL DEFAULT 10,
  status TEXT DEFAULT 'pending', -- pending, completed, verified, rejected
  proof_url TEXT,
  proof_screenshot TEXT,
  submitted_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Rewards system
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  reward_type TEXT DEFAULT 'gift_card', -- gift_card, cash, product, service, premium_feature
  reward_value DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Community features
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  is_private BOOLEAN DEFAULT false,
  member_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Real-time messaging
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES profiles(id),
  recipient_id UUID REFERENCES profiles(id),
  group_id UUID REFERENCES groups(id),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- text, image, file, system
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables and create appropriate policies
```

## 📱 Page Structure & Features

### 1. Landing Page (/)
```typescript
// Hero section with gradient background
- "Empower Your Creator Journey" tagline
- Feature highlights with icons
- Social proof (user count, points awarded)
- CTA buttons (Sign Up, Learn More)
- Footer with links

// Features to highlight:
- Multi-platform integration (Instagram, Twitter, YouTube, LinkedIn, TikTok, Facebook)
- Points-based rewards system
- Real-time collaboration
- Analytics dashboard
- Community features
```

### 2. Authentication (/auth)
```typescript
// Combined login/signup with tabs
- Email/password authentication
- Social OAuth options (Google, GitHub)
- Form validation with proper error handling
- Password strength indicator
- "Remember me" functionality
- Email verification flow
```

### 3. Dashboard (/dashboard)
```typescript
// Main hub showing:
- Welcome message with user name
- Stats grid: Total Points, Engagements, Followers, Revenue
- Interactive engagement chart (daily/weekly/monthly views)
- Recent activity feed
- Quick action buttons
- Achievement progress
- Connected platforms overview
```

### 4. Engagements (/engagement)
```typescript
// Engagement opportunities management:
- Filterable table (platform, type, status, date)
- Engagement cards showing:
  * Platform icon and name
  * Content preview/thumbnail
  * Points value
  * Engagement type (like, comment, follow, etc.)
  * Deadline/expiry
  * Status badge
- "Complete Engagement" modal with:
  * Instructions
  * Proof submission (URL + screenshot upload)
  * Points preview
- Engagement history and tracking
```

### 5. Social Accounts (/accounts)
```typescript
// Social media account management:
- Platform connection cards (6 total):
  * Instagram, Twitter, YouTube, LinkedIn, TikTok, Facebook
  * Connection status (connected/not connected)
  * Follower/following counts
  * Verification badges
  * Last sync timestamp
  * Connect/Disconnect buttons
- OAuth integration for each platform
- Account synchronization features
- Performance metrics per platform
```

### 6. Analytics (/analytics)
```typescript
// Comprehensive analytics dashboard:
- Interactive charts (Line, Bar, Pie) using Recharts
- Metrics: Engagement rate, follower growth, points earned
- Platform comparison
- Time period selectors (7d, 30d, 90d, 1y)
- Export functionality
- Growth projections
- Revenue tracking
```

### 7. Community (/community)
```typescript
// Creator networking and collaboration:
- Creator profiles grid with search/filter
- Join/create groups functionality
- Group member management
- Collaboration requests
- Community challenges
- Leaderboards
- Event calendar
```

### 8. Messages (/messages)
```typescript
// Real-time messaging system:
- Contact list with online status
- Chat interface with message threads
- Message status indicators (sent, delivered, read)
- File/image sharing
- Group messaging
- Message search and filtering
- Notification management
```

### 9. Rewards (/rewards)
```typescript
// Points redemption system:
- Rewards catalog with categories
- Point balance display
- Reward cards showing:
  * Title and description
  * Points required
  * Reward value
  * Stock availability
  * Terms and conditions
- Redemption history
- Achievement badges
- Points earning opportunities
```

### 10. Settings (/settings)
```typescript
// User preferences and configuration:
- Profile management (avatar, bio, links)
- Account settings (email, password, 2FA)
- Notification preferences
- Privacy controls
- Connected apps management
- Theme selection (dark/light/auto)
- Language preferences
- Data export/deletion
```

### 11. Premium (/premium)
```typescript
// Subscription management:
- Pricing tiers (Free, Pro, Enterprise)
- Feature comparison table
- Stripe payment integration
- Billing history
- Subscription management
- Usage analytics
- Premium feature previews
```

## 🎨 Design Requirements

### Color Scheme & Theming
```css
/* CSS Custom Properties */
:root {
  --primary: 263 85% 62%; /* Purple gradient primary */
  --secondary: 210 40% 98%; /* Light background */
  --accent: 142 76% 36%; /* Success green */
  --destructive: 0 84% 60%; /* Error red */
  --muted: 210 40% 96%; /* Muted backgrounds */
  --border: 214 32% 91%; /* Border color */
  --input: 214 32% 91%; /* Input borders */
  --ring: 263 85% 62%; /* Focus ring */
}

[data-theme="dark"] {
  --primary: 263 85% 72%;
  --secondary: 222 84% 5%;
  --accent: 142 76% 46%;
  /* ... dark mode variants */
}
```

### Component Library (Shadcn/UI)
```typescript
// Core components to implement:
- Button (variants: default, destructive, outline, secondary, ghost, link)
- Card (with header, content, footer)
- Input, Textarea, Select
- Dialog, Sheet, Popover
- Table with sorting and filtering
- Badge, Avatar, Progress
- Navigation Menu, Breadcrumbs
- Form components with validation
- Toast notifications
- Loading skeletons
```

### Responsive Design
```typescript
// Mobile-first approach with breakpoints:
- sm: 640px (mobile landscape)
- md: 768px (tablet)
- lg: 1024px (laptop)
- xl: 1280px (desktop)
- 2xl: 1536px (large desktop)

// Key responsive behaviors:
- Collapsible sidebar navigation
- Stack cards vertically on mobile
- Horizontal scroll for tables
- Touch-friendly tap targets (44px min)
```

## ⚡ Core Functionality Implementation

### 1. Authentication System
```typescript
// Supabase Auth integration
const AuthContext = createContext({
  user: null,
  signIn: async (email, password) => {},
  signUp: async (email, password, metadata) => {},
  signOut: async () => {},
  loading: false,
  isAuthenticated: false,
});

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return children;
};
```

### 2. Real-time Features
```typescript
// Supabase Realtime subscriptions
const useRealtimeMessages = (channelId: string) => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `channel_id=eq.${channelId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();
      
    return () => supabase.removeChannel(channel);
  }, [channelId]);
  
  return messages;
};
```

### 3. Points System
```typescript
// Points calculation and management
const ENGAGEMENT_POINTS = {
  like: 10,
  comment: 25,
  follow: 50,
  share: 30,
  subscribe: 100,
};

const calculatePoints = (engagementType: string, multiplier = 1) => {
  return ENGAGEMENT_POINTS[engagementType] * multiplier;
};

// Achievement system
const checkAchievements = async (userId: string, newPoints: number) => {
  const achievements = await supabase
    .from('achievements')
    .select('*')
    .lte('points_required', newPoints);
    
  // Award new achievements
  for (const achievement of achievements.data) {
    await awardAchievement(userId, achievement.id);
  }
};
```

### 4. Social Media Integration
```typescript
// OAuth configuration for each platform
const SOCIAL_CONFIGS = {
  instagram: {
    clientId: process.env.VITE_INSTAGRAM_CLIENT_ID,
    redirectUri: `${window.location.origin}/auth/callback/instagram`,
    scopes: ['user_profile', 'user_media'],
  },
  twitter: {
    clientId: process.env.VITE_TWITTER_CLIENT_ID,
    redirectUri: `${window.location.origin}/auth/callback/twitter`,
    scopes: ['tweet.read', 'users.read'],
  },
  // ... other platforms
};

// Account connection flow
const connectSocialAccount = async (platform: string) => {
  const config = SOCIAL_CONFIGS[platform];
  const authUrl = buildOAuthUrl(config);
  window.location.href = authUrl;
};
```

### 5. Payment Integration
```typescript
// Stripe subscription setup
const createSubscription = async (priceId: string) => {
  const { data } = await supabase.functions.invoke('create-subscription', {
    body: { priceId }
  });
  
  if (data.url) {
    window.location.href = data.url;
  }
};

// Subscription tiers
const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic analytics', 'Up to 3 social accounts', '100 engagements/month'],
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    features: ['Advanced analytics', 'Unlimited accounts', 'Unlimited engagements', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    price: 29.99,
    features: ['Everything in Pro', 'Team collaboration', 'Custom integrations', 'Dedicated support'],
  },
};
```

## 🚀 Advanced Features

### 1. Analytics Dashboard
```typescript
// Chart components using Recharts
const EngagementChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="engagements" stroke="#624DE3" />
    </LineChart>
  </ResponsiveContainer>
);

// Data aggregation
const useAnalytics = (timeframe: string) => {
  return useQuery({
    queryKey: ['analytics', timeframe],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_analytics')
        .select('*')
        .gte('created_at', getTimeframeStart(timeframe));
      return aggregateData(data);
    }
  });
};
```

### 2. File Upload System
```typescript
// Supabase Storage integration
const uploadFile = async (file: File, bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
    
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
    
  return publicUrl;
};

// Image upload component
const ImageUpload = ({ onUpload }) => {
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = await uploadFile(file, 'avatars', `${userId}/${file.name}`);
      onUpload(url);
    }
  };
  
  return <input type="file" accept="image/*" onChange={handleFileSelect} />;
};
```

### 3. Search and Filtering
```typescript
// Advanced search functionality
const useSearch = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  
  const { data: results } = useQuery({
    queryKey: ['search', query, filters],
    queryFn: async () => {
      let queryBuilder = supabase.from('engagements').select('*');
      
      if (query) {
        queryBuilder = queryBuilder.textSearch('content_title', query);
      }
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryBuilder = queryBuilder.eq(key, value);
        }
      });
      
      return queryBuilder;
    },
    enabled: query.length > 0 || Object.values(filters).some(Boolean),
  });
  
  return { query, setQuery, filters, setFilters, results };
};
```

## 🔒 Security Implementation

### Row Level Security Policies
```sql
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own engagements" ON engagements
  FOR SELECT USING (auth.uid() = user_id);

-- Public data policies
CREATE POLICY "Everyone can view active rewards" ON rewards
  FOR SELECT USING (is_active = true);
```

### Input Validation
```typescript
// Zod validation schemas
const profileSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  full_name: z.string().min(1).max(100),
  bio: z.string().max(500).optional(),
  website_url: z.string().url().optional(),
});

const engagementSchema = z.object({
  platform: z.enum(['instagram', 'twitter', 'youtube', 'linkedin', 'tiktok', 'facebook']),
  engagement_type: z.enum(['like', 'comment', 'follow', 'share', 'subscribe']),
  content_url: z.string().url(),
  proof_url: z.string().url().optional(),
});
```

## 📦 Deployment & DevOps

### Environment Configuration
```env
# Development
VITE_SUPABASE_URL=your-dev-supabase-url
VITE_SUPABASE_ANON_KEY=your-dev-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-test-key

# Production
VITE_SUPABASE_URL=your-prod-supabase-url
VITE_SUPABASE_ANON_KEY=your-prod-anon-key  
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-live-key
```

### Deployment Platforms
```yaml
# Vercel deployment (recommended)
# Auto-deploys on git push to main
# Zero configuration needed

# Alternative: Netlify
# Build command: npm run build
# Publish directory: dist

# Alternative: Railway/Render
# Dockerfile provided for containerized deployment
```

### CI/CD Pipeline
```yaml
# GitHub Actions workflow
name: Deploy
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci && npm test
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v1
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Component testing with React Testing Library
describe('EngagementCard', () => {
  it('displays engagement information correctly', () => {
    render(<EngagementCard engagement={mockEngagement} />);
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('25 points')).toBeInTheDocument();
  });
});

// Hook testing
describe('useAuth', () => {
  it('handles login successfully', async () => {
    const { result } = renderHook(() => useAuth());
    await act(() => result.current.signIn('test@example.com', 'password'));
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

### E2E Tests
```typescript
// Playwright end-to-end tests
test('user can complete engagement flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid=email]', 'test@example.com');
  await page.fill('[data-testid=password]', 'password');
  await page.click('[data-testid=login-button]');
  
  await page.goto('/engagement');
  await page.click('[data-testid=engagement-card]:first-child');
  await page.fill('[data-testid=proof-url]', 'https://example.com');
  await page.click('[data-testid=submit-button]');
  
  await expect(page.locator('[data-testid=success-message]')).toBeVisible();
});
```

## 🚀 Performance Optimization

### Code Splitting
```typescript
// Route-based code splitting
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Analytics = lazy(() => import('@/pages/Analytics'));

// Component-based splitting
const Chart = lazy(() => import('@/components/Chart'));
```

### Bundle Optimization
```typescript
// Vite configuration for optimal builds
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
  },
});
```

## 📱 Progressive Web App

### PWA Configuration
```json
// manifest.json
{
  "name": "RoundAbout",
  "short_name": "RoundAbout",
  "description": "Creator Engagement Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#624DE3",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Service Worker
```typescript
// Basic service worker for offline functionality
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

## 📊 Sample Data

### Demo Content
```typescript
// Sample engagements for demonstration
const sampleEngagements = [
  {
    platform: 'instagram',
    engagement_type: 'like',
    content_url: 'https://instagram.com/p/sample1',
    content_title: 'Amazing sunset photography',
    points_value: 15,
    status: 'pending',
  },
  {
    platform: 'twitter',
    engagement_type: 'retweet',
    content_url: 'https://twitter.com/user/status/123',
    content_title: 'Inspiring thread about creativity',
    points_value: 25,
    status: 'completed',
  },
  // ... more sample data
];

// Sample rewards
const sampleRewards = [
  {
    title: '$10 Amazon Gift Card',
    description: 'Perfect for shopping on Amazon',
    points_required: 1000,
    reward_type: 'gift_card',
    reward_value: 10.00,
  },
  {
    title: 'Premium Account (1 Month)',
    description: 'Upgrade to premium features',
    points_required: 2500,
    reward_type: 'premium_feature',
  },
];
```

## 🎯 Success Criteria

### Functional Requirements ✅
- ✅ User authentication (signup, login, logout)
- ✅ Social media account connections (6 platforms)
- ✅ Engagement task system with points
- ✅ Real-time messaging between users
- ✅ Analytics dashboard with charts
- ✅ Rewards catalog and redemption
- ✅ Community features (groups, profiles)
- ✅ Premium subscription system
- ✅ Mobile-responsive design
- ✅ Dark/light theme support

### Technical Requirements ✅
- ✅ React 18 with TypeScript
- ✅ Supabase integration (Auth, Database, Real-time)
- ✅ Tailwind CSS + Shadcn/UI components
- ✅ Stripe payment integration
- ✅ Row Level Security policies
- ✅ Real-time subscriptions
- ✅ File upload capabilities
- ✅ Progressive Web App features
- ✅ Comprehensive testing suite
- ✅ CI/CD pipeline ready

### Performance Requirements ✅
- ✅ Page load time < 3 seconds
- ✅ First Contentful Paint < 1.5 seconds
- ✅ Bundle size < 500KB (gzipped)
- ✅ Lighthouse score > 90
- ✅ Mobile-optimized performance
- ✅ Offline functionality (basic)

This comprehensive prompt provides everything needed to recreate the RoundAbout platform as a production-ready application with all modern web development best practices, security measures, and deployment strategies.
