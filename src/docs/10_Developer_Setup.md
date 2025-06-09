
# Developer Setup

## Prerequisites

Before setting up the RoundAbout development environment, ensure you have the following installed:

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** - Version control system
- **VS Code** - Recommended IDE with extensions

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "supabase.supabase",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag"
  ]
}
```

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/roundabout.git
cd roundabout
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create environment files for different stages:

#### `.env.local` (Development)
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Stripe Configuration (Test Mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-test-key

# Development URLs
VITE_APP_URL=http://localhost:5173
```

#### `.env.staging` (Staging)
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-staging-anon-key

# Stripe Configuration (Test Mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-test-key

# Staging URLs
VITE_APP_URL=https://staging.roundabout.app
```

#### `.env.production` (Production)
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-prod-anon-key

# Stripe Configuration (Live Mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-live-key

# Production URLs
VITE_APP_URL=https://app.roundabout.com
```

### 4. Supabase Setup

#### Install Supabase CLI
```bash
npm install -g supabase
```

#### Initialize Supabase
```bash
supabase init
supabase login
supabase link --project-ref your-project-ref
```

#### Run Database Migrations
```bash
supabase db reset
```

#### Start Local Development
```bash
supabase start
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Development Workflow

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature description"

# Push to remote
git push origin feature/your-feature-name

# Create pull request on GitHub
```

### Commit Message Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new engagement tracking feature
fix: resolve authentication token refresh issue
docs: update API documentation
style: format components with prettier
refactor: reorganize authentication context
test: add unit tests for payment processing
chore: update dependencies
```

### Branch Naming Convention
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

## Code Standards

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### ESLint Configuration
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## Component Development

### Component Structure
```typescript
// Component template
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({ 
  className,
  children 
}) => {
  return (
    <div className={cn('default-classes', className)}>
      {children}
    </div>
  );
};
```

### Custom Hooks Pattern
```typescript
// Custom hook template
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useCustomHook(param: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Implementation
  }, [param]);

  return { data, loading, error };
}
```

### API Integration Pattern
```typescript
// API service template
import { supabase } from '@/lib/supabase';

export class ApiService {
  static async getData(id: string) {
    try {
      const { data, error } = await supabase
        .from('table')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
```

## Testing Setup

### Install Testing Dependencies
```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom
```

### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

### Test Utilities
```typescript
// src/test/utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Example Test
```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@/test/utils';
import { Button } from '../ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Database Development

### Local Database Setup
```bash
# Start local Supabase
supabase start

# Create new migration
supabase migration new your_migration_name

# Apply migrations
supabase db reset

# Generate types
supabase gen types typescript --local > src/types/database.ts
```

### Migration Example
```sql
-- supabase/migrations/001_create_table.sql
CREATE TABLE public.example_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.example_table ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view own records" ON public.example_table
  FOR SELECT USING (auth.uid() = user_id);
```

### Edge Function Development
```bash
# Create new edge function
supabase functions new function-name

# Serve functions locally
supabase functions serve

# Deploy function
supabase functions deploy function-name
```

## Debugging

### React Developer Tools
Install browser extensions:
- React Developer Tools
- React Query DevTools

### VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug App",
      "program": "${workspaceFolder}/node_modules/.bin/vite",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Network Debugging
```typescript
// Add request interceptor for debugging
const supabase = createClient(url, key, {
  global: {
    fetch: (url, options = {}) => {
      console.log('Request:', url, options);
      return fetch(url, options);
    }
  }
});
```

## Performance Optimization

### Bundle Analysis
```bash
npm run build -- --analyze
```

### Code Splitting
```typescript
// Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

### Image Optimization
```typescript
// Optimize images
const optimizedImage = {
  src: 'image.jpg',
  srcSet: 'image-400.jpg 400w, image-800.jpg 800w',
  sizes: '(max-width: 400px) 400px, 800px'
};
```

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Environment-specific Builds
```bash
# Staging
npm run build:staging

# Production
npm run build:production
```

## Troubleshooting

### Common Issues

#### Module Resolution Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

#### Supabase Connection Issues
```bash
# Check local Supabase status
supabase status

# Restart Supabase
supabase stop
supabase start
```

#### Build Errors
```bash
# Check for unused imports
npm run lint

# Fix formatting
npm run format
```

### Getting Help
- Check existing GitHub issues
- Review documentation
- Ask in team Discord/Slack
- Create detailed bug reports

## Additional Resources

### Documentation Links
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

### Learning Resources
- [React Query Tutorial](https://tanstack.com/query/latest)
- [Supabase Auth Tutorial](https://supabase.com/docs/guides/auth)
- [TypeScript in React](https://react-typescript-cheatsheet.netlify.app/)

### Tools and Extensions
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Supabase CLI](https://supabase.com/docs/reference/cli)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
