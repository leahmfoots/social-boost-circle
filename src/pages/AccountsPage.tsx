
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PlatformConnections } from "@/components/integrations/PlatformConnections";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Link as LinkIcon, Unlink, CheckCircle, AlertTriangle } from "lucide-react";

interface ConnectedAccount {
  id: string;
  platform: string;
  username: string;
  followers: number;
  status: 'connected' | 'error' | 'pending';
  lastSync: string;
  avatar?: string;
  verified: boolean;
}

const mockAccounts: ConnectedAccount[] = [
  {
    id: '1',
    platform: 'Twitter',
    username: '@johndoe',
    followers: 5420,
    status: 'connected',
    lastSync: '2024-01-15T10:30:00Z',
    verified: true
  },
  {
    id: '2',
    platform: 'Instagram',
    username: '@john.doe.creator',
    followers: 12300,
    status: 'connected',
    lastSync: '2024-01-15T09:45:00Z',
    verified: false
  },
  {
    id: '3',
    platform: 'YouTube',
    username: 'John Doe Tech',
    followers: 8900,
    status: 'error',
    lastSync: '2024-01-14T16:20:00Z',
    verified: true
  },
  {
    id: '4',
    platform: 'TikTok',
    username: '@johndoetech',
    followers: 25600,
    status: 'pending',
    lastSync: '2024-01-15T11:00:00Z',
    verified: false
  }
];

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(mockAccounts);

  const handleDisconnect = (accountId: string) => {
    setAccounts(prev => prev.filter(account => account.id !== accountId));
  };

  const handleReconnect = (accountId: string) => {
    setAccounts(prev => 
      prev.map(account => 
        account.id === accountId 
          ? { ...account, status: 'connected' as const }
          : account
      )
    );
  };

  const getStatusIcon = (status: ConnectedAccount['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ConnectedAccount['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Connected Accounts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Connected Accounts</h1>
            <p className="text-muted-foreground">Manage your social media accounts and integrations</p>
          </div>
          <Button>
            <LinkIcon className="w-4 h-4 mr-2" />
            Connect New Account
          </Button>
        </div>

        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="accounts">Social Accounts</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-6">
            <div className="grid gap-4">
              {accounts.map(account => (
                <Card key={account.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={account.avatar} />
                          <AvatarFallback>
                            {account.platform.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{account.username}</h3>
                            {account.verified && (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">{account.platform}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">
                              {account.followers.toLocaleString()} followers
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(account.status)}
                            <Badge className={getStatusColor(account.status)}>
                              {account.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last sync: {new Date(account.lastSync).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {account.status === 'error' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReconnect(account.id)}
                            >
                              Reconnect
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDisconnect(account.id)}
                          >
                            <Unlink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {accounts.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <LinkIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No accounts connected</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Connect your social media accounts to start engaging with content
                  </p>
                  <Button>Connect Your First Account</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="integrations">
            <PlatformConnections />
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sync Settings</CardTitle>
                  <CardDescription>Configure how often your accounts are synchronized</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-sync frequency</p>
                      <p className="text-sm text-muted-foreground">How often to update account data</p>
                    </div>
                    <select className="border rounded px-3 py-1">
                      <option>Every 15 minutes</option>
                      <option>Every hour</option>
                      <option>Every 6 hours</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sync notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified when sync completes or fails</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control what data is shared and stored</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Share analytics data</p>
                      <p className="text-sm text-muted-foreground">Help improve the platform with anonymous usage data</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public profile visibility</p>
                      <p className="text-sm text-muted-foreground">Allow other users to see your profile</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AccountsPage;
