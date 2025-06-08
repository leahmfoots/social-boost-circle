
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface SubscriptionPlanProps {
  plan: {
    id: string;
    name: string;
    price: number;
    interval: 'month' | 'year';
    features: string[];
    popular?: boolean;
  };
}

export const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({ plan }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: { 
          priceId: plan.id,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/premium?canceled=true`
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start subscription process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">
            <Crown className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground ml-1">/{plan.interval}</span>
        </div>
        <CardDescription>
          Perfect for {plan.name.toLowerCase()} creators
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className="w-full" 
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Processing..." : `Subscribe to ${plan.name}`}
        </Button>
      </CardContent>
    </Card>
  );
};
