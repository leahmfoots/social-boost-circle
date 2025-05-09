
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import EngagementOpportunity from "@/components/EngagementOpportunity";
import EngagementTable from "@/components/EngagementTable";
import EngagementChart from "@/components/analytics/EngagementChart";
import EngagementFilter from "@/components/engagement/EngagementFilter";
import { Engagement, Opportunity } from "@/types/engagement";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

// Mock data for opportunities and engagements
const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    username: "tech_guru",
    platform: "YouTube",
    contentType: "Video",
    title: "React 18 New Features Explained",
    points: 40,
    timeRequired: "5-7 min",
  },
  {
    id: "2",
    username: "design_expert",
    platform: "Instagram",
    contentType: "Post",
    title: "UI Design Trends for 2023",
    points: 25,
    timeRequired: "3-4 min",
  },
  {
    id: "3",
    username: "code_master",
    platform: "Twitter",
    contentType: "Thread",
    title: "TypeScript Tips & Tricks",
    points: 20,
    timeRequired: "2-3 min",
  },
  {
    id: "4",
    username: "mobile_dev",
    platform: "TikTok",
    contentType: "Short",
    title: "Swift UI Animation Tutorial",
    points: 30,
    timeRequired: "1-2 min",
  },
  {
    id: "5",
    username: "web_wizard",
    platform: "LinkedIn",
    contentType: "Article",
    title: "The Future of Web Development",
    points: 35,
    timeRequired: "8-10 min",
  },
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
  },
  {
    id: "e3",
    username: "js_developer",
    platform: "Twitter",
    contentType: "Tweet",
    title: "Why You Should Learn React in 2023",
    points: 15,
    completedAt: "2023-05-05T09:15:00Z",
    status: "rejected",
  },
];

const EngagementPage = () => {
  const { toast } = useToast();
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [engagements] = useState(mockEngagements);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter handling
  const handleFilterChange = ({ platforms, contentTypes }: any) => {
    // Apply filters to opportunities
    let filtered = [...mockOpportunities];
    
    if (platforms.length > 0) {
      filtered = filtered.filter(opp => platforms.includes(opp.platform.toLowerCase()));
    }
    
    if (contentTypes.length > 0) {
      filtered = filtered.filter(opp => contentTypes.includes(opp.contentType.toLowerCase()));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setOpportunities(filtered);
  };
  
  // Search handling
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value.trim()) {
      setOpportunities(mockOpportunities);
      return;
    }
    
    const filtered = mockOpportunities.filter(opp => 
      opp.title.toLowerCase().includes(value.toLowerCase()) ||
      opp.username.toLowerCase().includes(value.toLowerCase())
    );
    
    setOpportunities(filtered);
  };

  const handleEngage = (opportunityId: string) => {
    const opportunity = opportunities.find((opp) => opp.id === opportunityId);
    
    if (opportunity) {
      toast({
        title: "Engagement Started",
        description: `You're now engaging with ${opportunity.username}'s content.`
      });
      
      // In a real app, this would trigger an API call
      console.log(`Engaging with opportunity: ${opportunityId}`);
    }
  };

  return (
    <DashboardLayout title="Engagement Hub">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Engagement Hub</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search opportunities..."
                className="w-[200px] pl-8 sm:w-[300px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <EngagementFilter onFilterChange={handleFilterChange} />
          </div>
        </div>
        
        <Tabs defaultValue="opportunities">
          <TabsList className="mb-4">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="history">Engagement History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {opportunities.length > 0 ? (
                opportunities.map((opportunity) => (
                  <EngagementOpportunity
                    key={opportunity.id}
                    opportunity={opportunity}
                    onEngage={handleEngage}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-2">No opportunities found</p>
                  <Button onClick={() => setOpportunities(mockOpportunities)}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <EngagementTable engagements={engagements} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngagementChart title="Weekly Engagement Activity" />
              <EngagementChart title="Points Earned Over Time" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EngagementPage;
