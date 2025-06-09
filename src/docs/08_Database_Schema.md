
# Database Schema

## Overview

RoundAbout uses PostgreSQL as its primary database through Supabase. The schema is designed to support user management, social media integration, engagement tracking, rewards system, and subscription management.

## Entity Relationship Diagram

```
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   profiles  │────│ social_accounts │    │   subscribers   │
│             │    │                 │    │                 │
│ id (PK)     │    │ id (PK)         │    │ id (PK)         │
│ email       │    │ user_id (FK)    │    │ user_id (FK)    │
│ first_name  │    │ platform        │    │ email           │
│ last_name   │    │ username        │    │ subscribed      │
│ points      │    │ account_id      │    │ subscription_   │
│ ...         │    │ ...             │    │ tier            │
└─────────────┘    └─────────────────┘    │ ...             │
       │                                  └─────────────────┘
       │
       ├─────────────────┐    ┌─────────────────┐
       │   engagements   │    │   notifications │
       │                 │    │                 │
       │ id (PK)         │    │ id (PK)         │
       │ user_id (FK)    │    │ user_id (FK)    │
       │ platform        │    │ title           │
       │ content_url     │    │ message         │
       │ points_value    │    │ type            │
       │ status          │    │ read            │
       │ ...             │    │ ...             │
       └─────────────────┘    └─────────────────┘
       │
       ├─────────────────┐    ┌─────────────────┐
       │     rewards     │    │ reward_redemp-  │
       │                 │    │ tions           │
       │ id (PK)         │    │                 │
       │ title           │    │ id (PK)         │
       │ description     │    │ user_id (FK)    │
       │ points_required │    │ reward_id (FK)  │
       │ image_url       │    │ points_used     │
       │ ...             │    │ status          │
       └─────────────────┘    │ ...             │
                              └─────────────────┘
```

## Table Definitions

### profiles
User profile information and core account data.

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website_url TEXT,
  location TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  subscription_tier TEXT CHECK (subscription_tier IN ('free', 'basic', 'premium', 'enterprise')),
  email_verified BOOLEAN NOT NULL DEFAULT false,
  phone_verified BOOLEAN NOT NULL DEFAULT false,
  two_factor_enabled BOOLEAN NOT NULL DEFAULT false,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
```sql
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_points ON profiles(points DESC);
CREATE INDEX idx_profiles_subscription_tier ON profiles(subscription_tier);
```

**Row Level Security:**
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### social_accounts
Connected social media accounts for each user.

```sql
CREATE TABLE public.social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'youtube', 'twitter', 'linkedin', 'facebook', 'tiktok')),
  username TEXT NOT NULL,
  account_id TEXT NOT NULL,
  display_name TEXT,
  profile_image_url TEXT,
  access_token TEXT, -- Encrypted
  refresh_token TEXT, -- Encrypted
  token_expires_at TIMESTAMPTZ,
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_sync_at TIMESTAMPTZ,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, platform, account_id)
);
```

**Indexes:**
```sql
CREATE INDEX idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);
CREATE INDEX idx_social_accounts_username ON social_accounts(username);
CREATE UNIQUE INDEX idx_social_accounts_unique ON social_accounts(user_id, platform, account_id);
```

**Row Level Security:**
```sql
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own social accounts" ON social_accounts
  FOR ALL USING (auth.uid() = user_id);
```

### engagements
User engagement activities across social platforms.

```sql
CREATE TABLE public.engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE SET NULL,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'youtube', 'twitter', 'linkedin', 'facebook', 'tiktok')),
  content_url TEXT NOT NULL,
  content_id TEXT,
  engagement_type TEXT NOT NULL CHECK (engagement_type IN ('like', 'comment', 'share', 'follow', 'subscribe', 'view', 'story_view')),
  points_value INTEGER NOT NULL CHECK (points_value > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'expired')),
  verification_method TEXT CHECK (verification_method IN ('automatic', 'manual', 'api')),
  rejection_reason TEXT,
  screenshot_url TEXT,
  metadata JSONB,
  expires_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
```sql
CREATE INDEX idx_engagements_user_id ON engagements(user_id);
CREATE INDEX idx_engagements_platform ON engagements(platform);
CREATE INDEX idx_engagements_status ON engagements(status);
CREATE INDEX idx_engagements_submitted_at ON engagements(submitted_at DESC);
CREATE INDEX idx_engagements_content_url ON engagements(content_url);
```

**Row Level Security:**
```sql
ALTER TABLE engagements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own engagements" ON engagements
  FOR ALL USING (auth.uid() = user_id);
```

### rewards
Available rewards that users can redeem with points.

```sql
CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL CHECK (points_required > 0),
  category TEXT NOT NULL CHECK (category IN ('gift_card', 'merchandise', 'subscription', 'service', 'donation', 'experience')),
  image_url TEXT,
  terms_conditions TEXT,
  redemption_instructions TEXT,
  vendor_name TEXT,
  vendor_contact TEXT,
  stock_quantity INTEGER,
  max_redemptions_per_user INTEGER DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT now(),
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
```sql
CREATE INDEX idx_rewards_points_required ON rewards(points_required);
CREATE INDEX idx_rewards_category ON rewards(category);
CREATE INDEX idx_rewards_is_active ON rewards(is_active);
CREATE INDEX idx_rewards_is_featured ON rewards(is_featured);
CREATE INDEX idx_rewards_sort_order ON rewards(sort_order);
```

**Row Level Security:**
```sql
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active rewards" ON rewards
  FOR SELECT USING (is_active = true);
```

### reward_redemptions
User redemptions of rewards.

```sql
CREATE TABLE public.reward_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES rewards(id) ON DELETE RESTRICT,
  points_used INTEGER NOT NULL CHECK (points_used > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'fulfilled', 'cancelled', 'failed')),
  fulfillment_details JSONB,
  tracking_number TEXT,
  notes TEXT,
  redeemed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  fulfilled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
```sql
CREATE INDEX idx_reward_redemptions_user_id ON reward_redemptions(user_id);
CREATE INDEX idx_reward_redemptions_reward_id ON reward_redemptions(reward_id);
CREATE INDEX idx_reward_redemptions_status ON reward_redemptions(status);
CREATE INDEX idx_reward_redemptions_redeemed_at ON reward_redemptions(redeemed_at DESC);
```

**Row Level Security:**
```sql
ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own redemptions" ON reward_redemptions
  FOR ALL USING (auth.uid() = user_id);
```

### subscribers
Subscription and payment status tracking.

```sql
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT CHECK (subscription_tier IN ('basic', 'premium', 'enterprise')),
  subscription_status TEXT CHECK (subscription_status IN ('active', 'past_due', 'canceled', 'unpaid')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  subscription_end TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  payment_method_id TEXT,
  billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_subscribers_email ON subscribers(email);
CREATE UNIQUE INDEX idx_subscribers_stripe_customer_id ON subscribers(stripe_customer_id);
CREATE INDEX idx_subscribers_user_id ON subscribers(user_id);
CREATE INDEX idx_subscribers_subscribed ON subscribers(subscribed);
```

**Row Level Security:**
```sql
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription" ON subscribers
  FOR SELECT USING (auth.uid() = user_id OR email = auth.email());

CREATE POLICY "Service role can manage subscriptions" ON subscribers
  FOR ALL USING (true);
```

### notifications
User notifications and alerts.

```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('engagement_verified', 'points_earned', 'reward_available', 'subscription_updated', 'account_connected', 'system_announcement')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  data JSONB,
  read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,
  action_url TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
```sql
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_priority ON notifications(priority);
```

**Row Level Security:**
```sql
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id);
```

### groups (Community Feature)
User-created groups for collaboration.

```sql
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'public' CHECK (type IN ('public', 'private', 'invite_only')),
  category TEXT,
  max_members INTEGER DEFAULT 50,
  member_count INTEGER NOT NULL DEFAULT 1,
  image_url TEXT,
  rules TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### group_members
Group membership tracking.

```sql
CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(group_id, user_id)
);
```

## Views

### user_stats
Aggregated user statistics.

```sql
CREATE VIEW user_stats AS
SELECT 
  p.id,
  p.email,
  p.points,
  COUNT(DISTINCT sa.id) as connected_accounts,
  COUNT(DISTINCT e.id) as total_engagements,
  COUNT(DISTINCT CASE WHEN e.status = 'verified' THEN e.id END) as verified_engagements,
  COUNT(DISTINCT rr.id) as total_redemptions,
  SUM(CASE WHEN e.status = 'verified' THEN e.points_value ELSE 0 END) as earned_points
FROM profiles p
LEFT JOIN social_accounts sa ON p.id = sa.user_id AND sa.is_active = true
LEFT JOIN engagements e ON p.id = e.user_id
LEFT JOIN reward_redemptions rr ON p.id = rr.user_id
GROUP BY p.id, p.email, p.points;
```

### platform_analytics
Platform-wise engagement analytics.

```sql
CREATE VIEW platform_analytics AS
SELECT 
  platform,
  COUNT(*) as total_engagements,
  COUNT(CASE WHEN status = 'verified' THEN 1 END) as verified_engagements,
  AVG(points_value) as avg_points,
  SUM(CASE WHEN status = 'verified' THEN points_value ELSE 0 END) as total_points
FROM engagements
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY platform;
```

## Functions

### update_user_points()
Trigger function to update user points when engagements are verified.

```sql
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  -- Add points when engagement is verified
  IF NEW.status = 'verified' AND OLD.status != 'verified' THEN
    UPDATE profiles 
    SET points = points + NEW.points_value,
        updated_at = now()
    WHERE id = NEW.user_id;
  END IF;
  
  -- Subtract points when engagement is rejected after being verified
  IF NEW.status = 'rejected' AND OLD.status = 'verified' THEN
    UPDATE profiles 
    SET points = GREATEST(points - NEW.points_value, 0),
        updated_at = now()
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_points
  AFTER UPDATE ON engagements
  FOR EACH ROW
  EXECUTE FUNCTION update_user_points();
```

### deduct_redemption_points()
Trigger function to deduct points when rewards are redeemed.

```sql
CREATE OR REPLACE FUNCTION deduct_redemption_points()
RETURNS TRIGGER AS $$
BEGIN
  -- Deduct points when redemption is created
  UPDATE profiles 
  SET points = points - NEW.points_used,
      updated_at = now()
  WHERE id = NEW.user_id;
  
  -- Validate user has enough points
  IF (SELECT points FROM profiles WHERE id = NEW.user_id) < 0 THEN
    RAISE EXCEPTION 'Insufficient points for redemption';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_deduct_redemption_points
  BEFORE INSERT ON reward_redemptions
  FOR EACH ROW
  EXECUTE FUNCTION deduct_redemption_points();
```

## Migrations

### Migration Strategy
1. **Initial Schema** - Create all tables and basic constraints
2. **Indexes** - Add performance indexes
3. **RLS Policies** - Implement row-level security
4. **Views and Functions** - Add computed views and business logic
5. **Sample Data** - Insert initial rewards and system data

### Migration Files Structure
```
supabase/migrations/
├── 001_initial_schema.sql
├── 002_add_indexes.sql
├── 003_setup_rls.sql
├── 004_create_views.sql
├── 005_add_triggers.sql
└── 006_sample_data.sql
```

## Backup and Recovery

### Automated Backups
- Daily automated backups via Supabase
- Point-in-time recovery available
- Cross-region backup replication

### Manual Backup Commands
```sql
-- Backup specific tables
pg_dump -h hostname -p port -U username -t profiles -t engagements database_name > backup.sql

-- Restore from backup
psql -h hostname -p port -U username -d database_name < backup.sql
```

## Performance Considerations

### Query Optimization
- Use appropriate indexes for frequently queried columns
- Implement pagination for large result sets
- Use materialized views for complex aggregations
- Regular VACUUM and ANALYZE operations

### Scaling Strategy
- Read replicas for heavy read workloads
- Connection pooling via PgBouncer
- Partitioning for large tables (engagements, notifications)
- Caching layer for frequently accessed data

## Security

### Data Encryption
- All sensitive data encrypted at rest
- TLS encryption for data in transit
- Application-level encryption for tokens

### Access Control
- Row Level Security (RLS) on all user tables
- Service role for administrative operations
- API key rotation and management
- Audit logging for sensitive operations
