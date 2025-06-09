
# API Documentation

## Overview

RoundAbout uses Supabase as its backend platform, providing REST APIs for data operations and Edge Functions for custom business logic. All APIs require authentication unless otherwise specified.

## Authentication

### Base URL
```
https://your-project.supabase.co
```

### Headers
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
apikey: <supabase_anon_key>
```

## Core Database APIs

### Profiles API

#### Get User Profile
```http
GET /rest/v1/profiles?id=eq.<user_id>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "avatar_url": "https://...",
  "points": 1250,
  "subscription_tier": "premium",
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-01T00:00:00Z"
}
```

#### Update User Profile
```http
PATCH /rest/v1/profiles?id=eq.<user_id>
Content-Type: application/json

{
  "first_name": "Jane",
  "last_name": "Smith",
  "avatar_url": "https://new-avatar.jpg"
}
```

### Social Accounts API

#### List Connected Accounts
```http
GET /rest/v1/social_accounts?user_id=eq.<user_id>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "platform": "instagram",
    "username": "johndoe",
    "account_id": "instagram_account_id",
    "access_token": "encrypted_token",
    "followers": 5000,
    "verified": true,
    "connected_at": "2023-01-01T00:00:00Z"
  }
]
```

#### Connect Social Account
```http
POST /rest/v1/social_accounts
Content-Type: application/json

{
  "platform": "instagram",
  "username": "johndoe",
  "account_id": "instagram_account_id",
  "access_token": "encrypted_token",
  "followers": 5000
}
```

#### Disconnect Social Account
```http
DELETE /rest/v1/social_accounts?id=eq.<account_id>
```

### Engagements API

#### List User Engagements
```http
GET /rest/v1/engagements?user_id=eq.<user_id>&order=submitted_at.desc
```

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "platform": "youtube",
    "content_url": "https://youtube.com/watch?v=...",
    "engagement_type": "like",
    "points_value": 10,
    "status": "verified",
    "submitted_at": "2023-01-01T00:00:00Z",
    "verified_at": "2023-01-01T01:00:00Z"
  }
]
```

#### Submit Engagement
```http
POST /rest/v1/engagements
Content-Type: application/json

{
  "platform": "youtube",
  "content_url": "https://youtube.com/watch?v=abc123",
  "engagement_type": "like",
  "points_value": 10
}
```

### Rewards API

#### List Available Rewards
```http
GET /rest/v1/rewards?is_active=eq.true&order=points_required.asc
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "$5 Amazon Gift Card",
    "description": "Redeem your points for an Amazon gift card",
    "points_required": 500,
    "image_url": "https://...",
    "category": "gift_card",
    "is_active": true,
    "stock_quantity": 100
  }
]
```

#### Redeem Reward
```http
POST /rest/v1/reward_redemptions
Content-Type: application/json

{
  "reward_id": "uuid",
  "points_used": 500
}
```

### Notifications API

#### List User Notifications
```http
GET /rest/v1/notifications?user_id=eq.<user_id>&order=created_at.desc
```

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "title": "Engagement Verified",
    "message": "Your YouTube like has been verified and you earned 10 points!",
    "type": "engagement_verified",
    "read": false,
    "created_at": "2023-01-01T00:00:00Z"
  }
]
```

#### Mark Notification as Read
```http
PATCH /rest/v1/notifications?id=eq.<notification_id>
Content-Type: application/json

{
  "read": true
}
```

## Edge Functions

### Payment Functions

#### Create Subscription
```http
POST /functions/v1/create-subscription
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "priceId": "price_1234567890",
  "successUrl": "https://yourapp.com/success",
  "cancelUrl": "https://yourapp.com/cancel"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/session/..."
}
```

#### Check Subscription Status
```http
POST /functions/v1/check-subscription
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "subscribed": true,
  "subscription_tier": "premium",
  "subscription_end": "2024-01-01T00:00:00Z"
}
```

#### Customer Portal
```http
POST /functions/v1/customer-portal
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "url": "https://billing.stripe.com/session/..."
}
```

### Social Integration Functions

#### Connect Social Account
```http
POST /functions/v1/connect-social-account
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "platform": "instagram"
}
```

**Response:**
```json
{
  "authUrl": "https://api.instagram.com/oauth/authorize?..."
}
```

### Analytics Functions

#### Get Engagement Analytics
```http
POST /functions/v1/engagement-analytics
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "startDate": "2023-01-01",
  "endDate": "2023-01-31",
  "platform": "all"
}
```

**Response:**
```json
{
  "totalEngagements": 150,
  "totalPoints": 1250,
  "platformBreakdown": {
    "instagram": 60,
    "youtube": 45,
    "twitter": 30,
    "linkedin": 15
  },
  "weeklyTrend": [
    { "week": "2023-W01", "engagements": 25, "points": 200 },
    { "week": "2023-W02", "engagements": 30, "points": 250 }
  ]
}
```

## WebSocket APIs

### Real-time Subscriptions

#### Subscribe to Profile Changes
```javascript
const subscription = supabase
  .channel('profile_changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'profiles',
    filter: `id=eq.${userId}`
  }, (payload) => {
    console.log('Profile updated:', payload);
  })
  .subscribe();
```

#### Subscribe to New Notifications
```javascript
const subscription = supabase
  .channel('notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    console.log('New notification:', payload.new);
  })
  .subscribe();
```

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is invalid",
    "details": "Specific error details here"
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `429` - Too Many Requests
- `500` - Internal Server Error

### Common Error Codes
- `INVALID_AUTH` - Invalid or expired authentication token
- `INSUFFICIENT_PERMISSIONS` - User lacks required permissions
- `RESOURCE_NOT_FOUND` - Requested resource does not exist
- `VALIDATION_ERROR` - Request data validation failed
- `RATE_LIMIT_EXCEEDED` - API rate limit exceeded
- `SUBSCRIPTION_REQUIRED` - Feature requires active subscription

## Rate Limiting

### Limits
- **REST API**: 100 requests per minute per user
- **Edge Functions**: 50 requests per minute per user
- **WebSocket**: 10 subscriptions per user

### Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 85
X-RateLimit-Reset: 1609459200
```

## Pagination

### Query Parameters
```http
GET /rest/v1/engagements?offset=0&limit=20&order=created_at.desc
```

### Response Headers
```http
Content-Range: 0-19/150
```

## Filtering and Sorting

### Filtering
```http
GET /rest/v1/engagements?status=eq.verified&platform=eq.youtube
```

### Sorting
```http
GET /rest/v1/engagements?order=points_value.desc,created_at.desc
```

### Full-text Search
```http
GET /rest/v1/rewards?title=fts.gift
```

## SDK Examples

### JavaScript/TypeScript
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);

// Get user engagements
const { data, error } = await supabase
  .from('engagements')
  .select('*')
  .eq('user_id', userId)
  .order('submitted_at', { ascending: false });

// Submit new engagement
const { data, error } = await supabase
  .from('engagements')
  .insert({
    platform: 'youtube',
    content_url: 'https://youtube.com/watch?v=abc123',
    engagement_type: 'like',
    points_value: 10
  });
```

### React Hook
```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

function useEngagements(userId: string) {
  return useQuery({
    queryKey: ['engagements', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('engagements')
        .select('*')
        .eq('user_id', userId)
        .order('submitted_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
}
```

## Testing

### Test Environment
```
Base URL: https://your-project-test.supabase.co
API Key: your-test-anon-key
```

### Sample Test Data
```json
{
  "test_user": {
    "email": "test@example.com",
    "password": "testpassword123"
  },
  "test_engagement": {
    "platform": "youtube",
    "content_url": "https://youtube.com/watch?v=test123",
    "engagement_type": "like",
    "points_value": 10
  }
}
```
