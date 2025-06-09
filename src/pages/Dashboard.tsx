import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStatsGrid from "@/components/DashboardStatsGrid";
import EngagementChart from "@/components/analytics/EngagementChart";
import RewardsProgress from "@/components/rewards/RewardsProgress";
import { ContentSuggestions } from "@/components/ai/ContentSuggestions";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import { GroupChallenges } from "@/components/challenges/GroupChallenges";
import { PremiumFeatures } from "@/components/monetization/PremiumFeatures";
import { SocialAccountManager } from "@/components/social/SocialAccountManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Search, 
  Trophy, 
  Crown, 
  Link, 
  Award, 
  CheckCircle, 
  MessageSquare, 
  TrendingUp,
  Settings
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Reward } from "@/types/rewards";
import { Engagement } from "@/types/engagement";

// Mock data with correct properties
const mockRewards: Reward[] = [
  {
    id: "r1",
    title: "$5 Amazon Gift Card",
    description: "Redeem your points for an Amazon gift card",
    pointsRequired: 500,
    image: "/gift-card.png",
    category: "Gift Card"
  },
  {
    id: "r2",
    title: "Premium Account (1 Month)",
    description: "Upgrade to premium features for one month",
    pointsRequired: 800,
    image: "/premium.png",
    category: "Subscription"
  }
];

const mockEngagements: Engagement[] = [
  {
    id: "e1",
    user_id: "user1",
    username: "tech_reviewer",
    platform: "YouTube",
    contentType: "Video",
    title: "Top 10 VSCode Extensions for Developers",
    points: 45,
    content_url: "https://youtube.com/watch?v=example1",
    points_value: 45,
    submitted_at: "2023-05-15T10:30:00Z",
    completedAt: "2023-05-15T10:30:00Z",
    status: "verified",
  },
  {
    id: "e2",
    user_id: "user1",
    username: "ui_designer",
    platform: "Instagram",
    contentType: "Story",
    title: "Color Theory for Digital Designers",
    points: 20,
    content_url: "https://instagram.com/p/example2",
    points_value: 20,
    submitted_at: "2023-05-10T14:45:00Z",
    completedAt: "2023-05-10T14:45:00Z",
    status: "pending",
  }
];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      setUserProfile(profile);
      setUserPoints(profile?.points || 0);

      // Fetch rewards
      const { data: rewardsData } = await supabase
        .from('rewards')
        .select('*')
        .eq('is_active', true)
        .order('points_required', { ascending: true })
        .limit(5);

      setRewards(rewardsData || []);

      // Fetch recent engagements
      const { data: engagementsData } = await supabase
        .from('engagements')
        .select('*')
        .eq('user_id', user?.id)
        .order('submitted_at', { ascending: false })
        .limit(5);

      setEngagements(engagementsData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {userProfile?.first_name || user?.email}!
            </h1>
            <p className="text-muted-foreground">Here's an overview of your activity</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSignOut}>
              <Settings className="mr-2 h-4 w-4" />
              Account
            </Button>
            <Button>
              <Activity className="mr-2 h-4 w-4" />
              Weekly Report
            </Button>
          </div>
        </div>
        
        <DashboardStatsGrid stats={{ 
          totalPoints: userPoints,
          engagements: engagements.length,
          engagementRate: "18.2%"
        }} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-1">
              <Search className="w-4 h-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-1">
              <Crown className="w-4 h-4" />
              Premium
            </TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EngagementChart />
              <RewardsProgress rewards={rewards} userPoints={userPoints} />
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Engagements</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <CardDescription>Your recent engagement activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagements.length > 0 ? (
                    engagements.map(engagement => (
                      <div key={engagement.id} className="flex justify-between items-center">
                        <div className="flex items-start gap-3">
                          <div className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center`}>
                            <Link className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{engagement.content_url}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span>{engagement.platform}</span>
                              <span>•</span>
                              <span className={`capitalize ${
                                engagement.status === 'verified' ? 'text-green-600' : 
                                engagement.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {engagement.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm font-medium text-primary">
                            <Award className="h-4 w-4" />
                            <span>+{engagement.points_value}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(engagement.submitted_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No engagements yet. Start by connecting your social accounts!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Top Creators</CardTitle>
                <CardDescription>Creators with high engagement rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>C{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-medium text-sm">Creator {i}</p>
                            {i <= 2 && <CheckCircle className="h-3 w-3 text-blue-500 fill-blue-500" />}
                          </div>
                          <p className="text-xs text-muted-foreground">@creator_{i}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Follow</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts">
            <SocialAccountManager />
          </TabsContent>

          <TabsContent value="search">
            <AdvancedSearch />
          </TabsContent>

          <TabsContent value="challenges">
            <GroupChallenges />
          </TabsContent>

          <TabsContent value="premium">
            <PremiumFeatures />
          </TabsContent>

          <TabsContent value="ai">
            <ContentSuggestions />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
