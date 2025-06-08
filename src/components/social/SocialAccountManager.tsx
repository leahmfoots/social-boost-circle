
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Instagram, Twitter, Youtube, Linkedin, Facebook, Plus, Unlink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  followers: number;
  verified: boolean;
  connected_at: string;
}

const platformIcons = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
};

const platformColors = {
  instagram: 'bg-pink-500',
  twitter: 'bg-blue-500',
  youtube: 'bg-red-500',
  linkedin: 'bg-blue-700',
  facebook: 'bg-blue-600',
};

export const SocialAccountManager = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, [user]);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectAccount = async (platform: string) => {
    setConnecting(platform);
    
    try {
      const { data, error } = await supabase.functions.invoke('connect-social-account', {
        body: { platform }
      });

      if (error) throw error;

      if (data?.authUrl) {
        window.open(data.authUrl, '_blank', 'width=600,height=600');
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: `Failed to connect ${platform} account. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setConnecting(null);
    }
  };

  const disconnectAccount = async (accountId: string, platform: string) => {
    try {
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', accountId);

      if (error) throw error;

      setAccounts(accounts.filter(account => account.id !== accountId));
      
      toast({
        title: "Account disconnected",
        description: `${platform} account has been disconnected.`,
      });
    } catch (error) {
      toast({
        title: "Disconnection failed",
        description: "Failed to disconnect account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const availablePlatforms = ['instagram', 'twitter', 'youtube', 'linkedin', 'facebook'];
  const connectedPlatforms = accounts.map(account => account.platform);
  const unconnectedPlatforms = availablePlatforms.filter(
    platform => !connectedPlatforms.includes(platform)
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Social Accounts</CardTitle>
          <CardDescription>Loading your connected accounts...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {accounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage your connected social media accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {accounts.map((account) => {
              const Icon = platformIcons[account.platform as keyof typeof platformIcons];
              const colorClass = platformColors[account.platform as keyof typeof platformColors];
              
              return (
                <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${colorClass} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">@{account.username}</span>
                        {account.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">
                        {account.platform} • {account.followers.toLocaleString()} followers
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => disconnectAccount(account.id, account.platform)}
                  >
                    <Unlink className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {unconnectedPlatforms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Connect New Account</CardTitle>
            <CardDescription>
              Add more social media accounts to track your engagement across platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unconnectedPlatforms.map((platform) => {
                const Icon = platformIcons[platform as keyof typeof platformIcons];
                const colorClass = platformColors[platform as keyof typeof platformColors];
                
                return (
                  <Button
                    key={platform}
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => connectAccount(platform)}
                    disabled={connecting === platform}
                  >
                    <div className={`p-2 rounded-full ${colorClass} text-white mr-3`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium capitalize">{platform}</div>
                      <div className="text-sm text-muted-foreground">
                        {connecting === platform ? 'Connecting...' : 'Connect account'}
                      </div>
                    </div>
                    {connecting !== platform && (
                      <Plus className="h-4 w-4 ml-auto" />
                    )}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
