
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

const premiumPlans: PremiumPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9.99,
    period: 'month',
    icon: <Zap className="w-5 h-5" />,
    features: [
      'Advanced analytics dashboard',
      'AI content suggestions',
      'Priority customer support',
      '50 engagement opportunities/month',
      'Basic automation tools'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    period: 'month',
    popular: true,
    icon: <Crown className="w-5 h-5" />,
    features: [
      'Everything in Starter',
      'Unlimited engagement opportunities',
      'Advanced AI insights',
      'Competitor analysis',
      'Custom branding',
      'API access',
      'Team collaboration tools'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    period: 'month',
    icon: <Star className="w-5 h-5" />,
    features: [
      'Everything in Pro',
      'White-label solution',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security features',
      'SLA guarantee',
      'Training & onboarding'
    ]
  }
];

const premiumFeatures = [
  {
    title: 'AI-Powered Insights',
    description: 'Get personalized content recommendations and optimal posting times',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: 'Advanced Analytics',
    description: 'Detailed performance metrics and competitor analysis',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: 'Priority Support',
    description: '24/7 premium customer support with dedicated account management',
    icon: <Crown className="w-6 h-6" />
  },
  {
    title: 'Automation Tools',
    description: 'Automate your engagement and content scheduling',
    icon: <Zap className="w-6 h-6" />
  }
];

export const PremiumFeatures = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    console.log('Upgrading to plan:', planId);
    // In real app, integrate with payment provider
  };

  return (
    <div className="space-y-6">
      {/* Premium Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Premium Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="text-primary">{feature.icon}</div>
                <div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {premiumPlans.map(plan => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">{plan.icon}</div>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => handleUpgrade(plan.id)}
              >
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Creator Marketplace Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Creator Marketplace</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Coming Soon: Creator Marketplace</h3>
            <p className="text-muted-foreground mb-4">
              Buy and sell services, collaborate on projects, and monetize your expertise
            </p>
            <Button variant="outline">Join Waitlist</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
