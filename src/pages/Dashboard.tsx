import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStatsGrid from "@/components/DashboardStatsGrid";
import EngagementChart from "@/components/analytics/EngagementChart";
import RewardsProgress from "@/components/rewards/RewardsProgress";
import { ContentSuggestions } from "@/components/ai/ContentSuggestions";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import { GroupChallenges } from "@/components/challenges/GroupChallenges";
import { PremiumFeatures } from "@/components/monetization/PremiumFeatures";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Activity, Search, Trophy, Crown } from "lucide-react";
import { Reward } from "@/types/rewards";
import { Engagement } from "@/types/engagement";

// Mock data
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
    username: "tech_reviewer",
    platform: "YouTube",
    contentType: "Video",
    title: "Top 10 VSCode Extensions for Developers",
    points: 45,
    completedAt: "2023-05-15T10:30:00Z",
    status: "verified",
  },
  {
    id: "e2",
    username: "ui_designer",
    platform: "Instagram",
    contentType: "Story",
    title: "Color Theory for Digital Designers",
    points: 20,
    completedAt: "2023-05-10T14:45:00Z",
    status: "pending",
  }
];

const Dashboard = () => {
  const [userPoints] = useState(350);
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your activity</p>
          </div>
          <Button>
            <Activity className="mr-2 h-4 w-4" />
            Weekly Report
          </Button>
        </div>
        
        <DashboardStatsGrid stats={{ 
          totalPoints: userPoints,
          engagements: 5,
          engagementRate: "18.2%"
        }} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
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
              <RewardsProgress rewards={mockRewards} userPoints={userPoints} />
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
                  {mockEngagements.map(engagement => (
                    <div key={engagement.id} className="flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center`}>
                          <Link className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{engagement.title}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>@{engagement.username}</span>
                            <span>•</span>
                            <span>{engagement.platform}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-medium text-primary">
                          <Award className="h-4 w-4" />
                          <span>+{engagement.points}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(engagement.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
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
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs">
                          <MessageSquare className="h-3 w-3" />
                          <span>{120 - (i * 20)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <TrendingUp className="h-3 w-3" />
                          <span>{8 - i}%</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Follow
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
