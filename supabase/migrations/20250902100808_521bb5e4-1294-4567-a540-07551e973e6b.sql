
-- Create comprehensive database schema for RoundAbout platform

-- Profiles table with enhanced user data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website_url TEXT,
  location TEXT,
  points INTEGER DEFAULT 0,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Social accounts table
CREATE TABLE IF NOT EXISTS social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'twitter', 'youtube', 'linkedin', 'tiktok', 'facebook')),
  username TEXT NOT NULL,
  account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  is_connected BOOLEAN DEFAULT true,
  connected_at TIMESTAMPTZ DEFAULT now(),
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- Engagement opportunities table
CREATE TABLE IF NOT EXISTS engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  target_user_id UUID REFERENCES profiles(id),
  platform TEXT NOT NULL,
  engagement_type TEXT NOT NULL CHECK (engagement_type IN ('like', 'comment', 'follow', 'share', 'subscribe')),
  content_url TEXT NOT NULL,
  content_title TEXT,
  points_value INTEGER NOT NULL DEFAULT 10,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'verified', 'rejected')),
  proof_url TEXT,
  proof_screenshot TEXT,
  submitted_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Rewards catalog table
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  reward_type TEXT DEFAULT 'gift_card' CHECK (reward_type IN ('gift_card', 'cash', 'product', 'service', 'premium_feature')),
  reward_value DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  image_url TEXT,
  provider TEXT,
  category TEXT,
  stock_quantity INTEGER DEFAULT -1, -- -1 means unlimited
  is_active BOOLEAN DEFAULT true,
  terms_conditions TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reward redemptions table
CREATE TABLE IF NOT EXISTS reward_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES rewards(id),
  points_used INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'fulfilled', 'cancelled')),
  redemption_code TEXT,
  fulfillment_details JSONB,
  redeemed_at TIMESTAMPTZ DEFAULT now(),
  fulfilled_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

-- Groups/Communities table
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  category TEXT,
  is_private BOOLEAN DEFAULT false,
  member_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Group memberships table
CREATE TABLE IF NOT EXISTS group_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'moderator', 'member')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Messages table for real-time chat
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  attachment_url TEXT,
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT check_recipient CHECK (
    (recipient_id IS NOT NULL AND group_id IS NULL) OR 
    (recipient_id IS NULL AND group_id IS NOT NULL)
  )
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('engagement_verified', 'reward_available', 'message_received', 'group_invite', 'achievement_unlocked')),
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  badge_color TEXT DEFAULT '#6366f1',
  points_reward INTEGER DEFAULT 0,
  requirements JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id),
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Analytics table for tracking user activity
CREATE TABLE IF NOT EXISTS user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  platform TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions table for premium features
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('pro', 'enterprise')),
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'cancelled', 'past_due')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for social_accounts
CREATE POLICY "Users can manage own social accounts" ON social_accounts FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for engagements
CREATE POLICY "Users can view all engagements" ON engagements FOR SELECT USING (true);
CREATE POLICY "Users can manage own engagements" ON engagements FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for rewards
CREATE POLICY "Everyone can view active rewards" ON rewards FOR SELECT USING (is_active = true);

-- RLS Policies for reward_redemptions
CREATE POLICY "Users can manage own redemptions" ON reward_redemptions FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for groups
CREATE POLICY "Everyone can view public groups" ON groups FOR SELECT USING (is_private = false OR auth.uid() IN (SELECT user_id FROM group_memberships WHERE group_id = groups.id));
CREATE POLICY "Group owners can manage groups" ON groups FOR ALL USING (auth.uid() = created_by);

-- RLS Policies for group_memberships
CREATE POLICY "Users can view group memberships" ON group_memberships FOR SELECT USING (true);
CREATE POLICY "Users can manage own memberships" ON group_memberships FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for messages
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (
  auth.uid() = sender_id OR 
  auth.uid() = recipient_id OR 
  auth.uid() IN (SELECT user_id FROM group_memberships WHERE group_id = messages.group_id)
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Everyone can view active achievements" ON achievements FOR SELECT USING (is_active = true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for user_analytics
CREATE POLICY "Users can view own analytics" ON user_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analytics" ON user_analytics FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_social_accounts_user_platform ON social_accounts(user_id, platform);
CREATE INDEX IF NOT EXISTS idx_engagements_user_status ON engagements(user_id, status);
CREATE INDEX IF NOT EXISTS idx_messages_participants ON messages(sender_id, recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_event ON user_analytics(user_id, event_type);

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rewards_updated_at BEFORE UPDATE ON rewards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for development
INSERT INTO rewards (title, description, points_required, reward_type, reward_value, image_url, category) VALUES
('$5 Amazon Gift Card', 'Redeem your points for an Amazon gift card', 500, 'gift_card', 5.00, '/placeholder.svg', 'shopping'),
('$10 Starbucks Card', 'Enjoy your favorite coffee with this gift card', 1000, 'gift_card', 10.00, '/placeholder.svg', 'food'),
('Premium Account (1 Month)', 'Upgrade to premium features for one month', 2000, 'premium_feature', 9.99, '/placeholder.svg', 'subscription'),
('$25 PayPal Cash', 'Direct cash transfer to your PayPal account', 2500, 'cash', 25.00, '/placeholder.svg', 'cash'),
('$50 Best Buy Gift Card', 'Shop for electronics and gadgets', 5000, 'gift_card', 50.00, '/placeholder.svg', 'electronics')
ON CONFLICT DO NOTHING;

INSERT INTO achievements (name, description, icon, points_reward, requirements) VALUES
('First Steps', 'Complete your first engagement', '🎯', 50, '{"engagements_completed": 1}'),
('Social Butterfly', 'Connect 3 social media accounts', '🦋', 100, '{"social_accounts_connected": 3}'),
('Point Collector', 'Earn your first 1000 points', '💎', 200, '{"total_points_earned": 1000}'),
('Community Member', 'Join your first group', '👥', 75, '{"groups_joined": 1}'),
('Streak Master', 'Complete engagements for 7 days straight', '🔥', 500, '{"daily_streak": 7}')
ON CONFLICT DO NOTHING;

-- Enable realtime for tables that need it
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE engagements;
