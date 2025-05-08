
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, User, ExternalLink, Check, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import AccountConnectModal from "@/components/AccountConnectModal";
import DashboardLayout from "@/components/DashboardLayout";

const socialPlatforms = [
  { 
    id: "youtube", 
    name: "YouTube", 
    icon: <Link className="text-red-600" />,
    connected: false,
    stats: { followers: 0, posts: 0, engagement: 0 }
  },
  { 
    id: "instagram", 
    name: "Instagram", 
    icon: <Link className="text-pink-600" />,
    connected: false,
    stats: { followers: 0, posts: 0, engagement: 0 }
  },
  { 
    id: "twitter", 
    name: "Twitter", 
    icon: <Link className="text-blue-400" />,
    connected: true,
    stats: { followers: 245, posts: 45, engagement: 12.5 }
  },
  { 
    id: "tiktok", 
    name: "TikTok", 
    icon: <Link className="text-black" />,
    connected: false,
    stats: { followers: 0, posts: 0, engagement: 0 }
  },
  { 
    id: "linkedin", 
    name: "LinkedIn", 
    icon: <Link className="text-blue-700" />,
    connected: true,
    stats: { followers: 189, posts: 22, engagement: 8.2 }
  },
  { 
    id: "facebook", 
    name: "Facebook", 
    icon: <Link className="text-blue-600" />,
    connected: false,
    stats: { followers: 0, posts: 0, engagement: 0 }
  },
];

const AccountsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [accounts, setAccounts] = useState(socialPlatforms);

  const handleConnect = (platformId: string) => {
    setSelectedPlatform(platformId);
    setShowModal(true);
  };

  const handleAccountConnect = (platformId: string, username: string) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === platformId 
          ? { ...account, connected: true, username } 
          : account
      )
    );
    
    setShowModal(false);
    toast({
      title: "Account Connected",
      description: `Your ${accounts.find(a => a.id === platformId)?.name} account has been successfully connected.`,
    });
  };

  return (
    <DashboardLayout title="Social Accounts">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Manage Your Social Accounts</h1>
        <p className="text-muted-foreground">
          Connect your social media accounts to track engagement and earn points.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((platform) => (
          <Card key={platform.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  {platform.icon}
                </div>
                <div>
                  <CardTitle>{platform.name}</CardTitle>
                  {platform.connected && (
                    <CardDescription>@username</CardDescription>
                  )}
                </div>
              </div>
              {platform.connected && (
                <Badge variant="outline" className="flex gap-1 items-center">
                  <Check className="h-3 w-3" />
                  Connected
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              {platform.connected ? (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="font-medium">{platform.stats.followers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Posts</p>
                    <p className="font-medium">{platform.stats.posts}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="font-medium">{platform.stats.engagement}%</p>
                  </div>
                </div>
              ) : (
                <div className="py-2 flex items-center justify-center">
                  <p className="text-muted-foreground text-center text-sm">
                    Connect your account to start earning points
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {platform.connected ? (
                <div className="flex w-full gap-3">
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="mr-2 h-4 w-4" /> View
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setAccounts(prev => prev.map(acc => 
                        acc.id === platform.id ? {...acc, connected: false} : acc
                      ));
                      toast({
                        title: "Account Disconnected",
                        description: `Your ${platform.name} account has been disconnected.`,
                      });
                    }}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={() => handleConnect(platform.id)}
                >
                  Connect Account
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <AccountConnectModal 
        open={showModal} 
        onOpenChange={setShowModal}
        platform={selectedPlatform ? accounts.find(p => p.id === selectedPlatform) : null}
        onConnect={handleAccountConnect}
      />
    </DashboardLayout>
  );
};

export default AccountsPage;
