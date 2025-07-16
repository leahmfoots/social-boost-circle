
# API Documentation
## RoundAbout Creator Platform

### 🔗 API Overview

#### Base URLs
```
Production: https://wghcoxcxybumcfetcmev.supabase.co
Development: http://localhost:54321

REST API: /rest/v1/
Edge Functions: /functions/v1/
Authentication: /auth/v1/
Real-time: /realtime/v1/
```

#### Authentication
```typescript
// All API requests require authentication header
Headers: {
  'Authorization': 'Bearer <JWT_TOKEN>',
  'apikey': '<SUPABASE_ANON_KEY>',
  'Content-Type': 'application/json'
}
```

### 👤 Authentication API

#### Sign Up
```http
POST /auth/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "data": {
    "full_name": "John Doe",
    "username": "johndoe"
  },
  "options": {
    "emailRedirectTo": "https://app.roundabout.com/dashboard"
  }
}

Response 200:
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "email_confirmed_at": null,
    "created_at": "2024-01-16T10:00:00Z"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_in": 3600
  }
}
```

#### Sign In
```http
POST /auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "user@example.com", 
  "password": "securepassword123"
}

Response 200:
{
  "access_token": "jwt_token",
  "refresh_token": "refresh_token", 
  "expires_in": 3600,
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### Sign Out
```http
POST /auth/v1/logout
Authorization: Bearer <JWT_TOKEN>

Response 204: No Content
```

### 👥 User Management API

#### Get User Profile
```http
GET /rest/v1/profiles?id=eq.<user_id>
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "id": "uuid",
    "username": "johndoe",
    "full_name": "John Doe",
    "bio": "Content creator and entrepreneur",
    "avatar_url": "https://...",
    "created_at": "2024-01-16T10:00:00Z",
    "updated_at": "2024-01-16T10:00:00Z"
  }
]
```

#### Update User Profile
```http
PATCH /rest/v1/profiles?id=eq.<user_id>
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "full_name": "John Smith",
  "bio": "Updated bio text",
  "avatar_url": "https://new-avatar-url.com"
}

Response 200:
[
  {
    "id": "uuid",
    "username": "johndoe", 
    "full_name": "John Smith",
    "bio": "Updated bio text",
    "avatar_url": "https://new-avatar-url.com",
    "updated_at": "2024-01-16T11:00:00Z"
  }
]
```

#### Get User Settings
```http
GET /rest/v1/user_settings?user_id=eq.<user_id>
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "user_id": "uuid",
    "notification_preferences": {
      "email": true,
      "push": false,
      "sms": false
    },
    "theme": "dark",
    "dashboard_layout": "default",
    "chart_style": "candles"
  }
]
```

### 🔗 Social Connections API

#### List Connected Accounts
```http
GET /rest/v1/social_accounts?user_id=eq.<user_id>
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "id": "uuid",
    "user_id": "uuid", 
    "platform": "instagram",
    "platform_user_id": "instagram_user_id",
    "username": "johndoe_insta",
    "is_active": true,
    "last_sync": "2024-01-16T09:00:00Z",
    "metrics": {
      "followers": 15000,
      "following": 500,
      "posts": 120
    }
  }
]
```

#### Connect Social Account
```http
POST /rest/v1/social_accounts
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "platform": "youtube",
  "platform_user_id": "youtube_channel_id",
  "username": "johndoe_yt",
  "access_token": "encrypted_token",
  "refresh_token": "encrypted_refresh"
}

Response 201:
{
  "id": "uuid",
  "user_id": "uuid",
  "platform": "youtube", 
  "username": "johndoe_yt",
  "is_active": true,
  "connected_at": "2024-01-16T10:30:00Z"
}
```

### 📊 Analytics API

#### Get Engagement Metrics
```http
GET /rest/v1/engagement_metrics?user_id=eq.<user_id>&created_at=gte.2024-01-01
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "platform": "instagram", 
    "metric_type": "post_engagement",
    "value": 850,
    "date": "2024-01-16",
    "content_id": "post_123",
    "metadata": {
      "likes": 750,
      "comments": 85,
      "shares": 15
    }
  }
]
```

#### Get Dashboard Stats
```http
GET /rest/v1/rpc/get_dashboard_stats
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "user_id": "uuid",
  "date_range": "30d"
}

Response 200:
{
  "total_followers": 45000,
  "total_engagement": 12500,
  "engagement_rate": 0.278,
  "growth_rate": 0.15,
  "top_performing_platform": "instagram",
  "recent_achievements": [
    {
      "type": "milestone",
      "title": "10K Followers",
      "date": "2024-01-15"
    }
  ]
}
```

### 🏆 Rewards & Gamification API

#### Get User Points
```http
GET /rest/v1/user_points?user_id=eq.<user_id>
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "user_id": "uuid",
    "total_points": 2450,
    "available_points": 1200,
    "points_earned_today": 75,
    "current_level": 5,
    "points_to_next_level": 550
  }
]
```

#### Get Available Rewards
```http
GET /rest/v1/rewards?is_active=eq.true
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "id": "uuid",
    "title": "$10 Amazon Gift Card",
    "description": "Redeem for Amazon shopping",
    "points_required": 1000,
    "category": "gift_card",
    "image_url": "https://...",
    "is_active": true,
    "stock_available": 50
  }
]
```

#### Redeem Reward
```http
POST /rest/v1/reward_redemptions
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "reward_id": "uuid",
  "user_id": "uuid"
}

Response 201:
{
  "id": "uuid",
  "reward_id": "uuid",
  "user_id": "uuid",
  "points_spent": 1000,
  "status": "pending",
  "redeemed_at": "2024-01-16T10:45:00Z"
}
```

### 👥 Community API

#### Get Creator Profiles
```http
GET /rest/v1/profiles?select=*,follower_count,following_count&limit=20
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "id": "uuid",
    "username": "creator1",
    "full_name": "Jane Creator", 
    "bio": "Travel and lifestyle content",
    "avatar_url": "https://...",
    "follower_count": 25000,
    "following_count": 1500,
    "verification_status": "verified"
  }
]
```

#### Follow Creator
```http
POST /rest/v1/follows
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "follower_id": "uuid",
  "following_id": "uuid"
}

Response 201:
{
  "id": "uuid",
  "follower_id": "uuid", 
  "following_id": "uuid",
  "created_at": "2024-01-16T10:50:00Z"
}
```

#### Get Community Groups
```http
GET /rest/v1/groups?is_public=eq.true&limit=20
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "id": "uuid",
    "name": "YouTube Creators Hub",
    "description": "Community for YouTube content creators",
    "member_count": 156,
    "is_public": true,
    "category": "platform_specific",
    "created_at": "2024-01-10T00:00:00Z"
  }
]
```

### 💬 Messaging API

#### Get Conversations
```http
GET /rest/v1/conversations?participant_id=eq.<user_id>
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "id": "uuid",
    "participants": ["uuid1", "uuid2"],
    "last_message": {
      "content": "Thanks for the collaboration idea!",
      "sent_at": "2024-01-16T09:30:00Z",
      "sender_id": "uuid2"
    },
    "unread_count": 2,
    "updated_at": "2024-01-16T09:30:00Z"
  }
]
```

#### Send Message
```http
POST /rest/v1/messages
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "conversation_id": "uuid",
  "sender_id": "uuid",
  "content": "Hey! I'd love to collaborate on a project.",
  "message_type": "text"
}

Response 201:
{
  "id": "uuid",
  "conversation_id": "uuid",
  "sender_id": "uuid",
  "content": "Hey! I'd love to collaborate on a project.",
  "message_type": "text",
  "sent_at": "2024-01-16T10:55:00Z",
  "read_at": null
}
```

### 🔔 Notifications API

#### Get Notifications
```http
GET /rest/v1/notifications?user_id=eq.<user_id>&is_read=eq.false&limit=50
Authorization: Bearer <JWT_TOKEN>

Response 200:
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "type": "achievement_unlocked",
    "title": "New Achievement!",
    "message": "You've earned the 'Consistent Creator' badge",
    "is_read": false,
    "created_at": "2024-01-16T08:00:00Z",
    "metadata": {
      "achievement_id": "uuid",
      "points_earned": 100
    }
  }
]
```

#### Mark Notification as Read
```http
PATCH /rest/v1/notifications?id=eq.<notification_id>
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "is_read": true,
  "read_at": "2024-01-16T11:00:00Z"
}

Response 200:
[
  {
    "id": "uuid",
    "is_read": true,
    "read_at": "2024-01-16T11:00:00Z"
  }
]
```

### 💳 Subscription Management API (Edge Functions)

#### Check Subscription Status
```http
POST /functions/v1/check-subscription
Authorization: Bearer <JWT_TOKEN>

Response 200:
{
  "subscribed": true,
  "subscription_tier": "Pro",
  "subscription_end": "2024-02-16T00:00:00Z",
  "status": "active"
}
```

#### Create Subscription
```http
POST /functions/v1/create-subscription
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "price_id": "price_stripe_id",
  "success_url": "https://app.roundabout.com/dashboard?success=true",
  "cancel_url": "https://app.roundabout.com/premium?canceled=true"
}

Response 200:
{
  "url": "https://checkout.stripe.com/pay/cs_..."
}
```

#### Access Customer Portal
```http
POST /functions/v1/customer-portal
Authorization: Bearer <JWT_TOKEN>

Response 200:
{
  "url": "https://billing.stripe.com/session/..."
}
```

### 📈 Real-time API

#### WebSocket Connection
```typescript
// Real-time subscription for notifications
const channel = supabase
  .channel('user_notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public', 
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, payload => {
    console.log('New notification:', payload.new)
  })
  .subscribe()
```

#### Presence Tracking
```typescript
// Track online users
const presenceChannel = supabase
  .channel('online_users')
  .on('presence', { event: 'sync' }, () => {
    const presenceState = presenceChannel.presenceState()
    console.log('Online users:', Object.keys(presenceState).length)
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await presenceChannel.track({
        user_id: userId,
        username: username,
        online_at: new Date().toISOString()
      })
    }
  })
```

### 🚨 Error Handling

#### Standard Error Response
```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "status": 400
}
```

#### Common HTTP Status Codes
```
200 - OK
201 - Created  
204 - No Content
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
422 - Unprocessable Entity
429 - Too Many Requests
500 - Internal Server Error
```

### 🔒 Rate Limiting

#### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642329600
```

#### Rate Limits by Endpoint
```
Authentication: 5 requests/minute
User Management: 60 requests/minute  
Analytics: 100 requests/minute
Real-time: 1000 events/minute
```

This API documentation provides comprehensive coverage of all available endpoints and their usage patterns for the RoundAbout platform.
