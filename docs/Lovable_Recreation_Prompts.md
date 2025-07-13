# Lovable Recreation Prompts for RoundAbout Platform

## 🎯 MASTER RECREATION PROMPT

Use this comprehensive prompt in a new Lovable chat to recreate the entire RoundAbout platform:

---

**PROMPT:**

```
Create a comprehensive creator engagement platform called "RoundAbout" with the following specifications:

## CORE ARCHITECTURE
- React 18 + TypeScript + Vite
- Supabase backend (auth, database, real-time)
- Stripe payment integration  
- Tailwind CSS + Shadcn/UI design system
- React Router for navigation
- TanStack React Query for data management

## PAGES TO CREATE (14 total):
1. **Landing Page** (/) - Hero section with "Empower Your Creator Journey", features showcase, pricing tiers, and CTA
2. **Auth Page** (/auth) - Combined login/signup forms with email/password
3. **Dashboard** (/dashboard) - Main hub with stats cards, engagement chart, recent activity
4. **Engagement** (/engagement) - Social engagement opportunities table with filters
5. **Accounts** (/accounts) - Social media account connection management
6. **Analytics** (/analytics) - Charts and metrics dashboard with engagement insights
7. **Community** (/community) - Creator profiles, groups, networking features  
8. **Creator Profile** (/creator/:id) - Individual creator pages with bio, stats, content
9. **Group Details** (/community/group/:id) - Group management with members and posts
10. **Messages** (/messages) - Real-time messaging center
11. **Notifications** (/notifications) - Notification management center
12. **Rewards** (/rewards) - Points system, achievements, reward redemption
13. **Settings** (/settings) - User preferences and account settings
14. **Premium** (/premium) - Subscription plans and billing management

## DATABASE SCHEMA (use Supabase):
Create these tables with proper RLS policies:

**User Management:**
- profiles (id, username, full_name, bio, avatar_url, created_at, updated_at)
- user_settings (user_id, theme, notification_preferences, dashboard_layout, chart_style)
- follows (follower_id, following_id, created_at)

**Social & Engagement:**
- social_accounts (user_id, platform, account_id, username, access_token, refresh_token)
- engagements (id, user_id, platform, type, target_url, points_earned, status, completed_at)

**Community:**
- collections (id, creator_id, name, description, created_at)
- nfts (id, creator_id, owner_id, title, description, image_url, price, royalty_percentage)
- nft_collections (nft_id, collection_id)
- favorites (user_id, nft_id, created_at)
- memories (id, user_id, title, content, created_at, updated_at)
- stories (id, memory_id, user_id, title, content, themes, emotional_tone)

**Trading/Finance (for future crypto features):**
- trading_bots (id, user_id, name, strategy, pair, timeframe, is_active, config)
- bot_performance (bot_id, date, profit_loss, trades_count)
- portfolios (id, user_id, created_at, updated_at)
- portfolio_assets (portfolio_id, symbol, name, quantity, purchase_price, exchange)
- transactions (id, user_id, symbol, type, quantity, price, amount, fee, status)
- watchlists (id, user_id, name, symbols)
- alerts (id, user_id, symbol, type, condition, target, channels, is_triggered)

## KEY COMPONENTS TO BUILD:

**Layout & Navigation:**
- Responsive navbar with auth state and theme toggle
- Dashboard layout with sidebar navigation
- Footer with links and social media

**Authentication:**
- Login/signup forms with Supabase auth
- Protected route wrapper
- Auth context provider

**Dashboard Features:**
- Stats grid showing followers, engagement rate, points, revenue
- Engagement chart with daily/weekly/monthly views
- Recent activity feed
- Quick action buttons

**Social Integration:**
- Platform connection cards (Instagram, Twitter, YouTube, LinkedIn, TikTok)
- OAuth flow for account linking
- Account status indicators

**Engagement System:**
- Engagement opportunities table with platform, type, points, status
- Filter by platform, date range, completion status
- Engagement completion modal with verification

**Community Features:**
- Creator profile cards with avatar, name, followers, engagement rate
- Group cards showing member count, activity level
- Group creation and management forms
- Member lists and role management

**Rewards & Gamification:**
- Points history with transactions
- Achievement badges and progress tracking  
- Reward catalog with gift cards and benefits
- Redemption flow and confirmation

**Analytics Dashboard:**
- Interactive charts for engagement, followers, revenue
- Platform-specific metrics
- Growth trend analysis
- Performance comparisons

**Messaging System:**
- Chat interface with contact list
- Real-time message updates
- Message status indicators

**Payment Integration:**
- Stripe subscription plans (Free, Pro, Enterprise)
- Payment forms and checkout flow
- Billing history and invoice downloads
- Subscription management

## DESIGN REQUIREMENTS:
- Modern, clean interface with gradient accents
- Dark/light theme support with system preference detection
- Mobile-responsive design (mobile-first approach)
- Consistent color scheme using CSS custom properties
- Smooth animations and transitions
- Professional creator-focused aesthetic

## TECHNICAL FEATURES:
- Row Level Security (RLS) on all database tables
- Real-time updates for messages and notifications
- Image upload and optimization
- Search functionality across users and content
- Advanced filtering and sorting options
- Keyboard shortcuts for power users
- Loading states and error handling
- Form validation and user feedback
- SEO optimization for public pages

## CONTENT & COPY:
- Use "RoundAbout" as the brand name
- Tagline: "Empower Your Creator Journey"
- Focus on creator growth, community, and monetization
- Professional yet approachable tone
- Include sample data for development/demo

## IMMEDIATE SETUP:
1. Set up Supabase project with authentication
2. Configure Stripe for payments (test mode)
3. Create the database schema with RLS policies
4. Implement authentication flow first
5. Build core dashboard and navigation
6. Add social platform integration placeholders
7. Implement rewards and engagement systems

Start with the landing page and authentication, then build the dashboard as the main hub. Focus on creating a polished user experience that showcases the platform's value for content creators.

Create beautiful, functional components that work together as a cohesive platform. Make it look professional and ready for production use.
```

---

## 🚀 ALTERNATIVE: PROGRESSIVE PROMPTS

If the master prompt is too large, use these sequential prompts:

### **Phase 1: Foundation Setup**
```
Create a React + TypeScript + Vite project for a creator platform called "RoundAbout". Set up:
- Supabase integration for auth and database
- Tailwind CSS + Shadcn/UI components
- React Router with these routes: /, /auth, /dashboard
- Basic navbar with theme toggle
- Landing page with hero "Empower Your Creator Journey"
- Auth page with login/signup forms using Supabase
- Protected dashboard route
Make it look professional with dark/light theme support.
```

### **Phase 2: Database & Core Features**
```
Add comprehensive database schema to the RoundAbout platform:
- Create profiles, social_accounts, engagements, collections, nfts tables
- Implement RLS policies for user data security  
- Build dashboard with stats grid (followers, engagement, points, revenue)
- Add engagement opportunities table with filtering
- Create social account connection interface
- Add basic rewards/points system
Use proper TypeScript types and error handling.
```

### **Phase 3: Community & Advanced Features**
```
Extend RoundAbout with community features:
- Add /community page with creator profiles and groups
- Create /analytics page with charts using Recharts
- Build messaging system with real-time updates
- Add notification center
- Implement advanced search and filtering
- Create group management with member lists
- Add achievement system and reward redemption
Focus on user experience and smooth interactions.
```

### **Phase 4: Payment & Premium Features**
```
Complete RoundAbout with monetization:
- Integrate Stripe for subscription management
- Create /premium page with pricing plans
- Add billing history and payment forms
- Implement subscription status in dashboard
- Create premium feature flags and access control
- Add comprehensive settings page
- Polish all components and add loading states
Make it production-ready with proper error handling.
```

---

## 🎨 DESIGN SYSTEM PROMPT

For consistent styling across the platform:

```
Create a comprehensive design system for RoundAbout with:
- CSS custom properties for consistent theming
- Primary colors: Blue (#3B82F6), Purple gradients  
- Typography scale with proper font weights
- Component variants for buttons, cards, forms
- Spacing and layout tokens
- Animation and transition standards
- Dark/light mode color schemes
- Mobile-responsive breakpoints
Use HSL color values and semantic naming conventions.
```

---

## 🔧 TECHNICAL DEEP-DIVE PROMPTS

### **Real-time Features**
```
Add real-time capabilities to RoundAbout:
- WebSocket connections for live messaging
- Real-time notification updates
- Live engagement tracking
- Presence indicators for online users
- Live collaboration in groups
Use Supabase real-time subscriptions and proper connection management.
```

### **AI Integration**
```
Integrate AI features into RoundAbout:
- Content suggestion system using OpenAI
- Engagement optimization recommendations  
- Trend analysis and predictions
- Automated content moderation
- Smart notification filtering
Create edge functions for AI processing and maintain user privacy.
```

### **Advanced Analytics**
```
Build comprehensive analytics for RoundAbout:
- Interactive charts with drill-down capabilities
- Cohort analysis and user retention metrics
- Revenue tracking and forecasting
- Platform comparison tools
- Custom dashboard builder
- Export functionality for reports
Use Recharts for visualizations and implement data caching.
```

---

## 📱 MOBILE-SPECIFIC PROMPT

```
Optimize RoundAbout for mobile users:
- Touch-friendly interface with proper tap targets
- Swipe gestures for navigation
- Mobile-optimized forms and inputs
- Responsive image handling
- Offline functionality with service workers
- Push notification support
- Mobile-specific navigation patterns
Ensure 60fps performance and accessibility compliance.
```

---

## 🎯 QUICK START PROMPTS

### **MVP Version (30 minutes)**
```
Create a minimal RoundAbout MVP with:
- Landing page + auth + basic dashboard
- Simple engagement tracking table
- Social account connection placeholders
- Basic reward points system
- Clean design with dark/light themes
Focus on core user flow and professional appearance.
```

### **Demo Version (1 hour)**
```
Build a demo-ready RoundAbout with:
- All main pages with sample data
- Working authentication and navigation
- Interactive engagement system
- Community features with creator profiles
- Basic analytics charts
- Responsive design and animations
Make it impressive for showcasing to stakeholders.
```

### **Production Version (2-3 hours)**
```
Create production-ready RoundAbout with:
- Complete database schema and RLS
- Full authentication and user management
- All features from the master prompt
- Stripe integration and payments
- Real-time messaging and notifications
- Comprehensive error handling and validation
- SEO optimization and performance tuning
Ready for real users and data.
```

---

Use these prompts based on your timeline and requirements. The master prompt gives you everything at once, while the progressive prompts let you build iteratively with user feedback at each stage.