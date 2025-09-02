
# Testing Guide

This comprehensive testing guide covers all aspects of testing the RoundAbout platform, from unit tests to end-to-end testing strategies.

## 🧪 Testing Philosophy

### Testing Pyramid
Our testing strategy follows the testing pyramid principle:
- **Unit Tests (70%)** - Fast, isolated tests for individual components and functions
- **Integration Tests (20%)** - Tests for component interactions and API integrations  
- **End-to-End Tests (10%)** - Full user journey validation

### Testing Principles
- **Test-Driven Development (TDD)** for critical business logic
- **Behavior-Driven Development (BDD)** for user-facing features
- **Continuous Testing** integrated into CI/CD pipeline
- **Risk-Based Testing** focusing on high-impact areas

## 🛠️ Testing Stack

### Core Testing Tools
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@playwright/test": "^1.40.0",
    "msw": "^2.0.0",
    "jsdom": "^23.0.0"
  }
}
```

### Test Configuration
Create `vitest.config.ts`:
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        'build/',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## 🔧 Test Setup

### Test Environment Setup
Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock scrollTo
window.scrollTo = vi.fn()

// Suppress console.error for expected errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
```

### Test Utilities
Create `src/test/utils.tsx`:
```typescript
import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Custom queries and matchers
export const getByTestId = (id: string) => document.querySelector(`[data-testid="${id}"]`)
export const queryByTestId = (id: string) => document.querySelector(`[data-testid="${id}"]`)
```

### Mock Data
Create `src/test/mocks.ts`:
```typescript
import { User } from '@supabase/supabase-js'

export const mockUser: User = {
  id: 'test-user-id',
  email: 'test@example.com',
  user_metadata: {
    full_name: 'Test User',
    username: 'testuser',
  },
  app_metadata: {},
  aud: 'authenticated',
  created_at: '2023-01-01T00:00:00.000Z',
}

export const mockProfile = {
  id: 'test-user-id',
  username: 'testuser',
  full_name: 'Test User',
  bio: 'Test bio',
  avatar_url: null,
  points: 1250,
  subscription_tier: 'free' as const,
  is_verified: false,
  created_at: '2023-01-01T00:00:00.000Z',
  updated_at: '2023-01-01T00:00:00.000Z',
}

export const mockSocialAccount = {
  id: 'test-social-account-id',
  user_id: 'test-user-id',
  platform: 'instagram' as const,
  username: 'testuser',
  account_id: 'instagram-account-id',
  followers_count: 1500,
  following_count: 300,
  is_verified: true,
  is_connected: true,
  connected_at: '2023-01-01T00:00:00.000Z',
  last_sync_at: '2023-01-02T00:00:00.000Z',
  created_at: '2023-01-01T00:00:00.000Z',
}

export const mockEngagement = {
  id: 'test-engagement-id',
  user_id: 'test-user-id',
  target_user_id: 'target-user-id',
  platform: 'instagram',
  engagement_type: 'like' as const,
  content_url: 'https://instagram.com/p/test',
  content_title: 'Test Post',
  points_value: 10,
  status: 'pending' as const,
  created_at: '2023-01-01T00:00:00.000Z',
}

export const mockReward = {
  id: 'test-reward-id',
  title: '$10 Amazon Gift Card',
  description: 'Redeem points for Amazon shopping',
  points_required: 1000,
  reward_type: 'gift_card' as const,
  reward_value: 10.00,
  currency: 'USD',
  image_url: '/placeholder-gift-card.jpg',
  is_active: true,
  created_at: '2023-01-01T00:00:00.000Z',
  updated_at: '2023-01-01T00:00:00.000Z',
}
```

## 🧪 Unit Testing

### Component Testing

#### Basic Component Test
```typescript
// src/components/__tests__/Button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

#### Complex Component Test
```typescript
// src/components/__tests__/SocialAccountCard.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { SocialAccountCard } from '@/components/social/SocialAccountCard'
import { mockSocialAccount } from '@/test/mocks'

describe('SocialAccountCard', () => {
  const mockProps = {
    platform: 'instagram' as const,
    onConnect: vi.fn(),
    onDisconnect: vi.fn(),
    onSync: vi.fn(),
  }

  it('shows not connected state when no account provided', () => {
    render(<SocialAccountCard {...mockProps} />)
    expect(screen.getByText('Not connected')).toBeInTheDocument()
    expect(screen.getByText('Connect Account')).toBeInTheDocument()
  })

  it('shows connected account information', () => {
    render(<SocialAccountCard {...mockProps} account={mockSocialAccount} />)
    
    expect(screen.getByText('@testuser')).toBeInTheDocument()
    expect(screen.getByText('1.5K')).toBeInTheDocument() // Formatted followers
    expect(screen.getByText('Connected')).toBeInTheDocument()
  })

  it('handles sync action', async () => {
    const user = userEvent.setup()
    render(<SocialAccountCard {...mockProps} account={mockSocialAccount} />)
    
    await user.click(screen.getByText('Sync'))
    expect(mockProps.onSync).toHaveBeenCalledWith(mockSocialAccount.id)
  })

  it('handles disconnect action', async () => {
    const user = userEvent.setup()
    render(<SocialAccountCard {...mockProps} account={mockSocialAccount} />)
    
    await user.click(screen.getByText('Disconnect'))
    expect(mockProps.onDisconnect).toHaveBeenCalledWith(mockSocialAccount.id)
  })

  it('shows verification badge for verified accounts', () => {
    const verifiedAccount = { ...mockSocialAccount, is_verified: true }
    render(<SocialAccountCard {...mockProps} account={verifiedAccount} />)
    
    expect(screen.getByTestId('verification-badge')).toBeInTheDocument()
  })
})
```

### Hook Testing

#### Custom Hook Test
```typescript
// src/hooks/__tests__/useAuth.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { mockUser } from '@/test/mocks'

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}))

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBe(true)
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('handles successful login', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })
    
    vi.mocked(supabase.auth.signInWithPassword).mockImplementation(mockSignIn)
    
    const { result } = renderHook(() => useAuth())
    
    await act(async () => {
      await result.current.signIn('test@example.com', 'password')
    })
    
    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    })
  })

  it('handles login error', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({
      data: { user: null },
      error: { message: 'Invalid credentials' },
    })
    
    vi.mocked(supabase.auth.signInWithPassword).mockImplementation(mockSignIn)
    
    const { result } = renderHook(() => useAuth())
    
    await expect(
      result.current.signIn('test@example.com', 'wrongpassword')
    ).rejects.toThrow('Invalid credentials')
  })
})
```

### Utility Function Testing

```typescript
// src/lib/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest'
import { cn, formatNumber, formatDate } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('cn (className helper)', () => {
    it('combines class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('handles conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    })

    it('handles objects with conditions', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })
  })

  describe('formatNumber', () => {
    it('formats large numbers with K suffix', () => {
      expect(formatNumber(1500)).toBe('1.5K')
      expect(formatNumber(15000)).toBe('15K')
    })

    it('formats millions with M suffix', () => {
      expect(formatNumber(1500000)).toBe('1.5M')
      expect(formatNumber(15000000)).toBe('15M')
    })

    it('returns small numbers as is', () => {
      expect(formatNumber(999)).toBe('999')
      expect(formatNumber(42)).toBe('42')
    })
  })

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2023-01-15T10:30:00Z')
      expect(formatDate(date)).toBe('Jan 15, 2023')
    })

    it('handles relative time', () => {
      const now = new Date()
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
      expect(formatDate(oneHourAgo, 'relative')).toBe('1 hour ago')
    })
  })
})
```

## 🔗 Integration Testing

### API Integration Tests
```typescript
// src/api/__tests__/engagement.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createEngagement, getEngagements } from '@/api/engagement'
import { supabase } from '@/integrations/supabase/client'
import { mockEngagement } from '@/test/mocks'

// Mock Supabase
vi.mock('@/integrations/supabase/client')

describe('Engagement API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createEngagement', () => {
    it('creates engagement successfully', async () => {
      const mockInsert = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: mockEngagement,
            error: null,
          }),
        }),
      })

      vi.mocked(supabase.from).mockReturnValue({
        insert: mockInsert,
      } as any)

      const result = await createEngagement({
        platform: 'instagram',
        engagement_type: 'like',
        content_url: 'https://instagram.com/p/test',
        points_value: 10,
      })

      expect(result).toEqual(mockEngagement)
      expect(mockInsert).toHaveBeenCalledWith({
        platform: 'instagram',
        engagement_type: 'like',
        content_url: 'https://instagram.com/p/test',
        points_value: 10,
      })
    })

    it('handles creation errors', async () => {
      const mockInsert = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database error' },
          }),
        }),
      })

      vi.mocked(supabase.from).mockReturnValue({
        insert: mockInsert,
      } as any)

      await expect(
        createEngagement({
          platform: 'instagram',
          engagement_type: 'like',
          content_url: 'invalid-url',
          points_value: 10,
        })
      ).rejects.toThrow('Database error')
    })
  })

  describe('getEngagements', () => {
    it('fetches engagements with filters', async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [mockEngagement],
        error: null,
      })

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            order: vi.fn().mockReturnValue(mockSelect),
          }),
        }),
      } as any)

      const result = await getEngagements({
        userId: 'test-user-id',
        platform: 'instagram',
      })

      expect(result).toEqual([mockEngagement])
    })
  })
})
```

### Component Integration Tests
```typescript
// src/components/__tests__/EngagementDashboard.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/utils'
import { EngagementDashboard } from '@/components/EngagementDashboard'
import { mockEngagement, mockUser } from '@/test/mocks'

// Mock API calls
vi.mock('@/api/engagement', () => ({
  getEngagements: vi.fn(),
  createEngagement: vi.fn(),
}))

// Mock auth context
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    isAuthenticated: true,
    loading: false,
  }),
}))

describe('EngagementDashboard Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads and displays engagements', async () => {
    vi.mocked(getEngagements).mockResolvedValue([mockEngagement])

    render(<EngagementDashboard />)

    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument()
    })

    expect(screen.getByText('10 points')).toBeInTheDocument()
    expect(screen.getByText('pending')).toBeInTheDocument()
  })

  it('handles empty state', async () => {
    vi.mocked(getEngagements).mockResolvedValue([])

    render(<EngagementDashboard />)

    await waitFor(() => {
      expect(screen.getByText('No engagements found')).toBeInTheDocument()
    })
  })

  it('handles API errors', async () => {
    vi.mocked(getEngagements).mockRejectedValue(new Error('API Error'))

    render(<EngagementDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load engagements')).toBeInTheDocument()
    })
  })
})
```

## 🎭 End-to-End Testing

### Playwright Configuration
Create `playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
```

### E2E Test Examples

#### User Authentication Flow
```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('user can sign up and login', async ({ page }) => {
    // Navigate to signup
    await page.goto('/')
    await page.click('text=Sign Up')
    
    // Fill signup form
    await page.fill('[data-testid=email-input]', 'test@example.com')
    await page.fill('[data-testid=password-input]', 'SecurePassword123!')
    await page.fill('[data-testid=confirm-password-input]', 'SecurePassword123!')
    
    // Submit form
    await page.click('[data-testid=signup-button]')
    
    // Check for success redirect
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('[data-testid=user-avatar]')).toBeVisible()
  })

  test('handles login errors gracefully', async ({ page }) => {
    await page.goto('/login')
    
    // Try with invalid credentials
    await page.fill('[data-testid=email-input]', 'invalid@example.com')
    await page.fill('[data-testid=password-input]', 'wrongpassword')
    await page.click('[data-testid=login-button]')
    
    // Check error message
    await expect(page.locator('[data-testid=error-message]')).toContainText('Invalid credentials')
  })
})
```

#### Engagement Workflow
```typescript
// tests/e2e/engagement.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Engagement Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login as test user
    await page.goto('/login')
    await page.fill('[data-testid=email-input]', 'test@example.com')
    await page.fill('[data-testid=password-input]', 'password')
    await page.click('[data-testid=login-button]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('user can complete engagement task', async ({ page }) => {
    // Navigate to engagements
    await page.click('text=Engagements')
    await expect(page).toHaveURL('/engagement')
    
    // Find and click on an engagement
    const firstEngagement = page.locator('[data-testid=engagement-card]').first()
    await firstEngagement.click()
    
    // Complete the engagement
    await page.fill('[data-testid=proof-url]', 'https://example.com/proof')
    await page.setInputFiles('[data-testid=proof-screenshot]', 'tests/fixtures/screenshot.jpg')
    await page.click('[data-testid=submit-engagement]')
    
    // Check success message
    await expect(page.locator('[data-testid=success-toast]')).toContainText('Engagement submitted')
    
    // Verify points were awarded
    const pointsDisplay = page.locator('[data-testid=points-display]')
    await expect(pointsDisplay).toContainText(/\d+/)
  })

  test('user can filter engagements', async ({ page }) => {
    await page.goto('/engagement')
    
    // Apply platform filter
    await page.selectOption('[data-testid=platform-filter]', 'instagram')
    
    // Verify filtered results
    const engagementCards = page.locator('[data-testid=engagement-card]')
    await expect(engagementCards.first()).toContainText('Instagram')
    
    // Apply status filter
    await page.selectOption('[data-testid=status-filter]', 'completed')
    
    // Verify status filter works
    await expect(engagementCards.first()).toContainText('Completed')
  })
})
```

#### Social Account Integration
```typescript
// tests/e2e/social-accounts.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Social Account Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login')
    await page.fill('[data-testid=email-input]', 'test@example.com')
    await page.fill('[data-testid=password-input]', 'password')
    await page.click('[data-testid=login-button]')
  })

  test('user can view social accounts', async ({ page }) => {
    await page.goto('/accounts')
    
    // Check page loads correctly
    await expect(page.locator('h1')).toContainText('Social Accounts')
    
    // Verify platform cards are visible
    const platformCards = page.locator('[data-testid=platform-card]')
    await expect(platformCards).toHaveCount(6) // Instagram, Twitter, etc.
  })

  test('user can connect social account', async ({ page, context }) => {
    await page.goto('/accounts')
    
    // Click connect button for Instagram
    const instagramCard = page.locator('[data-testid=platform-card-instagram]')
    await instagramCard.locator('text=Connect Account').click()
    
    // This would typically open OAuth flow
    // For testing, we mock the response
    await expect(page.locator('[data-testid=oauth-redirect]')).toBeVisible()
  })

  test('connected account shows correct information', async ({ page }) => {
    // Assuming user has connected Instagram account
    await page.goto('/accounts')
    
    const connectedCard = page.locator('[data-testid=connected-account-instagram]')
    await expect(connectedCard).toContainText('@testuser')
    await expect(connectedCard).toContainText('Connected')
    await expect(connectedCard.locator('[data-testid=followers-count]')).toContainText(/\d+/)
  })
})
```

## 🔍 Visual Testing

### Visual Regression Tests
```typescript
// tests/e2e/visual.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test('landing page looks correct', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveScreenshot('landing-page.png')
  })

  test('dashboard layout is correct', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('[data-testid=email-input]', 'test@example.com')
    await page.fill('[data-testid=password-input]', 'password')
    await page.click('[data-testid=login-button]')
    
    // Take screenshot of dashboard
    await expect(page).toHaveScreenshot('dashboard.png')
  })

  test('engagement cards display correctly', async ({ page }) => {
    await page.goto('/engagement')
    
    // Wait for content to load
    await page.waitForSelector('[data-testid=engagement-card]')
    
    // Screenshot specific component
    const engagementCard = page.locator('[data-testid=engagement-card]').first()
    await expect(engagementCard).toHaveScreenshot('engagement-card.png')
  })
})
```

## 📊 Performance Testing

### Lighthouse CI
Create `.lighthouserc.js`:
```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173'],
      startServerCommand: 'npm run dev',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

### Load Testing with Playwright
```typescript
// tests/e2e/performance.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Performance Tests', () => {
  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime
    
    expect(loadTime).toBeLessThan(3000) // 3 seconds
  })

  test('dashboard renders efficiently', async ({ page }) => {
    // Login
    await page.goto('/login')
    await page.fill('[data-testid=email-input]', 'test@example.com')
    await page.fill('[data-testid=password-input]', 'password')
    
    const startTime = Date.now()
    await page.click('[data-testid=login-button]')
    await page.waitForURL('/dashboard')
    const renderTime = Date.now() - startTime
    
    expect(renderTime).toBeLessThan(2000) // 2 seconds
  })
})
```

## 🤖 Test Automation

### GitHub Actions Workflow
Create `.github/workflows/test.yml`:
```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun
```

## 📋 Testing Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest --coverage",
    "test:integration": "vitest --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:visual": "playwright test --config playwright.visual.config.ts",
    "test:performance": "lighthouse http://localhost:5173",
    "test:all": "npm run test:unit && npm run test:e2e",
    "test:ci": "npm run test:unit -- --reporter=junit && npm run test:e2e -- --reporter=junit"
  }
}
```

## 🚨 Test Quality Metrics

### Coverage Requirements
```javascript
// vitest.config.ts coverage thresholds
coverage: {
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Specific file requirements
    'src/components/': {
      branches: 90,
      functions: 90,
    },
    'src/lib/': {
      branches: 85,
      functions: 85,
    },
  },
}
```

### Quality Gates
- All tests must pass before merge
- Coverage must meet minimum thresholds
- No high-severity accessibility issues
- Performance budgets must be met
- Visual regression tests must pass

---

Next: [API Documentation](api.md) →
