
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Facebook,
  Plus,
  Settings,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

const PLATFORM_ICONS = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
  tiktok: Instagram, // Using Instagram icon as placeholder
};

const PLATFORM_COLORS = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  twitter: 'bg-blue-500',
  youtube: 'bg-red-500',
  linkedin: 'bg-blue-700',
  facebook: 'bg-blue-600',
  tiktok: 'bg-black',
};

export const SocialAccountManager = () => {
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch connected accounts
  const { data: socialAccounts, isLoading } = useQuery({
    queryKey: ['social-accounts', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user!.id)
        .order('connected_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Connect account mutation
  const connectAccountMutation = useMutation({
    mutationFn: async ({ platform, username }: { platform: string; username: string }) => {
      // In a real app, this would initiate OAuth flow
      const { data, error } = await supabase
        .from('social_accounts')
        .insert({
          user_id: user!.id,
          platform,
          username,
          account_id: `${platform}_${username}`,
          followers_count: Math.floor(Math.random() * 10000), // Mock data
          following_count: Math.floor(Math.random() * 1000),
          is_verified: Math.random() > 0.7,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Social account connected successfully!');
      queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
      setSelectedPlatform(null);
    },
    onError: (error) => {
      toast.error('Failed to connect account');
      console.error('Connect account error:', error);
    },
  });

  // Disconnect account mutation
  const disconnectAccountMutation = useMutation({
    mutationFn: async (accountId: string) => {
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', accountId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Social account disconnected');
      queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
    },
    onError: (error) => {
      toast.error('Failed to disconnect account');
      console.error('Disconnect account error:', error);
    },
  });

  // Sync account mutation
  const syncAccountMutation = useMutation({
    mutationFn: async (accountId: string) => {
      // Mock sync - in real app, this would fetch latest data from platform APIs
      const { data, error } = await supabase
        .from('social_accounts')
        .update({
          followers_count: Math.floor(Math.random() * 10000),
          following_count: Math.floor(Math.random() * 1000),
          last_sync_at: new Date().toISOString(),
        })
        .eq('id', accountId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Account synced successfully');
      queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
    },
    onError: (error) => {
      toast.error('Failed to sync account');
      console.error('Sync account error:', error);
    },
  });

  const availablePlatforms = [
    'instagram',
    'twitter',
    'youtube',
    'linkedin',
    'facebook',
    'tiktok',
  ];

  const connectedPlatforms = socialAccounts?.map(account => account.platform) || [];
  const unconnectedPlatforms = availablePlatforms.filter(
    platform => !connectedPlatforms.includes(platform)
  );

  const handleConnectAccount = (platform: string, username: string) => {
    connectAccountMutation.mutate({ platform, username });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Social Accounts</h2>
          <p className="text-muted-foreground">
            Connect and manage your social media accounts
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Connect Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Social Account</DialogTitle>
              <DialogDescription>
                Choose a platform to connect your account
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {unconnectedPlatforms.map((platform) => {
                const Icon = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS];
                return (
                  <Button
                    key={platform}
                    variant="outline"
                    className="h-20 flex-col space-y-2"
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="capitalize">{platform}</span>
                  </Button>
                );
              })}
            </div>
            
            {selectedPlatform && (
              <ConnectAccountForm
                platform={selectedPlatform}
                onConnect={handleConnectAccount}
                isLoading={connectAccountMutation.isPending}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Connected Accounts */}
      <div className="grid gap-6">
        {socialAccounts?.map((account) => {
          const Icon = PLATFORM_ICONS[account.platform as keyof typeof PLATFORM_ICONS];
          const colorClass = PLATFORM_COLORS[account.platform as keyof typeof PLATFORM_COLORS];
          
          return (
            <Card key={account.id} className="overflow-hidden">
              <CardHeader className={`${colorClass} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-8 h-8" />
                    <div>
                      <CardTitle className="text-white">
                        @{account.username}
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {account.is_verified && (
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge 
                      variant={account.is_connected ? "default" : "destructive"}
                      className={account.is_connected ? "bg-green-500" : ""}
                    >
                      {account.is_connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{account.followers_count.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{account.following_count.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {account.followers_count > 0 
                        ? Math.round((account.following_count / account.followers_count) * 100) 
                        : 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Engagement Rate</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Last synced: {account.last_sync_at 
                      ? new Date(account.last_sync_at).toLocaleDateString()
                      : 'Never'
                    }
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => syncAccountMutation.mutate(account.id)}
                      disabled={syncAccountMutation.isPending}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://${account.platform}.com/${account.username}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => disconnectAccountMutation.mutate(account.id)}
                      disabled={disconnectAccountMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {socialAccounts?.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Social Accounts Connected</h3>
            <p className="text-muted-foreground mb-4">
              Connect your social media accounts to start earning points through engagements
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Connect Your First Account</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Connect Social Account</DialogTitle>
                  <DialogDescription>
                    Choose a platform to connect your account
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {availablePlatforms.map((platform) => {
                    const Icon = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS];
                    return (
                      <Button
                        key={platform}
                        variant="outline"
                        className="h-20 flex-col space-y-2"
                        onClick={() => setSelectedPlatform(platform)}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="capitalize">{platform}</span>
                      </Button>
                    );
                  })}
                </div>
                
                {selectedPlatform && (
                  <ConnectAccountForm
                    platform={selectedPlatform}
                    onConnect={handleConnectAccount}
                    isLoading={connectAccountMutation.isPending}
                  />
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Connect Account Form Component
interface ConnectAccountFormProps {
  platform: string;
  onConnect: (platform: string, username: string) => void;
  isLoading: boolean;
}

const ConnectAccountForm = ({ platform, onConnect, isLoading }: ConnectAccountFormProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onConnect(platform, username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 pt-4 border-t">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder={`Enter your ${platform} username`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !username.trim()}>
        {isLoading ? 'Connecting...' : `Connect ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
      </Button>
    </form>
  );
};
