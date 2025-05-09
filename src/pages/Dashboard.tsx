
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStatsGrid from "@/components/DashboardStatsGrid";
import EngagementChart from "@/components/analytics/EngagementChart";
import RewardsProgress from "@/components/rewards/RewardsProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Activity, Award, CheckCircle, Link, MessageSquare, TrendingUp } from "lucide-react";
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EngagementChart />
          <RewardsProgress rewards={mockRewards} userPoints={userPoints} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        </div>
        
        <Tabs defaultValue="recommended">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="for-you">For You</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="recommended" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>R{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Recommended #{i}</p>
                          <p className="text-xs text-muted-foreground">@recommended_{i}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Check out this amazing content from @recommended_{i}!</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Award className="h-4 w-4" />
                        <span>{25 + (i * 5)} points possible</span>
                      </div>
                      <Button size="sm">
                        Engage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>T{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Trending #{i}</p>
                          <p className="text-xs text-muted-foreground">@trending_{i}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">This content is trending right now!</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span>{100 + (i * 50)} engagements</span>
                      </div>
                      <Button size="sm">
                        Engage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="for-you" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>F{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">For You #{i}</p>
                          <p className="text-xs text-muted-foreground">@foryou_{i}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Personalized content based on your interests!</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>{10 + (i * 15)} comments</span>
                      </div>
                      <Button size="sm">
                        Engage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
