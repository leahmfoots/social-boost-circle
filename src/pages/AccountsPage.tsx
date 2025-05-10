
import { useState } from "react";
import { toast } from "sonner";
import { Instagram, Twitter, Youtube, Linkedin, Facebook, PlusCircle, ArrowRight, BarChart3, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AccountConnectModal from "@/components/AccountConnectModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SocialAccount } from "@/types/accounts";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Mock accounts data
const mockAccounts: SocialAccount[] = [
  {
    id: "1",
    name: "Instagram",
    icon: <Instagram className="h-5 w-5 text-pink-600" />,
    connected: true,
    username: "design_daily",
    stats: {
      followers: 2547,
      posts: 145,
      engagement: 3.8
    }
  },
  {
    id: "2",
    name: "Twitter",
    icon: <Twitter className="h-5 w-5 text-blue-400" />,
    connected: true,
    username: "dev_updates",
    stats: {
      followers: 1280,
      posts: 520,
      engagement: 2.1
    }
  },
  {
    id: "3",
    name: "YouTube",
    icon: <Youtube className="h-5 w-5 text-red-600" />,
    connected: false,
    stats: {
      followers: 0,
      posts: 0,
      engagement: 0
    }
  },
  {
    id: "4",
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5 text-blue-700" />,
    connected: false,
    stats: {
      followers: 0,
      posts: 0,
      engagement: 0
    }
  },
  {
    id: "5",
    name: "Facebook",
    icon: <Facebook className="h-5 w-5 text-blue-600" />,
    connected: false,
    stats: {
      followers: 0,
      posts: 0,
      engagement: 0
    }
  }
];

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>(mockAccounts);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<SocialAccount | null>(null);
  
  const handleConnectClick = (account: SocialAccount) => {
    setSelectedAccount(account);
    setConnectModalOpen(true);
  };
  
  const handleConnect = (accountId: string, username: string) => {
    setAccounts(prev =>
      prev.map(account =>
        account.id === accountId
          ? {
              ...account,
              connected: true,
              username,
              stats: {
                followers: Math.floor(Math.random() * 5000),
                posts: Math.floor(Math.random() * 200),
                engagement: +(Math.random() * 5).toFixed(1)
              }
            }
          : account
      )
    );
    
    setConnectModalOpen(false);
    toast.success(`${selectedAccount?.name} account connected`, {
      description: `@${username} has been linked to your profile`
    });
  };
  
  const handleDisconnect = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    
    setAccounts(prev =>
      prev.map(acc =>
        acc.id === accountId
          ? { ...acc, connected: false, username: undefined, stats: { followers: 0, posts: 0, engagement: 0 } }
          : acc
      )
    );
    
    toast.success(`${account?.name} account disconnected`, {
      description: "Account has been unlinked from your profile"
    });
  };

  const connectedAccountsCount = accounts.filter(acc => acc.connected).length;
  const totalReachCount = accounts.reduce((sum, acc) => sum + (acc.stats?.followers || 0), 0);

  return (
    <DashboardLayout title="Social Accounts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Social Accounts</h1>
          <Button variant="outline" onClick={() => handleConnectClick(accounts.find(acc => !acc.connected) || accounts[0])}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Connect Account
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{connectedAccountsCount}/{accounts.length}</div>
              <Progress className="mt-2" value={(connectedAccountsCount / accounts.length) * 100} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Audience Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReachCount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Followers across all platforms</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {accounts.filter(acc => acc.connected).length > 0
                  ? (accounts.reduce((sum, acc) => sum + (acc.stats?.engagement || 0), 0) / accounts.filter(acc => acc.connected).length).toFixed(1) + "%"
                  : "0%"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Across all connected accounts</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <Card key={account.id} className={account.connected ? "" : "opacity-70"}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {account.icon}
                      <CardTitle className="text-base">{account.name}</CardTitle>
                    </div>
                    {account.connected ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Connected</span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">Not Connected</span>
                    )}
                  </div>
                  {account.connected && (
                    <CardDescription>@{account.username}</CardDescription>
                  )}
                </CardHeader>
                
                {account.connected && account.stats && (
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm font-medium">{account.stats.followers.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{account.stats.posts}</div>
                        <div className="text-xs text-muted-foreground">Posts</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{account.stats.engagement}%</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                    </div>
                  </CardContent>
                )}
                
                <CardFooter className="justify-between pt-2">
                  {account.connected ? (
                    <>
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <BarChart3 className="h-3.5 w-3.5 mr-1" />
                        Analytics
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-xs h-8">
                            <Trash2 className="h-3.5 w-3.5 mr-1 text-red-500" />
                            Disconnect
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Disconnect {account.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will unlink your {account.name} account (@{account.username}) from RoundAbout. 
                              You'll stop earning points for engagements on this platform.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDisconnect(account.id)} className="bg-red-500 hover:bg-red-600">
                              Disconnect
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <Button className="w-full" onClick={() => handleConnectClick(account)}>
                      Connect Account
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <AccountConnectModal
        open={connectModalOpen}
        onOpenChange={setConnectModalOpen}
        platform={selectedAccount}
        onConnect={handleConnect}
      />
    </DashboardLayout>
  );
};

export default AccountsPage;
