
# RoundAbout - Creator Engagement Platform

## 🚀 Overview

RoundAbout is a comprehensive creator engagement platform that gamifies social media interactions through a points-based reward system. Creators can connect their social media accounts, complete engagement tasks, earn points, and redeem rewards while building a thriving community.

## ✨ Features

### Core Platform Features
- **Multi-Platform Integration**: Connect Instagram, Twitter, YouTube, LinkedIn, TikTok, and Facebook accounts
- **Gamified Engagement System**: Earn points for likes, comments, follows, shares, and subscriptions
- **Rewards Marketplace**: Redeem points for gift cards, cash, premium features, and exclusive benefits
- **Real-Time Messaging**: Connect and collaborate with other creators
- **Advanced Analytics**: Track engagement metrics, growth trends, and performance insights
- **Achievement System**: Unlock badges and milestones as you progress
- **Community Groups**: Join creator communities and collaborate on campaigns

### Technical Features
- **Real-Time Updates**: Live notifications and messaging using Supabase Realtime
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Automatic theme detection with manual override
- **Progressive Web App**: Install as a native app on any device
- **Offline Support**: Core features work without internet connection
- **Multi-Database Support**: PostgreSQL (production) and SQLite (local development)

## 🏗️ Architecture

### Frontend Stack
- **React 18** - Modern component-based UI framework
- **TypeScript** - Type-safe development with excellent IDE support
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Shadcn/UI** - Beautiful, accessible component library
- **React Router** - Client-side routing and navigation
- **TanStack Query** - Powerful data fetching and state management
- **Recharts** - Responsive chart library for analytics

### Backend & Services
- **Supabase** - Backend-as-a-Service for authentication, database, and real-time features
- **PostgreSQL** - Robust relational database with advanced features
- **Row Level Security** - Database-level security policies
- **Edge Functions** - Serverless functions for custom logic
- **Real-Time Subscriptions** - Live updates for messages and notifications
- **File Storage** - Secure file uploads and management

### Deployment Options
- **Vercel** - Recommended for production deployments
- **Netlify** - Alternative hosting with continuous deployment
- **Railway** - Full-stack hosting with database
- **Render** - Simple cloud hosting
- **Docker** - Containerized deployment for any platform
- **Local Development** - Run entirely on your machine

## 🚦 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git for version control

### 1. Clone and Setup
```bash
# Clone the repository
git clone <repository-url>
cd roundabout-platform

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 2. Environment Configuration
Edit `.env` file with your configuration:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe Configuration (Optional)
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-key

# Application URLs
VITE_APP_URL=http://localhost:5173
```

### 3. Database Setup
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db reset
```

### 4. Start Development
```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## 📖 Documentation

- **[Setup Guide](docs/setup.md)** - Detailed installation and configuration
- **[Deployment Guide](docs/deployment.md)** - Deploy to various platforms
- **[Configuration Reference](docs/config.md)** - Environment variables and settings
- **[Testing Guide](docs/testing.md)** - Testing strategies and automation
- **[API Documentation](docs/api.md)** - Backend API endpoints and integration
- **[Developer Guide](docs/developer.md)** - Architecture and development patterns

## 🛠️ Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing
npm run test            # Run unit tests
npm run test:e2e        # Run end-to-end tests
npm run test:coverage   # Generate coverage report

# Code Quality
npm run lint            # Lint code
npm run format          # Format code
npm run type-check      # TypeScript type checking

# Database
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with sample data
npm run db:reset        # Reset and reseed database
```

## 🚀 Deployment

### Quick Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Docker Deployment
```bash
# Build Docker image
docker build -t roundabout .

# Run container
docker run -p 3000:3000 roundabout
```

### Manual Deployment
1. Build the application: `npm run build`
2. Upload `dist` folder to your hosting provider
3. Configure environment variables
4. Set up database and run migrations

## 🧪 Testing

### Automated Testing
```bash
# Run all tests
npm run test:all

# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

### Manual Testing Checklist
- [ ] User registration and authentication
- [ ] Social media account connection
- [ ] Engagement task completion
- [ ] Points earning and reward redemption
- [ ] Real-time messaging
- [ ] Mobile responsiveness
- [ ] Dark/light theme switching

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes | - |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | - |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | No | - |
| `VITE_APP_URL` | Application base URL | No | `http://localhost:5173` |

### Feature Flags
```typescript
// src/config/features.ts
export const FEATURES = {
  REAL_TIME_MESSAGING: true,
  PREMIUM_SUBSCRIPTIONS: true,
  SOCIAL_OAUTH: true,
  ANALYTICS_DASHBOARD: true,
  MOBILE_APP: false,
};
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and add tests
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Create a Pull Request

### Code Standards
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation for API changes
- Use conventional commit messages

## 📞 Support

### Community
- **Discord**: [Join our community](https://discord.gg/roundabout)
- **GitHub Discussions**: Ask questions and share ideas
- **Documentation**: Comprehensive guides and API reference

### Enterprise Support
- **Email**: support@roundabout.com
- **Slack**: Enterprise customers get dedicated Slack channel
- **Phone**: Available for enterprise plans

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - Amazing backend-as-a-service platform
- **Vercel** - Excellent hosting and deployment platform  
- **Shadcn/UI** - Beautiful component library
- **Tailwind CSS** - Fantastic utility-first CSS framework
- **React Team** - For the amazing React framework

---

**Built with ❤️ by the RoundAbout Team**

For more information, visit our [website](https://roundabout.app) or check out the [live demo](https://demo.roundabout.app).
