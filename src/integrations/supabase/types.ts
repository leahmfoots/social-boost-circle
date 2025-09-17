export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          affiliate_id: string
          clicked_at: string | null
          conversion_value: number | null
          converted: boolean | null
          converted_at: string | null
          id: string
          ip_address: string | null
          referrer: string | null
          session_id: string | null
          tool_id: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          affiliate_id: string
          clicked_at?: string | null
          conversion_value?: number | null
          converted?: boolean | null
          converted_at?: string | null
          id?: string
          ip_address?: string | null
          referrer?: string | null
          session_id?: string | null
          tool_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          affiliate_id?: string
          clicked_at?: string | null
          conversion_value?: number | null
          converted?: boolean | null
          converted_at?: string | null
          id?: string
          ip_address?: string | null
          referrer?: string | null
          session_id?: string | null
          tool_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      affiliate_commissions: {
        Row: {
          affiliate_id: string
          click_id: string | null
          commission_amount: number
          commission_rate: number
          created_at: string | null
          id: string
          notes: string | null
          paid_at: string | null
          payout_batch_id: string | null
          status: string | null
          tool_id: string | null
          transaction_type: string | null
          updated_at: string | null
        }
        Insert: {
          affiliate_id: string
          click_id?: string | null
          commission_amount: number
          commission_rate: number
          created_at?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          payout_batch_id?: string | null
          status?: string | null
          tool_id?: string | null
          transaction_type?: string | null
          updated_at?: string | null
        }
        Update: {
          affiliate_id?: string
          click_id?: string | null
          commission_amount?: number
          commission_rate?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          payout_batch_id?: string | null
          status?: string | null
          tool_id?: string | null
          transaction_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      affiliates: {
        Row: {
          affiliate_code: string
          approved_at: string | null
          approved_by: string | null
          commission_rate: number | null
          company_name: string | null
          contact_email: string
          created_at: string | null
          id: string
          notes: string | null
          payout_details: Json | null
          status: string | null
          total_clicks: number | null
          total_conversions: number | null
          total_earnings: number | null
          updated_at: string | null
          user_id: string
          website_url: string | null
        }
        Insert: {
          affiliate_code: string
          approved_at?: string | null
          approved_by?: string | null
          commission_rate?: number | null
          company_name?: string | null
          contact_email: string
          created_at?: string | null
          id?: string
          notes?: string | null
          payout_details?: Json | null
          status?: string | null
          total_clicks?: number | null
          total_conversions?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id: string
          website_url?: string | null
        }
        Update: {
          affiliate_code?: string
          approved_at?: string | null
          approved_by?: string | null
          commission_rate?: number | null
          company_name?: string | null
          contact_email?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          payout_details?: Json | null
          status?: string | null
          total_clicks?: number | null
          total_conversions?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      agent_workflows: {
        Row: {
          agents: Json
          config: Json
          created_at: string | null
          description: string | null
          id: string
          last_run: string | null
          name: string
          run_count: number | null
          status: string
          success_count: number | null
          triggers: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          agents?: Json
          config?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          last_run?: string | null
          name: string
          run_count?: number | null
          status?: string
          success_count?: number | null
          triggers?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          agents?: Json
          config?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          last_run?: string | null
          name?: string
          run_count?: number | null
          status?: string
          success_count?: number | null
          triggers?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_models: {
        Row: {
          capabilities: string[] | null
          context_length: number | null
          cost_per_token: number | null
          created_at: string
          id: string
          is_active: boolean | null
          metadata: Json | null
          model_type: string | null
          name: string
          provider: string
          status: Database["public"]["Enums"]["system_status"] | null
          updated_at: string
          version: string | null
        }
        Insert: {
          capabilities?: string[] | null
          context_length?: number | null
          cost_per_token?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          model_type?: string | null
          name: string
          provider: string
          status?: Database["public"]["Enums"]["system_status"] | null
          updated_at?: string
          version?: string | null
        }
        Update: {
          capabilities?: string[] | null
          context_length?: number | null
          cost_per_token?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          model_type?: string | null
          name?: string
          provider?: string
          status?: Database["public"]["Enums"]["system_status"] | null
          updated_at?: string
          version?: string | null
        }
        Relationships: []
      }
      ai_tools: {
        Row: {
          categories: string[] | null
          created_at: string | null
          description: string | null
          features: string[] | null
          id: number
          logo_url: string | null
          name: string
          pricing_amount: number | null
          pricing_model: string | null
          rating: number | null
          status: string | null
          total_reviews: number | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          categories?: string[] | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: number
          logo_url?: string | null
          name: string
          pricing_amount?: number | null
          pricing_model?: string | null
          rating?: number | null
          status?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          categories?: string[] | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: number
          logo_url?: string | null
          name?: string
          pricing_amount?: number | null
          pricing_model?: string | null
          rating?: number | null
          status?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      aitools_plans: {
        Row: {
          created_at: string | null
          id: number
          monthly_limit: number
          plan_type: string
          price: number
          price_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          monthly_limit: number
          plan_type: string
          price: number
          price_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          monthly_limit?: number
          plan_type?: string
          price?: number
          price_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      aitools_subscriptions: {
        Row: {
          created_at: string | null
          id: number
          price_id: string
          status: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          price_id: string
          status: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          price_id?: string
          status?: string
          stripe_customer_id?: string
          stripe_subscription_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aitools_subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "aitools_plans"
            referencedColumns: ["price_id"]
          },
        ]
      }
      alerts: {
        Row: {
          channels: Json | null
          condition: string
          created_at: string | null
          id: string
          is_triggered: boolean | null
          symbol: string
          target: number
          triggered_at: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          channels?: Json | null
          condition: string
          created_at?: string | null
          id?: string
          is_triggered?: boolean | null
          symbol: string
          target: number
          triggered_at?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          channels?: Json | null
          condition?: string
          created_at?: string | null
          id?: string
          is_triggered?: boolean | null
          symbol?: string
          target?: number
          triggered_at?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      automation_recipes: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: string | null
          id: number
          title: string
          tools_used: string[] | null
          upvotes: number | null
          workflow_steps: Json | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: number
          title: string
          tools_used?: string[] | null
          upvotes?: number | null
          workflow_steps?: Json | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: number
          title?: string
          tools_used?: string[] | null
          upvotes?: number | null
          workflow_steps?: Json | null
        }
        Relationships: []
      }
      bot_performance: {
        Row: {
          bot_id: string | null
          created_at: string | null
          date: string
          id: string
          profit_loss: number
          trades_count: number | null
        }
        Insert: {
          bot_id?: string | null
          created_at?: string | null
          date: string
          id?: string
          profit_loss: number
          trades_count?: number | null
        }
        Update: {
          bot_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          profit_loss?: number
          trades_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_performance_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "trading_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      browsing_history: {
        Row: {
          id: number
          time_spent: number | null
          tool_id: number | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: number
          time_spent?: number | null
          tool_id?: number | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: number
          time_spent?: number | null
          tool_id?: number | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "browsing_history_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          alert_threshold: number | null
          alerts_enabled: boolean | null
          amount: number
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          period: string
          start_date: string
          updated_at: string
        }
        Insert: {
          alert_threshold?: number | null
          alerts_enabled?: boolean | null
          amount: number
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          period?: string
          start_date?: string
          updated_at?: string
        }
        Update: {
          alert_threshold?: number | null
          alerts_enabled?: boolean | null
          amount?: number
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          period?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories_enhanced: {
        Row: {
          color_hex: string | null
          created_at: string | null
          description: string | null
          icon_url: string | null
          id: string
          is_featured: boolean | null
          name: string
          parent_category_id: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          sort_order: number | null
          status: string | null
          tools_count: number | null
          updated_at: string | null
        }
        Insert: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_featured?: boolean | null
          name: string
          parent_category_id?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          sort_order?: number | null
          status?: string | null
          tools_count?: number | null
          updated_at?: string | null
        }
        Update: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_featured?: boolean | null
          name?: string
          parent_category_id?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          sort_order?: number | null
          status?: string | null
          tools_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      collections: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_picks: {
        Row: {
          created_at: string
          id: string
          picked_at: string
          total_comments: number | null
          user_id: string | null
          video_id: string
          video_title: string | null
          video_url: string
          winner_author: string
          winner_comment_id: string
          winner_likes: number | null
          winner_text: string
        }
        Insert: {
          created_at?: string
          id?: string
          picked_at?: string
          total_comments?: number | null
          user_id?: string | null
          video_id: string
          video_title?: string | null
          video_url: string
          winner_author: string
          winner_comment_id: string
          winner_likes?: number | null
          winner_text: string
        }
        Update: {
          created_at?: string
          id?: string
          picked_at?: string
          total_comments?: number | null
          user_id?: string | null
          video_id?: string
          video_title?: string | null
          video_url?: string
          winner_author?: string
          winner_comment_id?: string
          winner_likes?: number | null
          winner_text?: string
        }
        Relationships: []
      }
      comment_sessions: {
        Row: {
          comments_data: Json
          created_at: string
          id: string
          session_name: string | null
          total_comments: number
          updated_at: string
          user_id: string | null
          video_id: string
          video_title: string | null
          video_url: string
        }
        Insert: {
          comments_data: Json
          created_at?: string
          id?: string
          session_name?: string | null
          total_comments: number
          updated_at?: string
          user_id?: string | null
          video_id: string
          video_title?: string | null
          video_url: string
        }
        Update: {
          comments_data?: Json
          created_at?: string
          id?: string
          session_name?: string | null
          total_comments?: number
          updated_at?: string
          user_id?: string | null
          video_id?: string
          video_title?: string | null
          video_url?: string
        }
        Relationships: []
      }
      context7_libraries: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          language: string | null
          last_updated: string | null
          metadata: Json | null
          name: string
          popularity_score: number | null
          version: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language?: string | null
          last_updated?: string | null
          metadata?: Json | null
          name: string
          popularity_score?: number | null
          version?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language?: string | null
          last_updated?: string | null
          metadata?: Json | null
          name?: string
          popularity_score?: number | null
          version?: string | null
        }
        Relationships: []
      }
      conversion_jobs: {
        Row: {
          created_at: string | null
          error_message: string | null
          file_url: string | null
          id: string
          model_name: string
          optimizations: string[] | null
          progress: number | null
          result_url: string | null
          source_format: string
          status: string
          target_format: string
          target_platform: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          file_url?: string | null
          id?: string
          model_name: string
          optimizations?: string[] | null
          progress?: number | null
          result_url?: string | null
          source_format: string
          status?: string
          target_format: string
          target_platform: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          file_url?: string | null
          id?: string
          model_name?: string
          optimizations?: string[] | null
          progress?: number | null
          result_url?: string | null
          source_format?: string
          status?: string
          target_format?: string
          target_platform?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cost_entries: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          date: string
          id: string
          metadata: Json | null
          provider: string
          service_type: string
          usage_amount: number | null
          usage_units: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          date?: string
          id?: string
          metadata?: Json | null
          provider: string
          service_type: string
          usage_amount?: number | null
          usage_units?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          date?: string
          id?: string
          metadata?: Json | null
          provider?: string
          service_type?: string
          usage_amount?: number | null
          usage_units?: string | null
        }
        Relationships: []
      }
      discussion_replies: {
        Row: {
          content: string
          created_at: string | null
          discussion_id: string | null
          downvotes: number | null
          id: string
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          discussion_id?: string | null
          downvotes?: number | null
          id?: string
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          discussion_id?: string | null
          downvotes?: number | null
          id?: string
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          downvotes: number | null
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          moderated_at: string | null
          moderated_by: string | null
          parent_id: string | null
          reply_count: number | null
          status: string | null
          tags: string[] | null
          title: string | null
          tool_id: string | null
          type: string | null
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          downvotes?: number | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          moderated_at?: string | null
          moderated_by?: string | null
          parent_id?: string | null
          reply_count?: number | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          tool_id?: string | null
          type?: string | null
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          downvotes?: number | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          moderated_at?: string | null
          moderated_by?: string | null
          parent_id?: string | null
          reply_count?: number | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          tool_id?: string | null
          type?: string | null
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          nft_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          nft_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          nft_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          compatibility_score: number | null
          created_at: string | null
          description: string | null
          documentation_url: string | null
          id: string
          integration_type: string
          metadata: Json | null
          name: string
          setup_difficulty: string | null
          setup_time_estimate: string | null
          source_tool_id: string | null
          status: string | null
          tags: string[] | null
          target_tool_id: string | null
          tutorial_content: string | null
          updated_at: string | null
          usage_count: number | null
          user_rating: number | null
        }
        Insert: {
          compatibility_score?: number | null
          created_at?: string | null
          description?: string | null
          documentation_url?: string | null
          id?: string
          integration_type: string
          metadata?: Json | null
          name: string
          setup_difficulty?: string | null
          setup_time_estimate?: string | null
          source_tool_id?: string | null
          status?: string | null
          tags?: string[] | null
          target_tool_id?: string | null
          tutorial_content?: string | null
          updated_at?: string | null
          usage_count?: number | null
          user_rating?: number | null
        }
        Update: {
          compatibility_score?: number | null
          created_at?: string | null
          description?: string | null
          documentation_url?: string | null
          id?: string
          integration_type?: string
          metadata?: Json | null
          name?: string
          setup_difficulty?: string | null
          setup_time_estimate?: string | null
          source_tool_id?: string | null
          status?: string | null
          tags?: string[] | null
          target_tool_id?: string | null
          tutorial_content?: string | null
          updated_at?: string | null
          usage_count?: number | null
          user_rating?: number | null
        }
        Relationships: []
      }
      memories: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      model_requests: {
        Row: {
          cost: number | null
          created_at: string | null
          error_message: string | null
          id: string
          latency_ms: number | null
          metadata: Json | null
          model_id: string
          prompt: string
          provider: string
          response: string | null
          status: string
          tokens_used: number | null
          user_id: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          latency_ms?: number | null
          metadata?: Json | null
          model_id: string
          prompt: string
          provider: string
          response?: string | null
          status?: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          latency_ms?: number | null
          metadata?: Json | null
          model_id?: string
          prompt?: string
          provider?: string
          response?: string | null
          status?: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_campaigns: {
        Row: {
          bounced_count: number | null
          clicked_count: number | null
          content: string
          created_at: string | null
          created_by: string | null
          delivered_count: number | null
          id: string
          newsletter_subscription_id: string
          opened_count: number | null
          scheduled_at: string | null
          segment: string
          send_status: string | null
          sent_at: string | null
          sent_count: number | null
          subject: string
          unsubscribed_count: number | null
        }
        Insert: {
          bounced_count?: number | null
          clicked_count?: number | null
          content: string
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          id?: string
          newsletter_subscription_id: string
          opened_count?: number | null
          scheduled_at?: string | null
          segment: string
          send_status?: string | null
          sent_at?: string | null
          sent_count?: number | null
          subject: string
          unsubscribed_count?: number | null
        }
        Update: {
          bounced_count?: number | null
          clicked_count?: number | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          id?: string
          newsletter_subscription_id?: string
          opened_count?: number | null
          scheduled_at?: string | null
          segment?: string
          send_status?: string | null
          sent_at?: string | null
          sent_count?: number | null
          subject?: string
          unsubscribed_count?: number | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          click_rate: number | null
          email: string
          frequency: string | null
          id: string
          is_active: boolean | null
          last_sent_at: string | null
          open_rate: number | null
          preferences: Json | null
          segments: string[] | null
          subscribed_at: string | null
          unsubscribe_token: string | null
          unsubscribed_at: string | null
          user_id: string | null
        }
        Insert: {
          click_rate?: number | null
          email: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_sent_at?: string | null
          open_rate?: number | null
          preferences?: Json | null
          segments?: string[] | null
          subscribed_at?: string | null
          unsubscribe_token?: string | null
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Update: {
          click_rate?: number | null
          email?: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_sent_at?: string | null
          open_rate?: number | null
          preferences?: Json | null
          segments?: string[] | null
          subscribed_at?: string | null
          unsubscribe_token?: string | null
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      nft_collections: {
        Row: {
          collection_id: string | null
          id: string
          nft_id: string | null
        }
        Insert: {
          collection_id?: string | null
          id?: string
          nft_id?: string | null
        }
        Update: {
          collection_id?: string | null
          id?: string
          nft_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nft_collections_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nft_collections_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
        ]
      }
      nfts: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          id: string
          image_url: string
          is_for_sale: boolean | null
          owner_id: string
          price: number | null
          royalty_percentage: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          image_url: string
          is_for_sale?: boolean | null
          owner_id: string
          price?: number | null
          royalty_percentage?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          image_url?: string
          is_for_sale?: boolean | null
          owner_id?: string
          price?: number | null
          royalty_percentage?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nfts_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email_alerts: boolean | null
          id: number
          new_tools_alerts: boolean | null
          price_drop_alerts: boolean | null
          push_alerts: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email_alerts?: boolean | null
          id?: number
          new_tools_alerts?: boolean | null
          price_drop_alerts?: boolean | null
          push_alerts?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email_alerts?: boolean | null
          id?: number
          new_tools_alerts?: boolean | null
          price_drop_alerts?: boolean | null
          push_alerts?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          comparison_id: string | null
          created_at: string | null
          data: Json | null
          expires_at: string | null
          id: string
          is_email_sent: boolean | null
          is_push_sent: boolean | null
          is_read: boolean | null
          message: string | null
          priority: string | null
          read_at: string | null
          review_id: string | null
          title: string
          tool_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          comparison_id?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_email_sent?: boolean | null
          is_push_sent?: boolean | null
          is_read?: boolean | null
          message?: string | null
          priority?: string | null
          read_at?: string | null
          review_id?: string | null
          title: string
          tool_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          comparison_id?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_email_sent?: boolean | null
          is_push_sent?: boolean | null
          is_read?: boolean | null
          message?: string | null
          priority?: string | null
          read_at?: string | null
          review_id?: string | null
          title?: string
          tool_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      portfolio_assets: {
        Row: {
          created_at: string | null
          exchange: string | null
          id: string
          name: string
          portfolio_id: string | null
          purchase_date: string | null
          purchase_price: number
          quantity: number
          symbol: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          exchange?: string | null
          id?: string
          name: string
          portfolio_id?: string | null
          purchase_date?: string | null
          purchase_price: number
          quantity: number
          symbol: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          exchange?: string | null
          id?: string
          name?: string
          portfolio_id?: string | null
          purchase_date?: string | null
          purchase_price?: number
          quantity?: number
          symbol?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_assets_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      promo_code_usage: {
        Row: {
          discount_applied: number
          final_amount: number | null
          id: string
          ip_address: string | null
          original_amount: number | null
          promo_code_id: string
          tool_id: string | null
          used_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          discount_applied: number
          final_amount?: number | null
          id?: string
          ip_address?: string | null
          original_amount?: number | null
          promo_code_id: string
          tool_id?: string | null
          used_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          discount_applied?: number
          final_amount?: number | null
          id?: string
          ip_address?: string | null
          original_amount?: number | null
          promo_code_id?: string
          tool_id?: string | null
          used_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          applicable_to: string | null
          code: string
          created_at: string | null
          created_by: string | null
          currency: string | null
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          minimum_amount: number | null
          tool_ids: string[] | null
          updated_at: string | null
          usage_count: number | null
          usage_limit: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          applicable_to?: string | null
          code: string
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          id?: string
          is_active?: boolean | null
          minimum_amount?: number | null
          tool_ids?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          applicable_to?: string | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          minimum_amount?: number | null
          tool_ids?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      repositories: {
        Row: {
          auto_update: boolean | null
          clone_url: string | null
          created_at: string
          default_branch: string | null
          description: string | null
          full_name: string
          github_url: string | null
          id: string
          is_trending: boolean | null
          language: string | null
          last_sync: string | null
          name: string
          size_mb: number | null
          stars: number | null
          status: Database["public"]["Enums"]["repository_status"] | null
          updated_at: string
        }
        Insert: {
          auto_update?: boolean | null
          clone_url?: string | null
          created_at?: string
          default_branch?: string | null
          description?: string | null
          full_name: string
          github_url?: string | null
          id?: string
          is_trending?: boolean | null
          language?: string | null
          last_sync?: string | null
          name: string
          size_mb?: number | null
          stars?: number | null
          status?: Database["public"]["Enums"]["repository_status"] | null
          updated_at?: string
        }
        Update: {
          auto_update?: boolean | null
          clone_url?: string | null
          created_at?: string
          default_branch?: string | null
          description?: string | null
          full_name?: string
          github_url?: string | null
          id?: string
          is_trending?: boolean | null
          language?: string | null
          last_sync?: string | null
          name?: string
          size_mb?: number | null
          stars?: number | null
          status?: Database["public"]["Enums"]["repository_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      research_content: {
        Row: {
          created_at: string
          description: string | null
          engagement_score: number | null
          id: string
          is_trending: boolean | null
          metadata: Json | null
          source: Database["public"]["Enums"]["research_source"]
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          engagement_score?: number | null
          id?: string
          is_trending?: boolean | null
          metadata?: Json | null
          source: Database["public"]["Enums"]["research_source"]
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          engagement_score?: number | null
          id?: string
          is_trending?: boolean | null
          metadata?: Json | null
          source?: Database["public"]["Enums"]["research_source"]
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      review_votes: {
        Row: {
          created_at: string | null
          id: string
          review_id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          review_id: string
          user_id: string
          vote_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          review_id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          cons: string[] | null
          content: string | null
          created_at: string | null
          helpful_count: number | null
          id: string
          is_verified: boolean | null
          moderated_at: string | null
          moderated_by: string | null
          moderation_notes: string | null
          pros: string[] | null
          rating: number
          status: string | null
          title: string | null
          tool_id: string
          unhelpful_count: number | null
          updated_at: string | null
          usage_duration: string | null
          use_case: string | null
          user_id: string
          verified_at: string | null
        }
        Insert: {
          cons?: string[] | null
          content?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_notes?: string | null
          pros?: string[] | null
          rating: number
          status?: string | null
          title?: string | null
          tool_id: string
          unhelpful_count?: number | null
          updated_at?: string | null
          usage_duration?: string | null
          use_case?: string | null
          user_id: string
          verified_at?: string | null
        }
        Update: {
          cons?: string[] | null
          content?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_notes?: string | null
          pros?: string[] | null
          rating?: number
          status?: string | null
          title?: string | null
          tool_id?: string
          unhelpful_count?: number | null
          updated_at?: string | null
          usage_duration?: string | null
          use_case?: string | null
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      saved_comments: {
        Row: {
          author: string
          comment_id: string
          created_at: string
          id: string
          likes: number | null
          saved_at: string
          text: string
          user_id: string | null
          video_id: string
          video_title: string | null
        }
        Insert: {
          author: string
          comment_id: string
          created_at?: string
          id?: string
          likes?: number | null
          saved_at?: string
          text: string
          user_id?: string | null
          video_id: string
          video_title?: string | null
        }
        Update: {
          author?: string
          comment_id?: string
          created_at?: string
          id?: string
          likes?: number | null
          saved_at?: string
          text?: string
          user_id?: string | null
          video_id?: string
          video_title?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          id: string
          last_check: string | null
          metadata: Json | null
          name: string
          status: Database["public"]["Enums"]["system_status"] | null
          updated_at: string
          uptime_percentage: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_check?: string | null
          metadata?: Json | null
          name: string
          status?: Database["public"]["Enums"]["system_status"] | null
          updated_at?: string
          uptime_percentage?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          last_check?: string | null
          metadata?: Json | null
          name?: string
          status?: Database["public"]["Enums"]["system_status"] | null
          updated_at?: string
          uptime_percentage?: number | null
        }
        Relationships: []
      }
      social_intelligence: {
        Row: {
          content: string | null
          content_id: string
          content_type: string
          created_at: string | null
          engagement_metrics: Json | null
          extracted_at: string | null
          id: string
          metadata: Json | null
          platform: string
          sentiment_score: number | null
          title: string | null
          trending_score: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          content_id: string
          content_type: string
          created_at?: string | null
          engagement_metrics?: Json | null
          extracted_at?: string | null
          id?: string
          metadata?: Json | null
          platform: string
          sentiment_score?: number | null
          title?: string | null
          trending_score?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          engagement_metrics?: Json | null
          extracted_at?: string | null
          id?: string
          metadata?: Json | null
          platform?: string
          sentiment_score?: number | null
          title?: string | null
          trending_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      stories: {
        Row: {
          content: string
          created_at: string
          emotional_tone: string | null
          id: string
          memory_id: string
          themes: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          emotional_tone?: string | null
          id?: string
          memory_id: string
          themes?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          emotional_tone?: string | null
          id?: string
          memory_id?: string
          themes?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stories_memory_id_fkey"
            columns: ["memory_id"]
            isOneToOne: false
            referencedRelation: "memories"
            referencedColumns: ["id"]
          },
        ]
      }
      system_logs: {
        Row: {
          component: string | null
          created_at: string
          details: Json | null
          id: string
          level: Database["public"]["Enums"]["log_level"]
          message: string
        }
        Insert: {
          component?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          level: Database["public"]["Enums"]["log_level"]
          message: string
        }
        Update: {
          component?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          level?: Database["public"]["Enums"]["log_level"]
          message?: string
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          id: string
          metadata: Json | null
          metric_name: string
          metric_value: number
          recorded_at: string
          status: Database["public"]["Enums"]["system_status"] | null
          unit: string | null
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_value: number
          recorded_at?: string
          status?: Database["public"]["Enums"]["system_status"] | null
          unit?: string | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_value?: number
          recorded_at?: string
          status?: Database["public"]["Enums"]["system_status"] | null
          unit?: string | null
        }
        Relationships: []
      }
      system_monitoring: {
        Row: {
          cpu_usage: number | null
          error_rate: number | null
          id: string
          memory_usage: number | null
          metadata: Json | null
          response_time_ms: number | null
          service_name: string
          status: string
          throughput: number | null
          timestamp: string | null
        }
        Insert: {
          cpu_usage?: number | null
          error_rate?: number | null
          id?: string
          memory_usage?: number | null
          metadata?: Json | null
          response_time_ms?: number | null
          service_name: string
          status: string
          throughput?: number | null
          timestamp?: string | null
        }
        Update: {
          cpu_usage?: number | null
          error_rate?: number | null
          id?: string
          memory_usage?: number | null
          metadata?: Json | null
          response_time_ms?: number | null
          service_name?: string
          status?: string
          throughput?: number | null
          timestamp?: string | null
        }
        Relationships: []
      }
      system_updates: {
        Row: {
          available_version: string | null
          changelog: string | null
          completed_at: string | null
          component: string
          created_at: string
          current_version: string | null
          id: string
          scheduled_at: string | null
          update_status: string | null
          update_url: string | null
        }
        Insert: {
          available_version?: string | null
          changelog?: string | null
          completed_at?: string | null
          component: string
          created_at?: string
          current_version?: string | null
          id?: string
          scheduled_at?: string | null
          update_status?: string | null
          update_url?: string | null
        }
        Update: {
          available_version?: string | null
          changelog?: string | null
          completed_at?: string | null
          component?: string
          created_at?: string
          current_version?: string | null
          id?: string
          scheduled_at?: string | null
          update_status?: string | null
          update_url?: string | null
        }
        Relationships: []
      }
      tool_comparisons: {
        Row: {
          bookmark_count: number | null
          comparison_data: Json
          created_at: string | null
          created_by: string
          description: string | null
          features_compared: string[] | null
          id: string
          is_public: boolean | null
          status: string | null
          title: string
          tool_ids: string[]
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          bookmark_count?: number | null
          comparison_data: Json
          created_at?: string | null
          created_by: string
          description?: string | null
          features_compared?: string[] | null
          id?: string
          is_public?: boolean | null
          status?: string | null
          title: string
          tool_ids: string[]
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          bookmark_count?: number | null
          comparison_data?: Json
          created_at?: string | null
          created_by?: string
          description?: string | null
          features_compared?: string[] | null
          id?: string
          is_public?: boolean | null
          status?: string | null
          title?: string
          tool_ids?: string[]
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      tool_health_checks: {
        Row: {
          checked_at: string | null
          error_message: string | null
          id: number
          response_time: number | null
          status: string
          tool_id: number | null
        }
        Insert: {
          checked_at?: string | null
          error_message?: string | null
          id?: number
          response_time?: number | null
          status: string
          tool_id?: number | null
        }
        Update: {
          checked_at?: string | null
          error_message?: string | null
          id?: number
          response_time?: number | null
          status?: string
          tool_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_health_checks_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_integrations: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          integration_partner: number | null
          integration_type: string | null
          is_verified: boolean | null
          setup_guide: string | null
          tool_id: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          integration_partner?: number | null
          integration_type?: string | null
          is_verified?: boolean | null
          setup_guide?: string | null
          tool_id?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          integration_partner?: number | null
          integration_type?: string | null
          is_verified?: boolean | null
          setup_guide?: string | null
          tool_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_integrations_integration_partner_fkey"
            columns: ["integration_partner"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_integrations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_monitoring: {
        Row: {
          created_at: string | null
          downtime_incidents: number | null
          error_message: string | null
          health_score: number | null
          id: string
          last_checked: string | null
          last_offline: string | null
          last_online: string | null
          monitoring_enabled: boolean | null
          response_time: number | null
          status: string | null
          successful_checks: number | null
          tool_id: string
          total_checks: number | null
          updated_at: string | null
          uptime_percentage: number | null
        }
        Insert: {
          created_at?: string | null
          downtime_incidents?: number | null
          error_message?: string | null
          health_score?: number | null
          id?: string
          last_checked?: string | null
          last_offline?: string | null
          last_online?: string | null
          monitoring_enabled?: boolean | null
          response_time?: number | null
          status?: string | null
          successful_checks?: number | null
          tool_id: string
          total_checks?: number | null
          updated_at?: string | null
          uptime_percentage?: number | null
        }
        Update: {
          created_at?: string | null
          downtime_incidents?: number | null
          error_message?: string | null
          health_score?: number | null
          id?: string
          last_checked?: string | null
          last_offline?: string | null
          last_online?: string | null
          monitoring_enabled?: boolean | null
          response_time?: number | null
          status?: string | null
          successful_checks?: number | null
          tool_id?: string
          total_checks?: number | null
          updated_at?: string | null
          uptime_percentage?: number | null
        }
        Relationships: []
      }
      tools: {
        Row: {
          approval_date: string | null
          approved_by: string | null
          category: string | null
          created_at: string | null
          description: string | null
          featured_until: string | null
          features: string[] | null
          id: number
          is_featured: boolean | null
          last_health_check: string | null
          logo_url: string | null
          name: string
          openrouter_model_id: string | null
          pricing_details: Json | null
          pricing_type: string | null
          screenshot_urls: string[] | null
          short_description: string | null
          status: string | null
          subcategory: string | null
          submission_date: string | null
          submitted_by: string | null
          tags: string[] | null
          updated_at: string | null
          uptime_score: number | null
          video_url: string | null
          website_url: string
        }
        Insert: {
          approval_date?: string | null
          approved_by?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          featured_until?: string | null
          features?: string[] | null
          id?: number
          is_featured?: boolean | null
          last_health_check?: string | null
          logo_url?: string | null
          name: string
          openrouter_model_id?: string | null
          pricing_details?: Json | null
          pricing_type?: string | null
          screenshot_urls?: string[] | null
          short_description?: string | null
          status?: string | null
          subcategory?: string | null
          submission_date?: string | null
          submitted_by?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uptime_score?: number | null
          video_url?: string | null
          website_url: string
        }
        Update: {
          approval_date?: string | null
          approved_by?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          featured_until?: string | null
          features?: string[] | null
          id?: number
          is_featured?: boolean | null
          last_health_check?: string | null
          logo_url?: string | null
          name?: string
          openrouter_model_id?: string | null
          pricing_details?: Json | null
          pricing_type?: string | null
          screenshot_urls?: string[] | null
          short_description?: string | null
          status?: string | null
          subcategory?: string | null
          submission_date?: string | null
          submitted_by?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uptime_score?: number | null
          video_url?: string | null
          website_url?: string
        }
        Relationships: []
      }
      tools_enhanced: {
        Row: {
          affiliate_program: boolean | null
          alternatives: string[] | null
          api_documentation: string | null
          bookmark_count: number | null
          category_id: string | null
          click_count: number | null
          commission_rate: number | null
          compatibility_tags: string[] | null
          created_at: string | null
          created_by: string | null
          demo_url: string | null
          description: string | null
          featured_until: string | null
          features: string[] | null
          free_tier_available: boolean | null
          id: string
          integration_options: string[] | null
          last_updated: string | null
          logo_url: string | null
          name: string
          openrouter_model_id: string | null
          price_range: string | null
          pricing_model: string | null
          rating: number | null
          review_count: number | null
          screenshots: string[] | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          status: string | null
          subcategory: string | null
          target_audience: string[] | null
          trial_available: boolean | null
          updated_at: string | null
          use_cases: string[] | null
          verified: boolean | null
          verified_at: string | null
          website_url: string
        }
        Insert: {
          affiliate_program?: boolean | null
          alternatives?: string[] | null
          api_documentation?: string | null
          bookmark_count?: number | null
          category_id?: string | null
          click_count?: number | null
          commission_rate?: number | null
          compatibility_tags?: string[] | null
          created_at?: string | null
          created_by?: string | null
          demo_url?: string | null
          description?: string | null
          featured_until?: string | null
          features?: string[] | null
          free_tier_available?: boolean | null
          id?: string
          integration_options?: string[] | null
          last_updated?: string | null
          logo_url?: string | null
          name: string
          openrouter_model_id?: string | null
          price_range?: string | null
          pricing_model?: string | null
          rating?: number | null
          review_count?: number | null
          screenshots?: string[] | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          status?: string | null
          subcategory?: string | null
          target_audience?: string[] | null
          trial_available?: boolean | null
          updated_at?: string | null
          use_cases?: string[] | null
          verified?: boolean | null
          verified_at?: string | null
          website_url: string
        }
        Update: {
          affiliate_program?: boolean | null
          alternatives?: string[] | null
          api_documentation?: string | null
          bookmark_count?: number | null
          category_id?: string | null
          click_count?: number | null
          commission_rate?: number | null
          compatibility_tags?: string[] | null
          created_at?: string | null
          created_by?: string | null
          demo_url?: string | null
          description?: string | null
          featured_until?: string | null
          features?: string[] | null
          free_tier_available?: boolean | null
          id?: string
          integration_options?: string[] | null
          last_updated?: string | null
          logo_url?: string | null
          name?: string
          openrouter_model_id?: string | null
          price_range?: string | null
          pricing_model?: string | null
          rating?: number | null
          review_count?: number | null
          screenshots?: string[] | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          status?: string | null
          subcategory?: string | null
          target_audience?: string[] | null
          trial_available?: boolean | null
          updated_at?: string | null
          use_cases?: string[] | null
          verified?: boolean | null
          verified_at?: string | null
          website_url?: string
        }
        Relationships: []
      }
      trading_bots: {
        Row: {
          allocation_percentage: number | null
          config: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          pair: string
          strategy: string
          timeframe: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          allocation_percentage?: number | null
          config?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          pair: string
          strategy: string
          timeframe: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          allocation_percentage?: number | null
          config?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          pair?: string
          strategy?: string
          timeframe?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          exchange: string | null
          executed_at: string | null
          fee: number | null
          id: string
          price: number
          quantity: number
          status: string | null
          symbol: string
          type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          exchange?: string | null
          executed_at?: string | null
          fee?: number | null
          id?: string
          price: number
          quantity: number
          status?: string | null
          symbol: string
          type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          exchange?: string | null
          executed_at?: string | null
          fee?: number | null
          id?: string
          price?: number
          quantity?: number
          status?: string | null
          symbol?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tutorials: {
        Row: {
          content: string
          created_at: string | null
          difficulty_level: string | null
          estimated_time: number | null
          id: number
          is_featured: boolean | null
          title: string
          tool_id: number | null
          updated_at: string | null
          upvotes: number | null
          user_id: string | null
          video_url: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          difficulty_level?: string | null
          estimated_time?: number | null
          id?: number
          is_featured?: boolean | null
          title: string
          tool_id?: number | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
          video_url?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          difficulty_level?: string | null
          estimated_time?: number | null
          id?: number
          is_featured?: boolean | null
          title?: string
          tool_id?: number | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutorials_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      uptime_logs: {
        Row: {
          checks_passed: number | null
          checks_total: number | null
          created_at: string | null
          date: string
          downtime_minutes: number | null
          id: number
          tool_id: number | null
          uptime_percentage: number
        }
        Insert: {
          checks_passed?: number | null
          checks_total?: number | null
          created_at?: string | null
          date: string
          downtime_minutes?: number | null
          id?: number
          tool_id?: number | null
          uptime_percentage: number
        }
        Update: {
          checks_passed?: number | null
          checks_total?: number | null
          created_at?: string | null
          date?: string
          downtime_minutes?: number | null
          id?: number
          tool_id?: number | null
          uptime_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "uptime_logs_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity: {
        Row: {
          action_type: string
          category: string | null
          comparison_id: string | null
          created_at: string | null
          filters_applied: Json | null
          id: string
          ip_address: string | null
          metadata: Json | null
          page_path: string | null
          referrer: string | null
          search_query: string | null
          session_id: string | null
          time_spent: number | null
          tool_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          category?: string | null
          comparison_id?: string | null
          created_at?: string | null
          filters_applied?: Json | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          page_path?: string | null
          referrer?: string | null
          search_query?: string | null
          session_id?: string | null
          time_spent?: number | null
          tool_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          category?: string | null
          comparison_id?: string | null
          created_at?: string | null
          filters_applied?: Json | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          page_path?: string | null
          referrer?: string | null
          search_query?: string | null
          session_id?: string | null
          time_spent?: number | null
          tool_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_bookmarks: {
        Row: {
          collection_name: string | null
          comparison_id: string | null
          created_at: string | null
          id: string
          is_favorite: boolean | null
          notes: string | null
          tags: string[] | null
          tool_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          collection_name?: string | null
          comparison_id?: string | null
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          notes?: string | null
          tags?: string[] | null
          tool_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          collection_name?: string | null
          comparison_id?: string | null
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          notes?: string | null
          tags?: string[] | null
          tool_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_reputation: {
        Row: {
          badges: string[] | null
          created_at: string | null
          id: number
          level: string | null
          score: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          badges?: string[] | null
          created_at?: string | null
          id?: number
          level?: string | null
          score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          badges?: string[] | null
          created_at?: string | null
          id?: number
          level?: string | null
          score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          chart_style: string | null
          created_at: string | null
          dashboard_layout: string | null
          notification_preferences: Json | null
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chart_style?: string | null
          created_at?: string | null
          dashboard_layout?: string | null
          notification_preferences?: Json | null
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chart_style?: string | null
          created_at?: string | null
          dashboard_layout?: string | null
          notification_preferences?: Json | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users_enhanced: {
        Row: {
          aud: string | null
          avatar_url: string | null
          bio: string | null
          company: string | null
          confirmation_sent_at: string | null
          confirmation_token: string | null
          created_at: string | null
          email: string
          email_change: string | null
          email_change_sent_at: string | null
          email_change_token_new: string | null
          email_confirmed_at: string | null
          encrypted_password: string | null
          full_name: string | null
          id: string
          invited_at: string | null
          is_super_admin: boolean | null
          is_verified: boolean | null
          last_active: string | null
          last_sign_in_at: string | null
          location: string | null
          newsletter_subscribed: boolean | null
          notifications_enabled: boolean | null
          phone: string | null
          phone_change: string | null
          phone_change_sent_at: string | null
          phone_change_token: string | null
          phone_confirmed_at: string | null
          raw_app_meta_data: Json | null
          raw_app_meta_data_updated_at: string | null
          raw_user_meta_data: Json | null
          raw_user_meta_data_updated_at: string | null
          recovery_sent_at: string | null
          recovery_token: string | null
          reputation_score: number | null
          role: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          aud?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          created_at?: string | null
          email: string
          email_change?: string | null
          email_change_sent_at?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          full_name?: string | null
          id?: string
          invited_at?: string | null
          is_super_admin?: boolean | null
          is_verified?: boolean | null
          last_active?: string | null
          last_sign_in_at?: string | null
          location?: string | null
          newsletter_subscribed?: boolean | null
          notifications_enabled?: boolean | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_app_meta_data_updated_at?: string | null
          raw_user_meta_data?: Json | null
          raw_user_meta_data_updated_at?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          reputation_score?: number | null
          role?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          aud?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          created_at?: string | null
          email?: string
          email_change?: string | null
          email_change_sent_at?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          full_name?: string | null
          id?: string
          invited_at?: string | null
          is_super_admin?: boolean | null
          is_verified?: boolean | null
          last_active?: string | null
          last_sign_in_at?: string | null
          location?: string | null
          newsletter_subscribed?: boolean | null
          notifications_enabled?: boolean | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_app_meta_data_updated_at?: string | null
          raw_user_meta_data?: Json | null
          raw_user_meta_data_updated_at?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          reputation_score?: number | null
          role?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      watchlists: {
        Row: {
          created_at: string | null
          id: string
          name: string
          symbols: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          symbols: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          symbols?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      workflows: {
        Row: {
          config: Json
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          last_run: string | null
          name: string
          run_count: number | null
          success_count: number | null
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run?: string | null
          name: string
          run_count?: number | null
          success_count?: number | null
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run?: string | null
          name?: string
          run_count?: number | null
          success_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      log_level: "info" | "warning" | "error" | "success"
      repository_status: "synced" | "syncing" | "error" | "pending"
      research_source: "youtube" | "github" | "reddit" | "openrouter"
      system_status: "online" | "warning" | "error" | "maintenance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      log_level: ["info", "warning", "error", "success"],
      repository_status: ["synced", "syncing", "error", "pending"],
      research_source: ["youtube", "github", "reddit", "openrouter"],
      system_status: ["online", "warning", "error", "maintenance"],
    },
  },
} as const
