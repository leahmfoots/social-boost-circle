
# RoundAbout Platform - Developer Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Git

### Installation
```bash
git clone <repository-url>
cd roundabout-platform
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── auth/           # Authentication components
│   ├── social/         # Social media integration
│   ├── messaging/      # Real-time messaging
│   ├── analytics/      # Analytics and charts
│   └── rewards/        # Rewards and gamification
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/      # Supabase client and types
├── pages/              # Route components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## 🎨 Component Guidelines

### UI Components
Use shadcn/ui components as the foundation:
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MyComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
};
```

### Custom Hooks
Create focused, reusable hooks:
```typescript
// hooks/useProfile.ts
export const useProfile = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });
};
```

## 🗄️ Database Operations

### Query Patterns
```typescript
// Basic query
const { data: rewards } = useQuery({
  queryKey: ['rewards'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('is_active', true)
      .order('points_required', { ascending: true });
    
    if (error) throw error;
    return data;
  }
});

// Mutation with optimistic updates
const mutation = useMutation({
  mutationFn: async (data) => {
    const { data: result, error } = await supabase
      .from('engagements')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['engagements'] });
  }
});
```

### Row Level Security
All tables use RLS policies:
```sql
-- Example policy
CREATE POLICY "Users can view own data" 
ON table_name FOR SELECT 
USING (auth.uid() = user_id);
```

## 🔄 Real-time Features

### Setting up Subscriptions
```typescript
// Real-time hook example
export const useRealtimeMessages = (channelId: string) => {
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

## 🎯 State Management

### React Query Configuration
```typescript
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
    },
  },
});
```

### Context Usage
```typescript
// Using AuthContext
const { user, signIn, signOut, loading } = useAuth();

// Protecting routes
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## 🔐 Authentication Flow

### Login Process
```typescript
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};
```

### OAuth Integration
```typescript
const signInWithOAuth = async (provider: 'google' | 'github') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  });
};
```

## 📊 Analytics Implementation

### Event Tracking
```typescript
const trackEvent = async (eventType: string, data: any) => {
  await supabase
    .from('user_analytics')
    .insert({
      user_id: user.id,
      event_type: eventType,
      event_data: data,
      platform: window.location.hostname,
    });
};
```

### Chart Components
```typescript
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

export const EngagementChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Line type="monotone" dataKey="engagements" stroke="#624DE3" />
    </LineChart>
  </ResponsiveContainer>
);
```

## 🎮 Gamification System

### Points Calculation
```typescript
const ENGAGEMENT_POINTS = {
  like: 10,
  comment: 25,
  share: 50,
  follow: 100,
  subscribe: 150,
};

const calculatePoints = (engagementType: string, multiplier = 1) => {
  return ENGAGEMENT_POINTS[engagementType] * multiplier;
};
```

### Achievement System
```typescript
const checkAchievements = async (userId: string, eventData: any) => {
  const achievements = await supabase
    .from('achievements')
    .select('*')
    .eq('is_active', true);

  for (const achievement of achievements.data || []) {
    const meetsRequirements = evaluateRequirements(
      achievement.requirements,
      eventData
    );
    
    if (meetsRequirements) {
      await awardAchievement(userId, achievement.id);
    }
  }
};
```

## 🔌 API Integration

### Social Media APIs
```typescript
// Instagram Basic Display API
const fetchInstagramData = async (accessToken: string) => {
  const response = await fetch(
    `https://graph.instagram.com/me?fields=id,username,account_type&access_token=${accessToken}`
  );
  return response.json();
};

// YouTube Data API
const fetchYouTubeData = async (accessToken: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&mine=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.json();
};
```

### Stripe Integration
```typescript
// Payment processing
const createSubscription = async (priceId: string) => {
  const { data, error } = await supabase.functions.invoke('create-subscription', {
    body: { priceId }
  });
  
  if (error) throw error;
  return data;
};
```

## 🧪 Testing

### Component Testing
```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Hook Testing
```typescript
// __tests__/hooks/useProfile.test.tsx
import { renderHook } from '@testing-library/react';
import { useProfile } from '@/hooks/useProfile';

test('fetches user profile', async () => {
  const { result } = renderHook(() => useProfile());
  expect(result.current.isLoading).toBe(true);
});
```

## 🚀 Deployment

### Environment Setup
```bash
# Production environment variables
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Build Process
```bash
# Create production build
npm run build

# Preview build locally
npm run preview

# Deploy to Vercel
vercel --prod
```

### Supabase Deployment
```bash
# Deploy database migrations
supabase db push

# Deploy edge functions
supabase functions deploy

# Set production secrets
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
```

## 📱 Performance Optimization

### Code Splitting
```typescript
// Lazy load components
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Analytics = React.lazy(() => import('@/pages/AnalyticsPage'));

// Route-level splitting
<Routes>
  <Route path="/dashboard" element={
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  } />
</Routes>
```

### Image Optimization
```typescript
// Lazy loading images
import { useState } from 'react';

export const LazyImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
      {...props}
    />
  );
};
```

## 🔍 Debugging

### React Query DevTools
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <AppContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
```

### Supabase Debugging
```typescript
// Enable debug logging
supabase.auth.debug = true;

// Check RLS policies
const { data, error } = await supabase
  .from('table_name')
  .select('*');

if (error) {
  console.error('RLS Error:', error.message);
}
```

## 📝 Best Practices

### Code Organization
- Use TypeScript strict mode
- Follow component composition patterns
- Keep components small and focused
- Use custom hooks for logic reuse
- Implement proper error boundaries

### Performance
- Implement virtualization for large lists
- Use React.memo for expensive components
- Optimize bundle size with tree shaking
- Implement proper caching strategies
- Monitor Core Web Vitals

### Security
- Validate all user inputs
- Use RLS policies properly
- Sanitize data before rendering
- Implement proper CORS policies
- Keep dependencies updated

This guide provides comprehensive information for developers working on the RoundAbout platform.
