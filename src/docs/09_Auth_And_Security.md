
# Authentication & Security

## Overview

RoundAbout implements a comprehensive security model using Supabase Auth for authentication and PostgreSQL Row Level Security (RLS) for authorization. This document outlines our security architecture, authentication flows, and best practices.

## Authentication Architecture

### Supabase Auth Integration
- **JWT-based authentication** with secure token management
- **Email/password authentication** as primary method
- **OAuth providers** for social login (Google, GitHub, etc.)
- **Multi-factor authentication** (MFA) support
- **Password reset** and email verification flows

### Token Management
```typescript
// JWT token structure
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "authenticated",
  "aud": "authenticated",
  "exp": 1234567890,
  "iat": 1234567890
}
```

## Authentication Flows

### Registration Flow
1. User provides email and password
2. Supabase creates auth user
3. Email verification sent (optional)
4. Profile record created via trigger
5. Welcome email sent
6. User redirected to onboarding

```typescript
// Registration implementation
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: {
      first_name: 'John',
      last_name: 'Doe'
    }
  }
});
```

### Login Flow
1. User provides credentials
2. Supabase validates credentials
3. JWT token issued
4. Session established
5. User profile loaded
6. Subscription status checked

```typescript
// Login implementation
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});
```

### OAuth Flow
1. User clicks social login button
2. Redirect to OAuth provider
3. User authorizes application
4. Provider redirects back with code
5. Supabase exchanges code for token
6. User account created/linked
7. Session established

```typescript
// OAuth implementation
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`
  }
});
```

### Password Reset Flow
1. User requests password reset
2. Reset email sent with secure token
3. User clicks reset link
4. New password form displayed
5. Password updated in Supabase
6. User automatically logged in

```typescript
// Password reset implementation
const { error } = await supabase.auth.resetPasswordForEmail(
  'user@example.com',
  {
    redirectTo: `${window.location.origin}/reset-password`
  }
);
```

## Authorization Model

### Row Level Security (RLS)
All user data tables implement RLS policies to ensure users can only access their own data.

#### Profiles Table Policy
```sql
-- Users can only view and update their own profile
CREATE POLICY "Users can manage own profile" ON profiles
  FOR ALL USING (auth.uid() = id);
```

#### Social Accounts Policy
```sql
-- Users can only manage their own social accounts
CREATE POLICY "Users can manage own social accounts" ON social_accounts
  FOR ALL USING (auth.uid() = user_id);
```

#### Engagements Policy
```sql
-- Users can only manage their own engagements
CREATE POLICY "Users can manage own engagements" ON engagements
  FOR ALL USING (auth.uid() = user_id);
```

### Service Role Access
Edge functions use the service role key to bypass RLS for administrative operations:

```typescript
// Service role client for admin operations
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
```

## Security Best Practices

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Special characters recommended

### Session Management
- Sessions expire after 1 hour of inactivity
- Refresh tokens valid for 7 days
- Automatic token refresh in background
- Secure logout clears all tokens

```typescript
// Session refresh implementation
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed');
      }
    }
  );

  return () => subscription.unsubscribe();
}, []);
```

### Rate Limiting
- **Authentication attempts**: 5 per minute per IP
- **Password reset requests**: 3 per hour per email
- **API requests**: 100 per minute per user
- **Social account connections**: 10 per hour per user

### Data Encryption

#### At Rest
- All database data encrypted with AES-256
- Sensitive fields additionally encrypted at application level
- Social media tokens encrypted before storage

```typescript
// Token encryption example
import { encrypt, decrypt } from '@/lib/encryption';

// Store encrypted token
const encryptedToken = encrypt(accessToken);
await supabase.from('social_accounts').insert({
  access_token: encryptedToken
});

// Retrieve and decrypt token
const { data } = await supabase.from('social_accounts').select('access_token');
const decryptedToken = decrypt(data.access_token);
```

#### In Transit
- All communications over HTTPS/TLS 1.3
- Certificate pinning in production
- HSTS headers enforced

### Input Validation and Sanitization

#### Server-side Validation
```typescript
// Example validation schema
const userProfileSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  bio: z.string().max(500).optional()
});
```

#### SQL Injection Prevention
- Parameterized queries only
- Input sanitization
- Supabase built-in protections

#### XSS Prevention
- Content Security Policy (CSP) headers
- Input encoding/escaping
- Sanitization of user-generated content

## Multi-Factor Authentication (MFA)

### TOTP (Time-based One-Time Password)
```typescript
// Enable MFA
const { data, error } = await supabase.auth.mfa.enroll({
  factorType: 'totp'
});

// Verify MFA challenge
const { data, error } = await supabase.auth.mfa.challengeAndVerify({
  factorId: 'factor-id',
  code: 'user-entered-code'
});
```

### Recovery Codes
- 10 single-use recovery codes generated
- Securely displayed once during setup
- Can be used when primary MFA unavailable

## API Security

### Authentication Headers
```http
Authorization: Bearer <jwt_token>
apikey: <supabase_anon_key>
Content-Type: application/json
```

### CORS Configuration
```typescript
// CORS headers for edge functions
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};
```

### API Key Management
- Separate keys for development/staging/production
- Regular key rotation schedule
- Keys stored in environment variables
- No keys in client-side code

## Social Media Security

### OAuth Token Management
- Access tokens encrypted in database
- Refresh tokens securely stored
- Token expiration monitoring
- Automatic token refresh

### Platform API Compliance
- Rate limiting per platform requirements
- Scope limitations (minimal required permissions)
- Regular permission audits
- Secure webhook verification

```typescript
// Webhook verification example
const verifyWebhook = (signature: string, payload: string, secret: string) => {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const computedSignature = hmac.digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
};
```

## Payment Security

### Stripe Integration
- PCI DSS compliance through Stripe
- No sensitive payment data stored
- Webhook signature verification
- Idempotency keys for duplicate prevention

```typescript
// Secure webhook handling
const signature = request.headers['stripe-signature'];
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

try {
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret
  );
} catch (err) {
  throw new Error('Webhook signature verification failed');
}
```

## Privacy and Compliance

### GDPR Compliance
- Data minimization principles
- Explicit consent for data processing
- Right to access personal data
- Right to deletion (data portability)
- Data Protection Impact Assessment (DPIA)

### Data Retention
- User data retained while account active
- 30-day grace period after deletion request
- Anonymous analytics data retained indefinitely
- Audit logs retained for 7 years

### Cookie Policy
- Essential cookies only without consent
- Analytics cookies with explicit consent
- Session cookies for authentication
- No third-party tracking cookies

## Incident Response

### Security Incident Procedure
1. **Detection** - Automated monitoring alerts
2. **Assessment** - Determine scope and impact
3. **Containment** - Isolate affected systems
4. **Investigation** - Root cause analysis
5. **Recovery** - Restore normal operations
6. **Review** - Post-incident analysis

### Breach Notification
- Internal notification within 1 hour
- User notification within 24 hours (if required)
- Regulatory notification within 72 hours (GDPR)
- Public disclosure if legally required

## Security Monitoring

### Automated Monitoring
- Failed authentication attempts
- Unusual access patterns
- Suspicious API usage
- Database query anomalies

### Audit Logging
```sql
-- Audit log table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Security Metrics
- Authentication success/failure rates
- Token refresh frequency
- API endpoint usage patterns
- Failed authorization attempts

## Development Security

### Secure Development Lifecycle
- Security requirements in design phase
- Code review for security issues
- Automated security testing
- Dependency vulnerability scanning
- Regular security training

### Environment Security
- Separate environments (dev/staging/prod)
- Environment variable management
- Secure CI/CD pipelines
- Regular dependency updates

### Code Security
```typescript
// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
```

## Security Testing

### Penetration Testing
- Annual third-party penetration testing
- Regular vulnerability assessments
- Automated security scanning
- Bug bounty program

### Security Checklist
- [ ] All user inputs validated and sanitized
- [ ] SQL injection prevention implemented
- [ ] XSS protection in place
- [ ] CSRF tokens on forms
- [ ] Rate limiting configured
- [ ] HTTPS enforced
- [ ] Security headers set
- [ ] Authentication flows tested
- [ ] Authorization policies verified
- [ ] Sensitive data encrypted
- [ ] Error messages don't leak information
- [ ] Logging configured properly
- [ ] Dependencies up to date
- [ ] Environment variables secured
