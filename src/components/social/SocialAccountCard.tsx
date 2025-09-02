
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Facebook,
  Users, 
  UserPlus, 
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const platformIcons = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
  tiktok: Users
};

const platformColors = {
  instagram: 'text-pink-600',
  twitter: 'text-blue-500',
  youtube: 'text-red-600',
  linkedin: 'text-blue-700',
  facebook: 'text-blue-600',
  tiktok: 'text-black'
};

interface SocialAccount {
  id: string;
  platform: keyof typeof platformIcons;
  username: string;
  followers_count: number;
  following_count: number;
  is_verified: boolean;
  is_connected: boolean;
  last_sync_at: string | null;
}

interface SocialAccountCardProps {
  account?: SocialAccount;
  platform: keyof typeof platformIcons;
  onConnect: (platform: string) => void;
  onDisconnect: (accountId: string) => void;
  onSync: (accountId: string) => void;
}

export const SocialAccountCard: React.FC<SocialAccountCardProps> = ({
  account,
  platform,
  onConnect,
  onDisconnect,
  onSync
}) => {
  const [syncing, setSyncing] = useState(false);
  const Icon = platformIcons[platform];
  const iconColor = platformColors[platform];

  const handleSync = async () => {
    if (!account) return;
    setSyncing(true);
    try {
      await onSync(account.id);
    } finally {
      setSyncing(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getLastSyncText = (lastSync: string | null) => {
    if (!lastSync) return 'Never synced';
    const date = new Date(lastSync);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      return 'Synced recently';
    } else if (diffHours < 24) {
      return `Synced ${Math.floor(diffHours)}h ago`;
    } else {
      return `Synced ${Math.floor(diffHours / 24)}d ago`;
    }
  };

  if (!account) {
    // Not connected state
    return (
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className={`h-16 w-16 rounded-full bg-muted flex items-center justify-center`}>
            <Icon className={`h-8 w-8 ${iconColor}`} />
          </div>
          <div>
            <h3 className="font-semibold capitalize">{platform}</h3>
            <p className="text-sm text-muted-foreground">Not connected</p>
          </div>
          <Button 
            onClick={() => onConnect(platform)}
            variant="outline"
            className="w-full"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Connect Account
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Connected state
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">@{account.username}</h3>
                {account.is_verified && (
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground capitalize">{platform}</p>
            </div>
          </div>
          <Badge variant={account.is_connected ? "default" : "secondary"}>
            {account.is_connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{formatNumber(account.followers_count)}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{formatNumber(account.following_count)}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{getLastSyncText(account.last_sync_at)}</span>
          {!account.is_connected && (
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          )}
        </div>

        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSync}
            disabled={syncing || !account.is_connected}
            className="flex-1"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            Sync
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDisconnect(account.id)}
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
