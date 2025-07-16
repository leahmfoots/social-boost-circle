
# Design System Documentation
## RoundAbout Creator Platform

### 🎨 Visual Identity

#### Brand Colors
```css
/* Primary Colors */
--primary: 222.2 84% 4.9%      /* Near Black */
--primary-foreground: 210 40% 98%

/* Secondary Colors */  
--secondary: 210 40% 96%       /* Light Gray */
--secondary-foreground: 222.2 84% 4.9%

/* Accent Colors */
--accent: 210 40% 96%          /* Blue Accent */
--accent-foreground: 222.2 84% 4.9%

/* Status Colors */
--destructive: 0 84.2% 60.2%   /* Red for errors */
--destructive-foreground: 210 40% 98%

/* Border & Background */
--border: 214.3 31.8% 91.4%    /* Light border */
--background: 0 0% 100%        /* White background */
--foreground: 222.2 84% 4.9%   /* Dark text */
```

#### Typography Scale
```css
/* Heading Styles */
h1: 2.25rem (36px) - font-bold
h2: 1.875rem (30px) - font-semibold  
h3: 1.5rem (24px) - font-semibold
h4: 1.25rem (20px) - font-medium
h5: 1.125rem (18px) - font-medium
h6: 1rem (16px) - font-medium

/* Body Text */
body: 0.875rem (14px) - font-normal
small: 0.75rem (12px) - font-normal
```

#### Spacing System
```css
/* Spacing Scale (Tailwind) */
xs: 0.25rem (4px)
sm: 0.5rem (8px)  
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 2.5rem (40px)
3xl: 3rem (48px)
```

### 🧱 Component Library

#### Button Components
```typescript
// Primary Button
<Button variant="default" size="default">
  Primary Action
</Button>

// Secondary Button  
<Button variant="outline" size="default">
  Secondary Action
</Button>

// Destructive Button
<Button variant="destructive" size="default">
  Delete Action
</Button>

// Sizes: sm, default, lg, icon
// Variants: default, destructive, outline, secondary, ghost, link
```

#### Card Components
```typescript
// Standard Card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Form Components
```typescript
// Input Field
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>

// Select Dropdown
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### 📐 Layout System

#### Grid System
```css
/* Container Widths */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Grid Classes */
.grid-cols-1   /* 1 column */
.grid-cols-2   /* 2 columns */
.grid-cols-3   /* 3 columns */
.grid-cols-4   /* 4 columns */
.grid-cols-12  /* 12 column grid */

/* Responsive Breakpoints */
sm: 640px
md: 768px  
lg: 1024px
xl: 1280px
2xl: 1536px
```

#### Layout Components
```typescript
// Dashboard Layout
<DashboardLayout title="Page Title">
  <div className="space-y-6">
    {children}
  </div>
</DashboardLayout>

// Page Container
<div className="container mx-auto px-4 py-6">
  <div className="space-y-6">
    {content}
  </div>
</div>
```

### 🎭 Theme System

#### Dark Mode Support
```typescript
// Theme Provider Setup
<ThemeProvider defaultTheme="light" storageKey="roundabout-theme">
  <App />
</ThemeProvider>

// Theme Toggle Component
<ThemeToggle />

// Using Theme Classes
<div className="bg-background text-foreground">
  <div className="border border-border">
    Content adapts to theme
  </div>
</div>
```

#### CSS Variables (Dark Mode)
```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 84% 4.9%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
}
```

### 🎯 Interactive States

#### Hover States
```css
/* Button Hover */
.hover:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* Card Hover */
.card:hover {
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
```

#### Focus States
```css
/* Focus Ring */
.focus-visible:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

#### Loading States
```typescript
// Loading Button
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>

// Loading Skeleton
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

### 📱 Responsive Design

#### Mobile-First Approach
```css
/* Base (Mobile) Styles */
.responsive-grid {
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

#### Navigation Patterns
```typescript
// Desktop Navigation
<nav className="hidden md:flex space-x-8">
  <NavLink to="/dashboard">Dashboard</NavLink>
  <NavLink to="/engagement">Engagement</NavLink>
</nav>

// Mobile Navigation
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <nav className="flex flex-col space-y-4">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/engagement">Engagement</NavLink>
    </nav>
  </SheetContent>
</Sheet>
```

### 🔤 Icon System

#### Lucide React Icons
```typescript
// Common Icons Used
import {
  User, Settings, Bell, Search, Plus,
  Home, BarChart3, Users, Gift, MessageSquare,
  Crown, Zap, TrendingUp, Activity
} from "lucide-react"

// Usage Pattern
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>
```

### 🎨 Animation System

#### Transition Classes
```css
/* Standard Transitions */
.transition-all { transition: all 0.2s ease; }
.transition-colors { transition: color 0.2s ease; }
.transition-transform { transition: transform 0.2s ease; }

/* Animation Classes */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
```

### 📊 Data Visualization

#### Chart Components
```typescript
// Using Recharts
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line 
      type="monotone" 
      dataKey="engagement" 
      stroke="hsl(var(--primary))" 
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
```

### ♿ Accessibility

#### ARIA Labels and Roles
```typescript
// Proper ARIA Implementation
<button 
  aria-label="Close modal"
  aria-pressed={isPressed}
  role="button"
>
  <X className="h-4 w-4" />
</button>

// Form Labels
<Label htmlFor="email" className="sr-only">
  Email Address
</Label>
<Input 
  id="email"
  type="email" 
  placeholder="Enter your email"
  aria-describedby="email-help"
/>
```

#### Keyboard Navigation
```css
/* Focus Management */
.focus-within:focus-within {
  ring-width: 2px;
  ring-color: hsl(var(--ring));
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: white;
  color: black;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
}

.skip-link:focus {
  top: 6px;
}
```

### 🎯 Design Tokens

#### Semantic Color Tokens
```typescript
// Usage in Components
const semanticColors = {
  success: 'hsl(142 76% 36%)',
  warning: 'hsl(38 92% 50%)', 
  error: 'hsl(0 84% 60%)',
  info: 'hsl(199 89% 48%)'
}

// Implementation
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong</AlertDescription>
</Alert>
```

This design system ensures consistency, accessibility, and scalability across the entire RoundAbout platform.
