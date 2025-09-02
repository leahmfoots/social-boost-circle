
// Custom database types for RoundAbout platform
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          website_url: string | null;
          location: string | null;
          points: number;
          subscription_tier: 'free' | 'pro' | 'enterprise';
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          website_url?: string | null;
          location?: string | null;
          points?: number;
          subscription_tier?: 'free' | 'pro' | 'enterprise';
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          website_url?: string | null;
          location?: string | null;
          points?: number;
          subscription_tier?: 'free' | 'pro' | 'enterprise';
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      social_accounts: {
        Row: {
          id: string;
          user_id: string;
          platform: 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'tiktok' | 'facebook';
          username: string;
          account_id: string;
          access_token: string | null;
          refresh_token: string | null;
          followers_count: number;
          following_count: number;
          is_verified: boolean;
          is_connected: boolean;
          connected_at: string;
          last_sync_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          platform: 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'tiktok' | 'facebook';
          username: string;
          account_id: string;
          access_token?: string | null;
          refresh_token?: string | null;
          followers_count?: number;
          following_count?: number;
          is_verified?: boolean;
          is_connected?: boolean;
          connected_at?: string;
          last_sync_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          platform?: 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'tiktok' | 'facebook';
          username?: string;
          account_id?: string;
          access_token?: string | null;
          refresh_token?: string | null;
          followers_count?: number;
          following_count?: number;
          is_verified?: boolean;
          is_connected?: boolean;
          connected_at?: string;
          last_sync_at?: string | null;
          created_at?: string;
        };
      };
      engagements: {
        Row: {
          id: string;
          user_id: string;
          target_user_id: string | null;
          platform: string;
          engagement_type: 'like' | 'comment' | 'follow' | 'share' | 'subscribe';
          content_url: string;
          content_title: string | null;
          points_value: number;
          status: 'pending' | 'completed' | 'verified' | 'rejected';
          proof_url: string | null;
          proof_screenshot: string | null;
          submitted_at: string | null;
          verified_at: string | null;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          target_user_id?: string | null;
          platform: string;
          engagement_type: 'like' | 'comment' | 'follow' | 'share' | 'subscribe';
          content_url: string;
          content_title?: string | null;
          points_value?: number;
          status?: 'pending' | 'completed' | 'verified' | 'rejected';
          proof_url?: string | null;
          proof_screenshot?: string | null;
          submitted_at?: string | null;
          verified_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          target_user_id?: string | null;
          platform?: string;
          engagement_type?: 'like' | 'comment' | 'follow' | 'share' | 'subscribe';
          content_url?: string;
          content_title?: string | null;
          points_value?: number;
          status?: 'pending' | 'completed' | 'verified' | 'rejected';
          proof_url?: string | null;
          proof_screenshot?: string | null;
          submitted_at?: string | null;
          verified_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string | null;
          group_id: string | null;
          content: string;
          message_type: 'text' | 'image' | 'file' | 'system';
          attachment_url: string | null;
          is_read: boolean;
          sent_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          recipient_id?: string | null;
          group_id?: string | null;
          content: string;
          message_type?: 'text' | 'image' | 'file' | 'system';
          attachment_url?: string | null;
          is_read?: boolean;
          sent_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          recipient_id?: string | null;
          group_id?: string | null;
          content?: string;
          message_type?: 'text' | 'image' | 'file' | 'system';
          attachment_url?: string | null;
          is_read?: boolean;
          sent_at?: string;
        };
      };
      user_analytics: {
        Row: {
          id: string;
          user_id: string;
          event_type: string;
          event_data: Record<string, any> | null;
          platform: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_type: string;
          event_data?: Record<string, any> | null;
          platform?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_type?: string;
          event_data?: Record<string, any> | null;
          platform?: string | null;
          created_at?: string;
        };
      };
      rewards: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          points_required: number;
          reward_type: 'gift_card' | 'cash' | 'product' | 'service' | 'premium_feature';
          reward_value: number | null;
          currency: string;
          image_url: string | null;
          provider: string | null;
          category: string | null;
          stock_quantity: number;
          is_active: boolean;
          terms_conditions: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          points_required: number;
          reward_type?: 'gift_card' | 'cash' | 'product' | 'service' | 'premium_feature';
          reward_value?: number | null;
          currency?: string;
          image_url?: string | null;
          provider?: string | null;
          category?: string | null;
          stock_quantity?: number;
          is_active?: boolean;
          terms_conditions?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          points_required?: number;
          reward_type?: 'gift_card' | 'cash' | 'product' | 'service' | 'premium_feature';
          reward_value?: number | null;
          currency?: string;
          image_url?: string | null;
          provider?: string | null;
          category?: string | null;
          stock_quantity?: number;
          is_active?: boolean;
          terms_conditions?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
