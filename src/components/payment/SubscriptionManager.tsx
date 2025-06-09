
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Crown, CreditCard, Calendar, AlertCircle } from 'lucide-react';

export const SubscriptionManager = () => {
  const [loading, setLoading] = useState(false);
  const { subscribed, subscriptionTier, checkSubscription } = useAuth();
  const { toast } = useToast();

  const handleManageSubscription = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open customer portal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    setLoading(true);
    try {
      await checkSubscription();
      toast({
        title: "Status Updated",
        description: "Subscription status has been refreshed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh subscription status.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-primary" />
            <CardTitle>Subscription Status</CardTitle>
          </div>
          <Badge variant={subscribed ? "default" : "secondary"}>
            {subscribed ? "Active" : "Free"}
          </Badge>
        </div>
        <CardDescription>
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscribed ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">
                    {subscriptionTier} Plan Active
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    You have access to all premium features
                  </p>
                </div>
              </div>
              <Crown className="h-5 w-5 text-green-600" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleManageSubscription}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Manage Billing</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRefreshStatus}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Refresh Status</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    Free Plan
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Upgrade to unlock premium features
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => window.location.href = '/premium'}
                className="flex items-center space-x-2"
              >
                <Crown className="h-4 w-4" />
                <span>Upgrade Now</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRefreshStatus}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Refresh Status</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
