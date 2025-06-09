
# Testing Strategy

## Overview

RoundAbout employs a comprehensive testing strategy to ensure code quality, reliability, and user satisfaction. Our approach covers unit testing, integration testing, end-to-end testing, and performance testing across the entire application stack.

## Testing Philosophy

### Core Principles
- **Test-Driven Development (TDD)**: Write tests before implementing features when possible
- **Pyramid Testing**: Focus on unit tests, with fewer integration and E2E tests
- **User-Centric Testing**: Test from the user's perspective and workflows
- **Continuous Testing**: Integrate testing into the CI/CD pipeline
- **Quality Gates**: Block deployments if critical tests fail

### Testing Metrics
- **Code Coverage**: Minimum 80% for critical components
- **Test Reliability**: Maximum 5% flaky test rate
- **Performance**: Test execution under 10 minutes for full suite
- **Accessibility**: WCAG 2.1 AA compliance verification

## Testing Stack

### Frontend Testing
- **Framework**: Vitest (unit and integration tests)
- **React Testing**: React Testing Library
- **E2E Testing**: Playwright
- **Visual Testing**: Chromatic (Storybook integration)
- **Performance**: Lighthouse CI

### Backend Testing
- **Unit Tests**: Deno's built-in test runner
- **API Testing**: Supertest equivalent for Supabase Edge Functions
- **Database Testing**: Supabase test instances

### Tools and Libraries
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "playwright": "^1.40.0",
    "msw": "^2.0.0",
    "@storybook/addon-a11y": "^7.0.0"
  }
}
```

## Test Types and Implementation

### Unit Tests

#### Component Testing
```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@/test/utils';
import { Button } from '../ui/button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies loading state correctly', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByText('Loading')).toBeDisabled();
  });

  it('supports different variants', () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    expect(container.firstChild).toHaveClass('border');
  });
});
```

#### Hook Testing
```typescript
// src/hooks/__tests__/useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { AuthProvider } from '@/contexts/AuthContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth Hook', () => {
  it('should initialize with null user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
  });

  it('should handle sign in', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.signIn('test@example.com', 'password');
    });
    
    expect(result.current.user).toBeTruthy();
  });

  it('should handle sign out', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // First sign in
    await act(async () => {
      await result.current.signIn('test@example.com', 'password');
    });
    
    // Then sign out
    await act(async () => {
      await result.current.signOut();
    });
    
    expect(result.current.user).toBeNull();
  });
});
```

#### Utility Function Testing
```typescript
// src/lib/__tests__/utils.test.ts
import { formatCurrency, calculateEngagementRate } from '../utils';

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });

    it('handles zero values', () => {
      expect(formatCurrency(0, 'USD')).toBe('$0.00');
    });

    it('handles negative values', () => {
      expect(formatCurrency(-100, 'USD')).toBe('-$100.00');
    });
  });

  describe('calculateEngagementRate', () => {
    it('calculates rate correctly', () => {
      expect(calculateEngagementRate(100, 1000)).toBe(10);
    });

    it('handles zero followers', () => {
      expect(calculateEngagementRate(100, 0)).toBe(0);
    });

    it('returns percentage format', () => {
      expect(calculateEngagementRate(50, 500)).toBe(10);
    });
  });
});
```

### Integration Tests

#### API Integration
```typescript
// src/lib/__tests__/api.integration.test.ts
import { supabase } from '@/lib/supabase';
import { createTestUser, cleanupTestData } from '@/test/helpers';

describe('API Integration', () => {
  let testUser: any;

  beforeAll(async () => {
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await cleanupTestData(testUser.id);
  });

  it('should create and retrieve user profile', async () => {
    const profileData = {
      user_id: testUser.id,
      first_name: 'Test',
      last_name: 'User',
      points: 0
    };

    const { data: created } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single();

    expect(created).toMatchObject(profileData);

    const { data: retrieved } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', testUser.id)
      .single();

    expect(retrieved).toMatchObject(profileData);
  });

  it('should handle engagement creation', async () => {
    const engagementData = {
      user_id: testUser.id,
      platform: 'instagram',
      content_url: 'https://instagram.com/p/test',
      points_value: 10,
      status: 'pending'
    };

    const { data } = await supabase
      .from('engagements')
      .insert(engagementData)
      .select()
      .single();

    expect(data).toMatchObject(engagementData);
    expect(data.id).toBeDefined();
    expect(data.submitted_at).toBeDefined();
  });
});
```

#### Component Integration
```typescript
// src/pages/__tests__/Dashboard.integration.test.tsx
import { render, screen, waitFor } from '@/test/utils';
import { Dashboard } from '../Dashboard';
import { server } from '@/test/mocks/server';
import { rest } from 'msw';

describe('Dashboard Integration', () => {
  it('loads and displays user data', async () => {
    server.use(
      rest.get('/rest/v1/profiles', (req, res, ctx) => {
        return res(ctx.json([{
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          points: 150
        }]));
      }),
      rest.get('/rest/v1/engagements', (req, res, ctx) => {
        return res(ctx.json([{
          id: '1',
          platform: 'instagram',
          points_value: 20,
          status: 'verified'
        }]));
      })
    );

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Welcome back, John!')).toBeInTheDocument();
    });

    expect(screen.getByText('150')).toBeInTheDocument(); // Points display
  });

  it('handles loading states', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('handles error states', async () => {
    server.use(
      rest.get('/rest/v1/profiles', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

### End-to-End Tests

#### User Authentication Flow
```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can sign up and sign in', async ({ page }) => {
    // Go to signup page
    await page.goto('/auth');
    await page.click('[data-testid="signup-tab"]');

    // Fill signup form
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="confirm-password-input"]', 'password123');
    
    // Submit form
    await page.click('[data-testid="signup-button"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('user can sign out', async ({ page }) => {
    // Assume user is already logged in
    await page.goto('/dashboard');
    
    // Click user menu
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="sign-out-button"]');

    // Should redirect to home page
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="sign-in-button"]')).toBeVisible();
  });
});
```

#### Engagement Workflow
```typescript
// tests/e2e/engagement.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Engagement Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test user
    await page.goto('/auth');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="signin-button"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('user can view and engage with opportunities', async ({ page }) => {
    // Navigate to engagement page
    await page.click('[data-testid="engagement-nav"]');
    await expect(page).toHaveURL('/engagement');

    // Check opportunities are displayed
    await expect(page.locator('[data-testid="opportunity-card"]').first()).toBeVisible();

    // Click engage button
    await page.click('[data-testid="engage-button"]').first();

    // Should show engagement modal or redirect
    await expect(page.locator('[data-testid="engagement-modal"]')).toBeVisible();
  });

  test('user can filter opportunities', async ({ page }) => {
    await page.goto('/engagement');

    // Open filter menu
    await page.click('[data-testid="filter-button"]');

    // Select Instagram filter
    await page.check('[data-testid="filter-instagram"]');
    await page.click('[data-testid="apply-filters"]');

    // Should show only Instagram opportunities
    const opportunities = page.locator('[data-testid="opportunity-card"]');
    await expect(opportunities).toHaveCount(await opportunities.count());
    
    for (let i = 0; i < await opportunities.count(); i++) {
      await expect(opportunities.nth(i)).toContainText('Instagram');
    }
  });
});
```

### Performance Tests

#### Page Load Performance
```typescript
// tests/performance/page-load.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('dashboard loads within performance budget', async ({ page }) => {
    const start = Date.now();
    
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(3000); // 3 second budget

    // Check Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve(entries.map(entry => ({
            name: entry.name,
            value: entry.value
          })));
        }).observe({ entryTypes: ['navigation', 'paint'] });
      });
    });

    expect(metrics).toBeDefined();
  });
});
```

### Accessibility Tests

#### A11y Integration
```typescript
// src/components/__tests__/Button.a11y.test.tsx
import { render } from '@/test/utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../ui/button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support keyboard navigation', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    
    // Test Enter key
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
    
    // Test Space key
    fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
```

## Test Data Management

### Mock Data Strategy
```typescript
// src/test/mocks/data.ts
export const mockUser = {
  id: 'test-user-1',
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User',
  points: 150
};

export const mockEngagements = [
  {
    id: '1',
    user_id: 'test-user-1',
    platform: 'instagram',
    content_url: 'https://instagram.com/p/test',
    points_value: 20,
    status: 'verified',
    submitted_at: '2023-01-01T00:00:00Z'
  }
];

export const mockOpportunities = [
  {
    id: '1',
    username: 'creator1',
    platform: 'YouTube',
    contentType: 'Video',
    title: 'Test Video',
    points: 40,
    timeRequired: '5-7 min'
  }
];
```

### MSW Setup
```typescript
// src/test/mocks/handlers.ts
import { rest } from 'msw';
import { mockUser, mockEngagements } from './data';

export const handlers = [
  rest.get('/rest/v1/profiles', (req, res, ctx) => {
    return res(ctx.json([mockUser]));
  }),

  rest.get('/rest/v1/engagements', (req, res, ctx) => {
    return res(ctx.json(mockEngagements));
  }),

  rest.post('/rest/v1/engagements', (req, res, ctx) => {
    return res(ctx.json({ ...req.body, id: 'new-engagement' }));
  })
];

// src/test/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

## Test Configuration

### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/test/**',
        'src/**/*.stories.tsx'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### Test Setup
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Setup MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));
```

### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

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
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI
  }
});
```

## CI/CD Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Tests

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
      
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Test Maintenance

### Regular Test Reviews
- **Weekly**: Review failing tests and flaky test reports
- **Monthly**: Update test data and mock responses
- **Quarterly**: Review test coverage and identify gaps
- **Before Releases**: Full test suite validation

### Performance Monitoring
- Track test execution time trends
- Identify and optimize slow tests
- Monitor flaky test patterns
- Maintain test reliability metrics

### Documentation Updates
- Keep test documentation current with code changes
- Update test data when API contracts change
- Maintain testing guidelines and best practices
- Share testing knowledge across the team

This comprehensive testing strategy ensures that RoundAbout maintains high quality standards while enabling rapid development and deployment cycles.
