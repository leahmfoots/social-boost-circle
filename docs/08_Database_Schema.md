
# Database Schema Documentation
## RoundAbout Creator Platform

### 🗄️ Database Overview

#### Database Information
- **Engine**: PostgreSQL 15
- **Provider**: Supabase
- **Features**: Row Level Security (RLS), Real-time subscriptions, JSON support
- **Extensions**: uuid-ossp, pg_stat_statements, pgcrypto

#### Schema Organization
```sql
-- Main schemas
public          -- Application tables
auth            -- Supabase authentication (managed)
storage         -- File storage (managed)
realtime        -- Real-time functionality (managed)
extensions      -- Database extensions
```

### 👤 User Management Tables

#### profiles
**Purpose**: Extended user profile information beyond Supabase auth.users
```sql
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);
```

#### user_settings
**Purpose**: User preferences and configuration settings
```sql
CREATE TABLE public.user_settings (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_preferences JSONB DEFAULT '{"email": true, "push": false, "sms": false}',
  theme VARCHAR DEFAULT 'dark',
  dashboard_layout VARCHAR DEFAULT 'default',
  chart_style VARCHAR DEFAULT 'candles',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  PRIMARY KEY (user_id)
);

-- RLS Policies
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own settings" 
  ON user_settings FOR ALL USING (auth.uid() = user_id);
```

#### follows
**Purpose**: Creator following relationships
```sql
CREATE TABLE public.follows (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Indexes
CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

-- RLS Policies
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all follows" 
  ON follows FOR SELECT USING (true);

CREATE POLICY "Users can manage their own follows" 
  ON follows FOR ALL USING (auth.uid() = follower_id);
```

### 🔗 Social Media Integration Tables

#### social_accounts
**Purpose**: Connected social media platform accounts
```sql
CREATE TABLE public.social_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR NOT NULL, -- 'instagram', 'youtube', 'tiktok', 'twitter', 'linkedin'
  platform_user_id VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  display_name VARCHAR,
  profile_url VARCHAR,
  avatar_url VARCHAR,
  is_active BOOLEAN DEFAULT true,
  access_token TEXT, -- Encrypted
  refresh_token TEXT, -- Encrypted  
  token_expires_at TIMESTAMPTZ,
  last_sync TIMESTAMPTZ,
  sync_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id),
  UNIQUE(user_id, platform, platform_user_id)
);

-- Indexes
CREATE INDEX idx_social_accounts_user_platform ON social_accounts(user_id, platform);
CREATE INDEX idx_social_accounts_active ON social_accounts(user_id, is_active);

-- RLS Policies
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own social accounts" 
  ON social_accounts FOR ALL USING (auth.uid() = user_id);
```

#### engagement_metrics
**Purpose**: Social media performance metrics
```sql
CREATE TABLE public.engagement_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform VARCHAR NOT NULL,
  metric_type VARCHAR NOT NULL, -- 'followers', 'likes', 'comments', 'shares', 'views'
  value BIGINT NOT NULL,
  date DATE NOT NULL,
  content_id VARCHAR, -- Platform-specific content identifier
  content_type VARCHAR, -- 'post', 'story', 'video', 'reel'
  metadata JSONB, -- Platform-specific additional data
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_engagement_metrics_user_date ON engagement_metrics(user_id, date);
CREATE INDEX idx_engagement_metrics_platform ON engagement_metrics(platform, metric_type);
CREATE INDEX idx_engagement_metrics_content ON engagement_metrics(content_id, platform);

-- RLS Policies
ALTER TABLE engagement_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own metrics" 
  ON engagement_metrics FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics" 
  ON engagement_metrics FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 🎮 Gamification & Rewards Tables

#### user_points
**Purpose**: User point balances and transactions
```sql
CREATE TABLE public.user_points (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER NOT NULL DEFAULT 0,
  available_points INTEGER NOT NULL DEFAULT 0,
  points_earned_today INTEGER NOT NULL DEFAULT 0,
  points_earned_this_week INTEGER NOT NULL DEFAULT 0,
  points_earned_this_month INTEGER NOT NULL DEFAULT 0,
  current_level INTEGER NOT NULL DEFAULT 1,
  points_to_next_level INTEGER NOT NULL DEFAULT 100,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (user_id),
  CHECK (total_points >= 0),
  CHECK (available_points >= 0),
  CHECK (available_points <= total_points)
);

-- RLS Policies
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own points" 
  ON user_points FOR SELECT USING (auth.uid() = user_id);
```

#### point_transactions
**Purpose**: Point earning and spending history
```sql
CREATE TABLE public.point_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_type VARCHAR NOT NULL, -- 'earned', 'spent', 'bonus', 'penalty'
  points INTEGER NOT NULL,
  reason VARCHAR NOT NULL,
  description TEXT,
  reference_id UUID, -- Reference to related record (engagement, reward, etc.)
  reference_type VARCHAR, -- 'engagement', 'reward_redemption', 'achievement'
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_point_transactions_user ON point_transactions(user_id, created_at);
CREATE INDEX idx_point_transactions_type ON point_transactions(transaction_type);

-- RLS Policies
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions" 
  ON point_transactions FOR SELECT USING (auth.uid() = user_id);
```

#### rewards
**Purpose**: Available rewards catalog
```sql
CREATE TABLE public.rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  category VARCHAR NOT NULL, -- 'gift_card', 'subscription', 'merchandise', 'feature_access'
  image_url VARCHAR,
  is_active BOOLEAN DEFAULT true,
  stock_available INTEGER,
  total_redeemed INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  metadata JSONB, -- Reward-specific data (gift card codes, etc.)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_rewards_active ON rewards(is_active, category);
CREATE INDEX idx_rewards_points ON rewards(points_required);

-- RLS Policies
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active rewards are viewable by everyone" 
  ON rewards FOR SELECT USING (is_active = true);
```

#### reward_redemptions
**Purpose**: User reward redemption history
```sql
CREATE TABLE public.reward_redemptions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES rewards(id),
  points_spent INTEGER NOT NULL,
  status VARCHAR DEFAULT 'pending', -- 'pending', 'fulfilled', 'cancelled'
  fulfillment_data JSONB, -- Delivery details, codes, etc.
  redeemed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  fulfilled_at TIMESTAMPTZ,
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_reward_redemptions_user ON reward_redemptions(user_id, redeemed_at);
CREATE INDEX idx_reward_redemptions_status ON reward_redemptions(status);

-- RLS Policies
ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own redemptions" 
  ON reward_redemptions FOR SELECT USING (auth.uid() = user_id);
```

#### achievements
**Purpose**: Achievement definitions and user progress
```sql
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  description TEXT,
  icon_name VARCHAR,
  category VARCHAR NOT NULL, -- 'engagement', 'social', 'milestone', 'special'
  criteria JSONB NOT NULL, -- Achievement requirements
  points_reward INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  rarity VARCHAR DEFAULT 'common', -- 'common', 'rare', 'epic', 'legendary'
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id),
  progress JSONB, -- Current progress towards achievement
  unlocked_at TIMESTAMPTZ,
  is_unlocked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id),
  UNIQUE(user_id, achievement_id)
);

-- RLS Policies
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active achievements are viewable" 
  ON achievements FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view their own achievements" 
  ON user_achievements FOR SELECT USING (auth.uid() = user_id);
```

### 👥 Community & Content Tables

#### groups
**Purpose**: Creator community groups
```sql
CREATE TABLE public.groups (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES profiles(id),
  category VARCHAR, -- 'platform_specific', 'niche', 'geographic', 'skill_level'
  is_public BOOLEAN DEFAULT true,
  member_limit INTEGER,
  member_count INTEGER DEFAULT 0,
  cover_image_url VARCHAR,
  rules TEXT[],
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_groups_public ON groups(is_public, category);
CREATE INDEX idx_groups_creator ON groups(creator_id);

-- RLS Policies
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public groups are viewable" 
  ON groups FOR SELECT USING (is_public = true);

CREATE POLICY "Group creators can manage their groups" 
  ON groups FOR ALL USING (auth.uid() = creator_id);
```

#### group_members
**Purpose**: Group membership tracking
```sql
CREATE TABLE public.group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR DEFAULT 'member', -- 'member', 'moderator', 'admin'
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  
  PRIMARY KEY (id),
  UNIQUE(group_id, user_id)
);

-- RLS Policies
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Group members can view membership" 
  ON group_members FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS(SELECT 1 FROM group_members gm WHERE gm.group_id = group_members.group_id AND gm.user_id = auth.uid())
  );
```

#### content_posts
**Purpose**: User-generated content and posts
```sql
CREATE TABLE public.content_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  title VARCHAR,
  content TEXT,
  content_type VARCHAR DEFAULT 'text', -- 'text', 'image', 'video', 'link'
  media_urls TEXT[],
  tags VARCHAR[],
  is_public BOOLEAN DEFAULT true,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_content_posts_author ON content_posts(author_id, created_at);
CREATE INDEX idx_content_posts_group ON content_posts(group_id, created_at);
CREATE INDEX idx_content_posts_public ON content_posts(is_public, created_at);

-- RLS Policies
ALTER TABLE content_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public posts are viewable" 
  ON content_posts FOR SELECT USING (is_public = true);

CREATE POLICY "Authors can manage their posts" 
  ON content_posts FOR ALL USING (auth.uid() = author_id);
```

### 💬 Communication Tables

#### conversations
**Purpose**: Direct message conversations
```sql
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  type VARCHAR DEFAULT 'direct', -- 'direct', 'group'
  title VARCHAR,
  participants UUID[] NOT NULL,
  last_message_id UUID,
  last_activity TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_archived BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_conversations_participants ON conversations USING gin(participants);
CREATE INDEX idx_conversations_activity ON conversations(last_activity);

-- RLS Policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their conversations" 
  ON conversations FOR SELECT USING (auth.uid() = ANY(participants));
```

#### messages
**Purpose**: Individual messages within conversations
```sql
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR DEFAULT 'text', -- 'text', 'image', 'file', 'system'
  media_urls TEXT[],
  reply_to_id UUID REFERENCES messages(id),
  is_edited BOOLEAN DEFAULT false,
  read_by JSONB DEFAULT '{}', -- {user_id: timestamp}
  metadata JSONB,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  edited_at TIMESTAMPTZ,
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_messages_conversation ON messages(conversation_id, sent_at);
CREATE INDEX idx_messages_sender ON messages(sender_id);

-- RLS Policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their conversations" 
  ON messages FOR SELECT USING (
    EXISTS(
      SELECT 1 FROM conversations c 
      WHERE c.id = messages.conversation_id 
      AND auth.uid() = ANY(c.participants)
    )
  );
```

### 🔔 Notifications Table

#### notifications
**Purpose**: User notifications and alerts
```sql
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL, -- 'achievement', 'follow', 'message', 'engagement', 'system'
  title VARCHAR NOT NULL,
  message TEXT,
  action_url VARCHAR,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  priority VARCHAR DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  metadata JSONB,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at);
CREATE INDEX idx_notifications_type ON notifications(type);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" 
  ON notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
  ON notifications FOR UPDATE USING (auth.uid() = user_id);
```

### 💳 Subscription Management Tables

#### subscriptions
**Purpose**: User subscription status and history
```sql
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR UNIQUE,
  stripe_subscription_id VARCHAR UNIQUE,
  status VARCHAR NOT NULL, -- 'active', 'canceled', 'past_due', 'unpaid'
  tier VARCHAR NOT NULL, -- 'starter', 'pro', 'enterprise'
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id),
  UNIQUE(user_id)
);

-- Indexes
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- RLS Policies
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription" 
  ON subscriptions FOR SELECT USING (auth.uid() = user_id);
```

### 🔄 Database Functions & Triggers

#### Automatic Timestamp Updates
```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to relevant tables
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at 
  BEFORE UPDATE ON user_settings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### Profile Creation Trigger
```sql
-- Automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name'
  );
  
  INSERT INTO public.user_points (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 📊 Analytics Views

#### Creator Statistics View
```sql
CREATE OR REPLACE VIEW creator_stats AS
SELECT 
  p.id,
  p.username,
  p.full_name,
  COUNT(DISTINCT f.follower_id) as follower_count,
  COUNT(DISTINCT f2.following_id) as following_count,
  COUNT(DISTINCT cp.id) as post_count,
  COALESCE(up.total_points, 0) as total_points,
  COALESCE(up.current_level, 1) as current_level
FROM profiles p
LEFT JOIN follows f ON p.id = f.following_id
LEFT JOIN follows f2 ON p.id = f2.follower_id  
LEFT JOIN content_posts cp ON p.id = cp.author_id
LEFT JOIN user_points up ON p.id = up.user_id
GROUP BY p.id, p.username, p.full_name, up.total_points, up.current_level;
```

### 🔧 Database Maintenance

#### Regular Maintenance Tasks
```sql
-- Clean up expired notifications
DELETE FROM notifications 
WHERE expires_at < now() - INTERVAL '30 days';

-- Update user points daily summary
UPDATE user_points 
SET points_earned_today = 0 
WHERE last_reset_date < CURRENT_DATE;

-- Refresh materialized views
REFRESH MATERIALIZED VIEW creator_stats;
```

This comprehensive database schema supports all features of the RoundAbout creator platform with proper relationships, indexes, and security policies.
