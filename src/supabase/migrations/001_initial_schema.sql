
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  username TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  subscription_status TEXT DEFAULT 'free',
  subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create social_accounts table
CREATE TABLE public.social_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  platform_user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  display_name TEXT,
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_synced_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- Create engagements table
CREATE TABLE public.engagements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  social_account_id UUID REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  opportunity_id UUID NOT NULL,
  platform TEXT NOT NULL,
  content_url TEXT NOT NULL,
  engagement_type TEXT NOT NULL, -- like, comment, share, follow
  proof_url TEXT,
  proof_screenshot TEXT,
  points_value INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, verified, rejected
  verification_notes TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id)
);

-- Create engagement_opportunities table
CREATE TABLE public.engagement_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  platform TEXT NOT NULL,
  content_url TEXT NOT NULL,
  engagement_type TEXT NOT NULL,
  points_value INTEGER NOT NULL,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  requirements TEXT[],
  tags TEXT[],
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  reward_type TEXT NOT NULL, -- gift_card, premium_feature, cash, custom
  reward_value DECIMAL(10,2),
  reward_data JSONB,
  image_url TEXT,
  stock_quantity INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create reward_redemptions table
CREATE TABLE public.reward_redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reward_id UUID REFERENCES public.rewards(id) ON DELETE CASCADE NOT NULL,
  points_spent INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  delivery_info JSONB,
  redemption_code TEXT,
  redeemed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  fulfilled_at TIMESTAMPTZ,
  notes TEXT
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  badge_icon TEXT,
  points_reward INTEGER NOT NULL,
  requirements JSONB NOT NULL,
  achievement_type TEXT NOT NULL, -- engagement, social, milestone, special
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  progress JSONB,
  UNIQUE(user_id, achievement_id)
);

-- Create points_history table
CREATE TABLE public.points_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  points_change INTEGER NOT NULL,
  points_balance INTEGER NOT NULL,
  source_type TEXT NOT NULL, -- engagement, achievement, redemption, bonus
  source_id UUID,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- engagement, achievement, reward, system
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create groups table
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  member_count INTEGER DEFAULT 0,
  is_private BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create group_members table
CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member', -- member, moderator, admin
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Create subscriptions table for Stripe integration
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL,
  status TEXT NOT NULL, -- active, canceled, past_due, incomplete
  price_id TEXT NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create payment_history table
CREATE TABLE public.payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Social accounts
CREATE POLICY "Users can manage their own social accounts" ON public.social_accounts
  FOR ALL USING (auth.uid() = user_id);

-- Engagements
CREATE POLICY "Users can manage their own engagements" ON public.engagements
  FOR ALL USING (auth.uid() = user_id);

-- Engagement opportunities (public read, creator write)
CREATE POLICY "Anyone can view active opportunities" ON public.engagement_opportunities
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can manage their own opportunities" ON public.engagement_opportunities
  FOR ALL USING (auth.uid() = creator_id);

-- Rewards (public read)
CREATE POLICY "Anyone can view active rewards" ON public.rewards
  FOR SELECT USING (is_active = true);

-- Reward redemptions
CREATE POLICY "Users can manage their own redemptions" ON public.reward_redemptions
  FOR ALL USING (auth.uid() = user_id);

-- Achievements (public read)
CREATE POLICY "Anyone can view active achievements" ON public.achievements
  FOR SELECT USING (is_active = true);

-- User achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Points history
CREATE POLICY "Users can view their own points history" ON public.points_history
  FOR SELECT USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users can manage their own notifications" ON public.notifications
  FOR ALL USING (auth.uid() = user_id);

-- Groups (public read for non-private)
CREATE POLICY "Anyone can view public groups" ON public.groups
  FOR SELECT USING (is_private = false);

CREATE POLICY "Users can manage their own groups" ON public.groups
  FOR ALL USING (auth.uid() = created_by);

-- Group members
CREATE POLICY "Users can view group memberships" ON public.group_members
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own memberships" ON public.group_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave groups" ON public.group_members
  FOR DELETE USING (auth.uid() = user_id);

-- Subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Payment history
CREATE POLICY "Users can view their own payment history" ON public.payment_history
  FOR SELECT USING (auth.uid() = user_id);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON public.engagement_opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rewards_updated_at BEFORE UPDATE ON public.rewards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON public.groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert initial data
INSERT INTO public.achievements (title, description, badge_icon, points_reward, requirements, achievement_type) VALUES
('First Steps', 'Complete your first engagement', '🎯', 50, '{"engagement_count": 1}', 'engagement'),
('Social Butterfly', 'Connect your first social account', '🔗', 100, '{"connected_accounts": 1}', 'social'),
('Dedicated Creator', 'Complete 10 engagements', '⭐', 200, '{"engagement_count": 10}', 'engagement'),
('Community Member', 'Join your first group', '👥', 75, '{"groups_joined": 1}', 'social'),
('Point Collector', 'Earn 1,000 points', '💎', 150, '{"total_points": 1000}', 'milestone');

INSERT INTO public.rewards (title, description, category, points_required, reward_type, reward_value, image_url, stock_quantity) VALUES
('$5 Amazon Gift Card', 'Redeem your points for an Amazon gift card', 'Gift Cards', 500, 'gift_card', 5.00, '/gift-card-amazon.png', 100),
('$10 Starbucks Gift Card', 'Treat yourself to your favorite coffee', 'Gift Cards', 1000, 'gift_card', 10.00, '/gift-card-starbucks.png', 50),
('Premium Account (1 Month)', 'Upgrade to premium features for one month', 'Subscriptions', 800, 'premium_feature', 29.99, '/premium-badge.png', NULL),
('Custom Profile Badge', 'Stand out with a unique profile badge', 'Customization', 300, 'custom', NULL, '/custom-badge.png', NULL),
('$25 PayPal Cash', 'Direct cash payment to your PayPal account', 'Cash', 2500, 'cash', 25.00, '/paypal-cash.png', 20);
