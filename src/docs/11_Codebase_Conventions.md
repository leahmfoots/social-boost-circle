
# Codebase Conventions

## Overview

This document outlines the coding standards, naming conventions, and organizational principles that govern the RoundAbout codebase. Consistent adherence to these conventions ensures maintainable, readable, and scalable code.

## File Organization

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base components (shadcn/ui)
│   ├── auth/           # Authentication components
│   ├── payment/        # Payment-related components
│   ├── social/         # Social media components
│   └── ...             # Feature-specific components
├── pages/              # Route-level page components
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── lib/                # Utility libraries and configurations
├── types/              # TypeScript type definitions
└── docs/               # Project documentation
```

### File Naming Conventions

#### Components
- **PascalCase** for component files: `UserProfile.tsx`
- **PascalCase** for component names: `const UserProfile = () => {}`
- **camelCase** for component props: `isLoading`, `userData`

#### Pages
- **PascalCase** for page files: `Dashboard.tsx`, `Settings.tsx`
- Default export with component name matching file name

#### Hooks
- **camelCase** starting with "use": `useAuth.ts`, `useLocalStorage.ts`
- Export function name matches file name

#### Types
- **PascalCase** for interfaces: `User`, `EngagementData`
- **camelCase** for type files: `engagement.ts`, `rewards.ts`

#### Utilities
- **camelCase** for utility files: `formatDate.ts`, `apiHelpers.ts`
- **camelCase** for function names: `formatCurrency`, `validateEmail`

## TypeScript Conventions

### Interface Definitions
```typescript
// Use PascalCase for interface names
interface UserProfile {
  id: string;
  email: string;
  firstName: string;  // camelCase for properties
  lastName: string;
  createdAt: Date;
}

// Use descriptive property names
interface EngagementMetrics {
  totalEngagements: number;
  averageEngagementRate: number;
  topPerformingPlatform: string;
}
```

### Type Exports
```typescript
// Export types from dedicated type files
export type { User, UserProfile } from './user';
export type { Engagement, EngagementStatus } from './engagement';
```

### Generic Types
```typescript
// Use descriptive generic type parameters
interface ApiResponse<TData> {
  data: TData;
  success: boolean;
  message?: string;
}

// Use constraints when appropriate
interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T>;
  create(entity: Omit<T, 'id'>): Promise<T>;
}
```

## Component Conventions

### Component Structure
```typescript
// 1. Imports (React, then third-party, then internal)
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

// 2. Interface definitions
interface ComponentProps {
  title: string;
  isLoading?: boolean;
  onSubmit?: (data: FormData) => void;
}

// 3. Component definition
export const Component: React.FC<ComponentProps> = ({
  title,
  isLoading = false,
  onSubmit
}) => {
  // 4. Hooks and state
  const [data, setData] = useState(null);
  const { user } = useAuth();

  // 5. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // 6. Event handlers
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.(formData);
  };

  // 7. Render logic
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};
```

### Props Interface Conventions
```typescript
// Use descriptive prop names
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  onClick?: () => void;
}

// Use optional props with default values
interface CardProps {
  title: string;
  description?: string;
  showBorder?: boolean;
  className?: string;
}
```

## Styling Conventions

### Tailwind CSS Guidelines
```typescript
// Use semantic class ordering
<div className="
  // Layout
  flex flex-col items-center justify-between
  // Spacing
  p-4 m-2 gap-4
  // Sizing
  w-full h-auto min-h-screen
  // Typography
  text-lg font-semibold text-gray-800
  // Colors
  bg-white border border-gray-200
  // Effects
  shadow-lg rounded-lg hover:shadow-xl
  // Responsive
  sm:p-6 md:p-8 lg:flex-row
">
```

### Custom CSS Classes
```css
/* Use BEM methodology for custom styles */
.engagement-card {
  /* Base styles */
}

.engagement-card__header {
  /* Element styles */
}

.engagement-card--featured {
  /* Modifier styles */
}
```

## State Management Conventions

### React State
```typescript
// Use descriptive state variable names
const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState<string[]>([]);

// Group related state
const [formData, setFormData] = useState({
  email: '',
  password: '',
  confirmPassword: ''
});
```

### Context Usage
```typescript
// Create descriptive context names
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Use custom hooks for context consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## API Conventions

### Function Naming
```typescript
// Use consistent verb patterns
export const getUser = (id: string) => { /* ... */ };
export const createUser = (userData: CreateUserData) => { /* ... */ };
export const updateUser = (id: string, updates: Partial<User>) => { /* ... */ };
export const deleteUser = (id: string) => { /* ... */ };

// Use descriptive names for complex operations
export const calculateEngagementRate = (metrics: EngagementMetrics) => { /* ... */ };
export const validateUserPermissions = (user: User, action: string) => { /* ... */ };
```

### Error Handling
```typescript
// Use consistent error handling patterns
try {
  const result = await apiCall();
  return { data: result, error: null };
} catch (error) {
  console.error('API call failed:', error);
  return { data: null, error: error.message };
}

// Create custom error types
class ValidationError extends Error {
  constructor(field: string, message: string) {
    super(`Validation failed for ${field}: ${message}`);
    this.name = 'ValidationError';
  }
}
```

## Comment Conventions

### Component Comments
```typescript
/**
 * UserProfile component displays user information and engagement statistics.
 * 
 * @param user - The user object containing profile information
 * @param showStats - Whether to display engagement statistics
 */
export const UserProfile: React.FC<UserProfileProps> = ({ user, showStats }) => {
  // Component implementation
};
```

### Function Comments
```typescript
/**
 * Calculates the engagement rate based on total interactions and followers.
 * 
 * @param interactions - Total number of interactions (likes, comments, shares)
 * @param followers - Total number of followers
 * @returns The engagement rate as a percentage
 */
export const calculateEngagementRate = (interactions: number, followers: number): number => {
  if (followers === 0) return 0;
  return (interactions / followers) * 100;
};
```

### Inline Comments
```typescript
// TODO: Implement caching for better performance
const fetchUserData = async (userId: string) => {
  // FIXME: Handle network timeout errors
  const response = await api.get(`/users/${userId}`);
  
  // NOTE: This transformation is required for legacy API compatibility
  return transformLegacyUserData(response.data);
};
```

## Import/Export Conventions

### Import Organization
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party library imports
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

// 3. Internal imports (components, hooks, utils)
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/lib/utils';

// 4. Type imports (at the end)
import type { User, EngagementData } from '@/types';
```

### Export Patterns
```typescript
// Named exports for utilities and hooks
export const formatCurrency = (amount: number) => { /* ... */ };
export const useLocalStorage = (key: string) => { /* ... */ };

// Default exports for components and pages
const Dashboard = () => { /* ... */ };
export default Dashboard;

// Re-exports for barrel files
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
```

## Testing Conventions

### Test File Naming
```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── hooks/
│   ├── useAuth.ts
│   └── __tests__/
│       └── useAuth.test.ts
```

### Test Structure
```typescript
describe('UserProfile Component', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should render user information correctly', () => {
    // Test implementation
  });

  it('should handle loading state', () => {
    // Test implementation
  });

  describe('when user has premium subscription', () => {
    it('should display premium badge', () => {
      // Test implementation
    });
  });
});
```

## Error Boundaries and Logging

### Error Boundary Implementation
```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

### Logging Conventions
```typescript
// Use consistent log levels
console.info('User authenticated successfully', { userId: user.id });
console.warn('API rate limit approaching', { remaining: limits.remaining });
console.error('Payment processing failed', { error: error.message, userId });

// Avoid logging sensitive information
console.log('Processing payment', { 
  amount: payment.amount,
  currency: payment.currency,
  // DON'T LOG: payment.cardNumber, payment.cvv
});
```

## Performance Conventions

### React Performance
```typescript
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo<ComponentProps>(({ data }) => {
  return <div>{/* Expensive rendering logic */}</div>;
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateComplexMetrics(data);
}, [data]);

// Use useCallback for event handlers passed to children
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);
```

### Bundle Size Optimization
```typescript
// Use dynamic imports for large dependencies
const ChartComponent = lazy(() => import('./ChartComponent'));

// Import only what you need from libraries
import { debounce } from 'lodash/debounce';
// Instead of: import _ from 'lodash';
```

## Security Conventions

### Input Validation
```typescript
// Validate all user inputs
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize data before display
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};
```

### Environment Variables
```typescript
// Use environment variables for configuration
const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  stripeKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  // Never expose private keys in frontend code
};
```

## Code Review Guidelines

### Review Checklist
- [ ] Code follows naming conventions
- [ ] Components are properly typed
- [ ] Error handling is implemented
- [ ] Performance considerations are addressed
- [ ] Security best practices are followed
- [ ] Tests are included for new functionality
- [ ] Documentation is updated as needed

### Review Comments
```typescript
// Good: Specific and constructive
// Consider using useMemo here to prevent recalculation on every render

// Good: Explains the reasoning
// This could cause a memory leak. Consider using useCallback to stabilize the reference

// Avoid: Vague or unhelpful
// This is wrong
// Fix this
```

## Accessibility Conventions

### ARIA Implementation
```typescript
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
  onClick={handleClose}
>
  <X className="h-4 w-4" />
</button>
```

### Keyboard Navigation
```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      handleActivate();
      break;
    case 'Escape':
      handleClose();
      break;
  }
};
```

Following these conventions ensures that the RoundAbout codebase remains maintainable, scalable, and accessible as the project grows.
