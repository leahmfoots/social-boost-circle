
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, MessageSquare, Heart, Award, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import EngagementTable from "@/components/EngagementTable";
import EngagementOpportunity from "@/components/EngagementOpportunity";
import PointsHistory from "@/components/PointsHistory";

// Sample data
const engagementOpportunities = [
  {
    id: "1",
    username: "creator123",
    platform: "YouTube",
    contentType: "video",
    title: "How to Grow Your Audience in 2023",
    points: 15,
    timeRequired: "3-5 min",
  },
  {
    id: "2",
    username: "social_expert",
    platform: "Twitter",
    contentType: "tweet",
    title: "10 Tips for Better Engagement",
    points: 5,
    timeRequired: "1-2 min",
  },
  {
    id: "3",
    username: "content_queen",
    platform: "Instagram",
    contentType: "post",
    title: "My Journey as a Content Creator",
    points: 10,
    timeRequired: "2-3 min",
  },
  {
    id: "4",
    username: "tech_reviewer",
    platform: "YouTube",
    contentType: "video",
    title: "Latest Tech Gadgets Review",
    points: 20,
    timeRequired: "5-7 min",
  },
  {
    id: "5",
    username: "fitness_guru",
    platform: "TikTok",
    contentType: "video",
    title: "Quick Home Workout Routine",
    points: 8,
    timeRequired: "2-3 min",
  }
];

// Sample completed engagements
const completedEngagements = [
  {
    id: "c1",
    username: "travel_vlogger",
    platform: "YouTube",
    contentType: "video",
    title: "Amazing Places in Europe",
    points: 15,
    completedAt: "2023-05-07T13:24:00",
    status: "verified" as const
  },
  {
    id: "c2",
    username: "cooking_master",
    platform: "Instagram",
    contentType: "post",
    title: "Easy 10-Minute Recipes",
    points: 10, 
    completedAt: "2023-05-06T17:45:00",
    status: "verified" as const
  },
  {
    id: "c3",
    username: "digital_artist",
    platform: "Twitter",
    contentType: "tweet",
    title: "Digital Art Creation Process",
    points: 5,
    completedAt: "2023-05-05T09:30:00",
    status: "verified" as const
  }
];

const EngagementPage = () => {
  const [activeTab, setActiveTab] = useState("opportunities");
  const [opportunities, setOpportunities] = useState(engagementOpportunities);
  const [completed, setCompleted] = useState(completedEngagements);
  const [totalPoints, setTotalPoints] = useState(780);
  
  const handleEngagement = (id: string) => {
    // Find the opportunity
    const opportunity = opportunities.find(opp => opp.id === id);
    if (!opportunity) return;

    // Remove from opportunities
    setOpportunities(opportunities.filter(opp => opp.id !== id));
    
    // Add to completed
    const newCompleted = {
      ...opportunity,
      completedAt: new Date().toISOString(),
      status: "pending" as const
    };
    
    setCompleted([newCompleted, ...completed]);
    
    // After a delay, update to verified (simulating verification process)
    setTimeout(() => {
      setCompleted(prev => prev.map(eng => 
        eng.id === id ? {...eng, status: "verified" as const} : eng
      ));
      
      // Update points
      setTotalPoints(prev => prev + opportunity.points);
      
      toast({
        title: "Engagement Verified",
        description: `You earned ${opportunity.points} points for engaging with ${opportunity.title}.`,
      });
    }, 3000);
    
    toast({
      title: "Engagement Submitted",
      description: "Your engagement is being verified. Points will be awarded soon.",
    });
  };

  return (
    <DashboardLayout title="Engagement">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Engagement Hub</h1>
        <p className="text-muted-foreground">
          Engage with other creators' content, earn points, and grow together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <p className="text-xs text-muted-foreground">
              +45 points since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engagements</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completed.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 engagements since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% since last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger 
            value="opportunities"
            onClick={() => setActiveTab("opportunities")}
          >
            Engagement Opportunities
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            onClick={() => setActiveTab("history")}
          >
            Engagement History
          </TabsTrigger>
          <TabsTrigger 
            value="points"
            onClick={() => setActiveTab("points")}
          >
            Points History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Available Opportunities</h2>
            <Button size="sm" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <div className="grid gap-4">
            {opportunities.map((opp) => (
              <EngagementOpportunity 
                key={opp.id}
                opportunity={opp}
                onEngage={handleEngagement}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <EngagementTable engagements={completed} />
        </TabsContent>
        
        <TabsContent value="points">
          <PointsHistory />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default EngagementPage;
