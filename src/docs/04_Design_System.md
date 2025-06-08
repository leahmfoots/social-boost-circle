
# Design System

## RoundAbout Visual Identity & Component Library

### Document Information
- **Version**: 1.4.0
- **Last Updated**: December 2023
- **Owner**: Design Team

---

## 1. Brand Identity

### 1.1 Brand Values
- **Innovation**: Cutting-edge technology for creators
- **Community**: Bringing creators together
- **Authenticity**: Genuine engagement and real connections
- **Growth**: Empowering creator success
- **Simplicity**: Intuitive and user-friendly experience

### 1.2 Visual Principles
- Clean and modern aesthetic
- Focus on readability and accessibility
- Consistent visual hierarchy
- Balanced use of color and whitespace
- Mobile-first responsive design

---

## 2. Color System

### 2.1 Primary Colors
```css
--primary: 246 80% 60%;           /* #6366f1 - Primary Blue */
--primary-foreground: 210 40% 98%; /* #f8fafc - Primary Text */
--secondary: 260 60% 55%;         /* #8b5cf6 - Secondary Purple */
--secondary-foreground: 210 40% 98%; /* #f8fafc - Secondary Text */
```

### 2.2 Neutral Colors
```css
--background: 0 0% 100%;          /* #ffffff - Background */
--foreground: 222.2 84% 4.9%;     /* #0f172a - Primary Text */
--muted: 210 40% 96.1%;           /* #f1f5f9 - Muted Background */
--muted-foreground: 215.4 16.3% 46.9%; /* #64748b - Muted Text */
--border: 214.3 31.8% 91.4%;      /* #e2e8f0 - Borders */
```

### 2.3 Semantic Colors
```css
--destructive: 0 84.2% 60.2%;     /* #ef4444 - Error Red */
--destructive-foreground: 210 40% 98%; /* #f8fafc - Error Text */
--accent: 262 80% 70%;            /* #a855f7 - Accent Purple */
--accent-foreground: 222.2 47.4% 11.2%; /* #1e293b - Accent Text */
```

### 2.4 Dark Mode Colors
```css
.dark {
  --background: 222.2 84% 4.9%;    /* #0f172a - Dark Background */
  --foreground: 210 40% 98%;       /* #f8fafc - Dark Text */
  --muted: 217.2 32.6% 17.5%;      /* #334155 - Dark Muted */
  --muted-foreground: 215 20.2% 65.1%; /* #94a3b8 - Dark Muted Text */
  --border: 217.2 32.6% 17.5%;     /* #334155 - Dark Borders */
}
```

### 2.5 Platform Colors
```css
--instagram: 315 100% 72%;        /* #e1306c - Instagram Pink */
--twitter: 203 89% 53%;           /* #1da1f2 - Twitter Blue */
--youtube: 0 100% 50%;            /* #ff0000 - YouTube Red */
--linkedin: 201 100% 35%;         /* #0077b5 - LinkedIn Blue */
--facebook: 221 44% 41%;          /* #4267B2 - Facebook Blue */
--tiktok: 0 0% 0%;                /* #000000 - TikTok Black */
```

---

## 3. Typography

### 3.1 Font Family
```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", 
             "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
```

### 3.2 Type Scale
```css
/* Headings */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }    /* 36px / 40px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }  /* 30px / 36px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }       /* 24px / 32px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }    /* 20px / 28px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }   /* 18px / 28px */

/* Body Text */
.text-base { font-size: 1rem; line-height: 1.5rem; }      /* 16px / 24px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }   /* 14px / 20px */
.text-xs { font-size: 0.75rem; line-height: 1rem; }       /* 12px / 16px */
```

### 3.3 Font Weights
```css
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

### 3.4 Typography Usage Guidelines

#### Headlines (H1-H6)
- Use bold or semibold weights
- Maintain proper hierarchy with size and spacing
- Keep line length reasonable (45-75 characters)

#### Body Text
- Use regular weight for readability
- Maintain 1.5 line height for optimal reading
- Use appropriate contrast ratios

#### Labels and UI Text
- Use medium weight for emphasis
- Keep concise and descriptive
- Use consistent capitalization (sentence case preferred)

---

## 4. Spacing System

### 4.1 Spacing Scale
```css
/* Tailwind spacing scale */
.space-1 { margin/padding: 0.25rem; }  /* 4px */
.space-2 { margin/padding: 0.5rem; }   /* 8px */
.space-3 { margin/padding: 0.75rem; }  /* 12px */
.space-4 { margin/padding: 1rem; }     /* 16px */
.space-5 { margin/padding: 1.25rem; }  /* 20px */
.space-6 { margin/padding: 1.5rem; }   /* 24px */
.space-8 { margin/padding: 2rem; }     /* 32px */
.space-10 { margin/padding: 2.5rem; }  /* 40px */
.space-12 { margin/padding: 3rem; }    /* 48px */
```

### 4.2 Component Spacing Guidelines
- Use consistent spacing between related elements
- Increase spacing to show separation between sections
- Maintain breathing room around interactive elements
- Follow 8px baseline grid for layout consistency

---

## 5. Layout System

### 5.1 Grid System
```css
/* Container widths */
.container-sm { max-width: 640px; }
.container-md { max-width: 768px; }
.container-lg { max-width: 1024px; }
.container-xl { max-width: 1280px; }
.container-2xl { max-width: 1536px; }

/* Grid layouts */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
```

### 5.2 Responsive Breakpoints
```css
/* Mobile first approach */
sm: '640px',   /* Small devices (landscape phones) */
md: '768px',   /* Medium devices (tablets) */
lg: '1024px',  /* Large devices (desktops) */
xl: '1280px',  /* Extra large devices */
2xl: '1536px'  /* Extra extra large devices */
```

---

## 6. Component Library

### 6.1 Buttons

#### Primary Button
```tsx
<Button className="btn-primary">
  Primary Action
</Button>
```

#### Secondary Button
```tsx
<Button variant="outline">
  Secondary Action
</Button>
```

#### Button Variants
- **Primary**: Main call-to-action buttons
- **Secondary/Outline**: Secondary actions
- **Ghost**: Subtle actions and navigation
- **Destructive**: Delete and warning actions
- **Link**: Text-based actions

#### Button Sizes
- **Small**: 32px height, 12px padding
- **Medium**: 40px height, 16px padding (default)
- **Large**: 48px height, 20px padding

### 6.2 Cards

#### Basic Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

#### Interactive Card
```tsx
<Card className="interactive-card hover-lift">
  <CardContent>
    Clickable card content
  </CardContent>
</Card>
```

### 6.3 Forms

#### Input Fields
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
    required
  />
</div>
```

#### Form Layout Guidelines
- Use consistent spacing between form elements
- Group related fields together
- Provide clear labels and helpful placeholders
- Show validation errors inline
- Use appropriate input types for better UX

### 6.4 Navigation

#### Tab Navigation
```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content
  </TabsContent>
</Tabs>
```

#### Sidebar Navigation
- Use consistent icons and labels
- Show active states clearly
- Collapse on mobile devices
- Maintain logical grouping

---

## 7. Icons

### 7.1 Icon Library
Using Lucide React icons for consistency and performance.

```tsx
import { 
  Activity, 
  Search, 
  Trophy, 
  Crown, 
  Link, 
  Award 
} from "lucide-react";
```

### 7.2 Icon Usage Guidelines
- Use 16px (w-4 h-4) for inline icons
- Use 20px (w-5 h-5) for button icons
- Use 24px (w-6 h-6) for standalone icons
- Maintain consistent stroke width
- Use semantic meaning for icon selection

### 7.3 Platform Icons
```tsx
// Social platform icons
const platformIcons = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
};
```

---

## 8. Animation & Transitions

### 8.1 Animation Principles
- Use animations to provide feedback
- Keep animations subtle and functional
- Maintain consistent timing and easing
- Respect user preferences (prefers-reduced-motion)

### 8.2 Standard Transitions
```css
/* Default transition */
.transition-all { transition: all 150ms ease-in-out; }

/* Hover effects */
.hover-lift {
  transition: all 300ms ease-in-out;
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

/* Loading states */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### 8.3 Custom Animations
```css
/* Fade in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide in animation */
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

---

## 9. Accessibility

### 9.1 Color Contrast
- Maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Use color plus other indicators for important information
- Test with colorblind simulation tools

### 9.2 Focus Management
```css
/* Focus ring styles */
.focus-visible:focus {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

### 9.3 Screen Reader Support
- Use semantic HTML elements
- Provide alt text for images
- Include ARIA labels where needed
- Test with screen readers

---

## 10. Component Examples

### 10.1 Dashboard Stats Card
```tsx
<Card className="hover-glow">
  <CardContent className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Total Points
        </p>
        <p className="text-3xl font-bold">
          {userPoints.toLocaleString()}
        </p>
      </div>
      <Award className="h-8 w-8 text-primary" />
    </div>
  </CardContent>
</Card>
```

### 10.2 Social Platform Badge
```tsx
<div className="flex items-center space-x-2">
  <div className="p-2 rounded-full bg-instagram text-white">
    <Instagram className="h-4 w-4" />
  </div>
  <span className="font-medium">@username</span>
  {verified && (
    <Badge variant="secondary" className="text-xs">
      Verified
    </Badge>
  )}
</div>
```

### 10.3 Loading State
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-muted rounded w-1/2"></div>
</div>
```

---

## 11. Design Tokens

### 11.1 Border Radius
```css
--radius: 0.5rem;           /* Default border radius */
--radius-sm: 0.25rem;       /* Small border radius */
--radius-lg: 0.75rem;       /* Large border radius */
--radius-full: 9999px;      /* Fully rounded */
```

### 11.2 Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### 11.3 Z-Index Scale
```css
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
--z-toast: 1080;
```

---

This design system provides a comprehensive foundation for consistent UI development across the RoundAbout platform, ensuring visual cohesion and excellent user experience.
