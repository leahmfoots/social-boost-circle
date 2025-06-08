
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { SubscriptionPlan } from '@/components/payment/SubscriptionPlan';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Zap, TrendingUp, Shield } from 'lucide-react';

const subscriptionPlans = [
  {
    id: 'price_starter',
    name: 'Starter',
    price: 9,
    interval: 'month' as const,
    features: [
      'Connect up to 3 social accounts',
      'Basic analytics dashboard',
      'Standard engagement opportunities',
      '500 points per month',
      'Email support'
    ]
  },
  {
    id: 'price_pro',
    name: 'Pro',
    price: 29,
    interval: 'month' as const,
    popular: true,
    features: [
      'Connect unlimited social accounts',
      'Advanced analytics & insights',
      'Priority engagement opportunities',
      '2,000 points per month',
      'AI-powered content suggestions',
      'Community features',
      'Priority support'
    ]
  },
  {
    id: 'price_enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month' as const,
    features: [
      'Everything in Pro',
      'Team collaboration tools',
      'Custom integrations',
      'Unlimited points',
      'Dedicated account manager',
      'Custom reporting',
      'API access'
    ]
  }
];

const Premium = () => {
  return (
    <DashboardLayout title="Premium Plans">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Unlock Your Creator Potential
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to supercharge your social media presence and 
            maximize your engagement across all platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Premium Access</CardTitle>
              <CardDescription>
                Unlock exclusive features and opportunities
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Advanced Analytics</CardTitle>
              <CardDescription>
                Deep insights into your performance
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Growth Tools</CardTitle>
              <CardDescription>
                AI-powered recommendations and strategies
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Priority Support</CardTitle>
              <CardDescription>
                Get help when you need it most
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <SubscriptionPlan key={plan.id} plan={plan} />
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle>Still have questions?</CardTitle>
            <CardDescription>
              Our team is here to help you choose the right plan for your needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All plans include a 14-day free trial. No credit card required to start.
              Cancel anytime with no hidden fees.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Premium;
