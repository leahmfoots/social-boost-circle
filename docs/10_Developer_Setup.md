
# Developer Setup Guide
## RoundAbout Creator Platform

### 🚀 Quick Start

#### Prerequisites
```bash
# Required software versions
Node.js: >= 18.0.0
npm: >= 8.0.0
Git: >= 2.30.0

# Recommended development tools
Visual Studio Code
Chrome DevTools
Postman (for API testing)
```

#### Environment Setup
```bash
# Clone the repository
git clone https://github.com/your-org/roundabout-platform.git
cd roundabout-platform

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### 🔧 Development Environment Configuration

#### Environment Variables
```bash
# .env.local configuration
VITE_SUPABASE_URL=https://wghcoxcxybumcfetcmev.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
VITE_APP_URL=http://localhost:5173

# Development flags
VITE_ENV=development
VITE_DEBUG=true
VITE_LOG_LEVEL=debug
```

#### Supabase Configuration
```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Login to Supabase
supabase login

# Link to existing project
supabase link --project-ref wghcoxcxybumcfetcmev

# Start local development (optional)
supabase start

# Generate TypeScript types
supabase gen types typescript --project-id wghcoxcxybumcfetcmev > src/integrations/supabase/types.ts
```

### 📁 Project Structure

#### Directory Overview
```
roundabout-platform/
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # Shadcn/UI components
│   │   ├── auth/            # Authentication components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── community/       # Community features
│   │   ├── analytics/       # Charts and metrics
│   │   ├── engagement/      # Engagement tracking
│   │   ├── messaging/       # Communication
│   │   ├── payment/         # Stripe integration
│   │   └── layout/          # Layout components
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Route components
│   ├── types/               # TypeScript definitions
│   └── integrations/        # External service integrations
│       └── supabase/        # Supabase client and types
├── supabase/
│   ├── functions/           # Edge functions
│   ├── migrations/          # Database migrations
│   └── config.toml          # Supabase configuration
├── docs/                    # Documentation
├── public/                  # Static assets
└── tests/                   # Test files
```

#### Key Configuration Files
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})

// tailwind.config.ts
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more theme configuration
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 🛠️ Development Tools

#### VS Code Configuration
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}

// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### ESLint Configuration
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react", "react-hooks"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

#### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 🗄️ Database Development

#### Local Database Setup
```bash
# Start local Supabase (includes PostgreSQL)
supabase start

# Apply migrations
supabase db reset

# Create new migration
supabase migration new add_new_feature

# Generate TypeScript types after schema changes
supabase gen types typescript --local > src/integrations/supabase/types.ts
```

#### Database Migration Example
```sql
-- supabase/migrations/20240116_add_user_preferences.sql
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  theme VARCHAR DEFAULT 'system',
  language VARCHAR DEFAULT 'en',
  timezone VARCHAR DEFAULT 'UTC',
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own preferences" 
  ON public.user_preferences FOR ALL 
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);
```

#### Seeding Development Data
```sql
-- supabase/seed.sql
INSERT INTO public.profiles (id, username, full_name, bio) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'creator_1', 'John Creator', 'Travel and lifestyle content creator'),
  ('550e8400-e29b-41d4-a716-446655440002', 'creator_2', 'Jane Influencer', 'Tech reviews and tutorials'),
  ('550e8400-e29b-41d4-a716-446655440003', 'creator_3', 'Mike Blogger', 'Food and cooking enthusiast');

INSERT INTO public.groups (id, name, description, creator_id, is_public) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'YouTube Creators', 'Community for YouTube content creators', '550e8400-e29b-41d4-a716-446655440001', true),
  ('660e8400-e29b-41d4-a716-446655440002', 'Instagram Influencers', 'Tips and tricks for Instagram growth', '550e8400-e29b-41d4-a716-446655440002', true);
```

### 🔄 Development Workflow

#### Git Workflow
```bash
# Feature development workflow
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/new-analytics-dashboard

# Make changes and commit
git add .
git commit -m "feat: add advanced analytics dashboard with user engagement metrics"

# Push and create PR
git push origin feature/new-analytics-dashboard

# After PR approval and merge
git checkout main
git pull origin main
git branch -d feature/new-analytics-dashboard
```

#### Commit Message Convention
```bash
# Commit message format
<type>(<scope>): <description>

# Types
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting)
refactor: Code refactoring
test: Adding or updating tests
chore: Build process or auxiliary tool changes

# Examples
feat(auth): add social login with Google OAuth
fix(dashboard): resolve chart rendering issue on mobile
docs(api): update endpoint documentation
refactor(components): simplify button component props
```

### 🧪 Testing Setup

#### Testing Dependencies
```json
// package.json testing dependencies
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "vitest": "^0.28.5",
    "jsdom": "^21.1.0",
    "msw": "^1.0.1"
  }
}
```

#### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

// src/test/setup.ts
import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

#### Example Test
```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../ui/button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })
})
```

### 🚀 Build & Deployment

#### Build Commands
```json
// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint src/ --ext .ts,.tsx",
    "lint:fix": "eslint src/ --ext .ts,.tsx --fix",
    "format": "prettier --write src/",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  }
}
```

#### Pre-commit Hooks
```json
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test:coverage
```

#### Production Build
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Check build size
npm run build -- --analyze
```

### 🔍 Debugging

#### Browser DevTools
```typescript
// Debug utilities
const debug = {
  log: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.log(`[DEBUG] ${message}`, data)
    }
  },
  
  error: (message: string, error?: any) => {
    if (import.meta.env.DEV) {
      console.error(`[ERROR] ${message}`, error)
    }
  },
  
  performance: (label: string, fn: () => void) => {
    if (import.meta.env.DEV) {
      console.time(label)
      fn()
      console.timeEnd(label)
    }
  }
}

// React DevTools integration
if (import.meta.env.DEV) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {}
}
```

#### Supabase Debugging
```typescript
// Enable Supabase debugging
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      debug: import.meta.env.DEV,
    },
    global: {
      headers: {
        'X-Client-Info': 'roundabout-web@1.0.0',
      },
    },
  }
)

// Log all Supabase operations in development
if (import.meta.env.DEV) {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state change:', event, session?.user?.email)
  })
}
```

### 📚 Additional Resources

#### Documentation Links
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

#### Community Resources
- [RoundAbout Developer Discord](https://discord.gg/roundabout-dev)
- [GitHub Discussions](https://github.com/your-org/roundabout-platform/discussions)
- [Stack Overflow Tag: roundabout-platform](https://stackoverflow.com/questions/tagged/roundabout-platform)

#### Troubleshooting
```bash
# Common issues and solutions

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# Reset local database
supabase db reset

# Regenerate types after schema changes
supabase gen types typescript --local > src/integrations/supabase/types.ts

# Check for TypeScript errors
npm run type-check

# Fix linting issues
npm run lint:fix
```

This developer setup guide provides everything needed to get started with RoundAbout platform development.
