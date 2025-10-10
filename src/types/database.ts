
// Custom database types for RoundAbout platform
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          username: string | null;
          bio: string | null;
          avatar_url: string | null;
          points: number;
          subscription_status: string;
          subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
          username?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          points?: number;
          subscription_status?: string;
          subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          username?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          points?: number;
          subscription_status?: string;
          subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      social_accounts: {
        Row: {
          id: string;
          user_id: string;
          platform: string;
          platform_user_id: string;
          username: string;
          display_name: string | null;
          followers: number;
          following: number;
          verified: boolean;
          access_token: string | null;
          refresh_token: string | null;
          token_expires_at: string | null;
          connected_at: string;
          last_synced_at: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          platform: string;
          platform_user_id: string;
          username: string;
          display_name?: string | null;
          followers?: number;
          following?: number;
          verified?: boolean;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          connected_at?: string;
          last_synced_at?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          platform?: string;
          platform_user_id?: string;
          username?: string;
          display_name?: string | null;
          followers?: number;
          following?: number;
          verified?: boolean;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          connected_at?: string;
          last_synced_at?: string | null;
          is_active?: boolean;
        };
      };
      engagements: {
        Row: {
          id: string;
          user_id: string;
          social_account_id: string | null;
          opportunity_id: string;
          platform: string;
          content_url: string;
          engagement_type: string;
          proof_url: string | null;
          proof_screenshot: string | null;
          points_value: number;
          status: string;
          verification_notes: string | null;
          submitted_at: string;
          verified_at: string | null;
          verified_by: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          social_account_id?: string | null;
          opportunity_id: string;
          platform: string;
          content_url: string;
          engagement_type: string;
          proof_url?: string | null;
          proof_screenshot?: string | null;
          points_value: number;
          status?: string;
          verification_notes?: string | null;
          submitted_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          social_account_id?: string | null;
          opportunity_id?: string;
          platform?: string;
          content_url?: string;
          engagement_type?: string;
          proof_url?: string | null;
          proof_screenshot?: string | null;
          points_value?: number;
          status?: string;
          verification_notes?: string | null;
          submitted_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string | null;
          content: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          recipient_id?: string | null;
          content: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          recipient_id?: string | null;
          content?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
      user_analytics: {
        Row: {
          id: string;
          user_id: string;
          event_type: string;
          event_data: Record<string, any> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_type: string;
          event_data?: Record<string, any> | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_type?: string;
          event_data?: Record<string, any> | null;
          created_at?: string;
        };
      };
      rewards: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          points_required: number;
          reward_type: string;
          reward_value: number | null;
          reward_data: Record<string, any> | null;
          image_url: string | null;
          stock_quantity: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          points_required: number;
          reward_type: string;
          reward_value?: number | null;
          reward_data?: Record<string, any> | null;
          image_url?: string | null;
          stock_quantity?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          points_required?: number;
          reward_type?: string;
          reward_value?: number | null;
          reward_data?: Record<string, any> | null;
          image_url?: string | null;
          stock_quantity?: number | null;
          is_active?: boolean;
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
