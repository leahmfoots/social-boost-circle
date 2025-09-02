
import React, { useState, useEffect } from 'react';
import { SocialAccountCard } from './SocialAccountCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type Platform = 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'facebook' | 'tiktok';

interface SocialAccount {
  id: string;
  platform: Platform;
  username: string;
  followers_count: number;
  following_count: number;
  is_verified: boolean;
  is_connected: boolean;
  last_sync_at: string | null;
}

export const ConnectedSocialAccounts: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const platforms: Platform[] = ['instagram', 'twitter', 'youtube', 'linkedin', 'facebook', 'tiktok'];

  useEffect(() => {
    if (user) {
      fetchSocialAccounts();
    }
  }, [user]);

  const fetchSocialAccounts = async () => {
    try {
      // For demo purposes, create mock data
      const mockAccounts: SocialAccount[] = [
        {
          id: '1',
          platform: 'instagram',
          username: 'creator_pro',
          followers_count: 12500,
          following_count: 890,
          is_verified: true,
          is_connected: true,
          last_sync_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
        },
        {
          id: '2',
          platform: 'twitter',
          username: 'creator_pro',
          followers_count: 8900,
          following_count: 1200,
          is_verified: false,
          is_connected: true,
          last_sync_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        }
      ];

      setAccounts(mockAccounts);
    } catch (error) {
      console.error('Error fetching social accounts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch social accounts',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (platform: string) => {
    toast({
      title: 'Connect Account',
      description: `Redirecting to ${platform} authentication...`,
    });
    // Here you would implement OAuth flow
    console.log(`Connecting to ${platform}`);
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      setAccounts(prev => prev.filter(acc => acc.id !== accountId));
      toast({
        title: 'Success',
        description: 'Account disconnected successfully',
      });
    } catch (error) {
      console.error('Error disconnecting account:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect account',
        variant: 'destructive'
      });
    }
  };

  const handleSync = async (accountId: string) => {
    try {
      // Update last sync time
      setAccounts(prev => prev.map(acc => 
        acc.id === accountId 
          ? { ...acc, last_sync_at: new Date().toISOString() }
          : acc
      ));
      
      toast({
        title: 'Success',
        description: 'Account synced successfully',
      });
    } catch (error) {
      console.error('Error syncing account:', error);
      toast({
        title: 'Error',
        description: 'Failed to sync account',
        variant: 'destructive'
      });
    }
  };

  const connectedCount = accounts.length;
  const totalPlatforms = platforms.length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-muted rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <div key={platform} className="animate-pulse">
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Social Media Overview
            </span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Connect New
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{connectedCount}</p>
              <p className="text-sm text-muted-foreground">Connected Platforms</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {accounts.reduce((sum, acc) => sum + acc.followers_count, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Followers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {Math.round((connectedCount / totalPlatforms) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Platform Coverage</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const account = accounts.find(acc => acc.platform === platform);
          return (
            <SocialAccountCard
              key={platform}
              account={account}
              platform={platform}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              onSync={handleSync}
            />
          );
        })}
      </div>

      {/* Tips Card */}
      {connectedCount < totalPlatforms && (
        <Card>
          <CardHeader>
            <CardTitle>Maximize Your Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Connect more platforms to increase your engagement opportunities and earn more points!
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Each platform unlocks unique engagement types</li>
                <li>• More followers = higher point values</li>
                <li>• Verified accounts get bonus multipliers</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
