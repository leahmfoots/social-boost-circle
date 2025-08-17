import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Grid, List, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

interface EngagementOpportunity {
  id: string;
  platform: string;
  type: string;
  description: string;
  points: number;
  status: "available" | "in-progress" | "completed";
  url: string;
}

const mockEngagementData: EngagementOpportunity[] = [
  {
    id: "1",
    platform: "Instagram",
    type: "Like",
    description: "Like a specific post on Instagram",
    points: 10,
    status: "available",
    url: "https://www.instagram.com/p/example1",
  },
  {
    id: "2",
    platform: "Twitter",
    type: "Retweet",
    description: "Retweet a specific tweet on Twitter",
    points: 15,
    status: "in-progress",
    url: "https://twitter.com/example/status/123456789",
  },
  {
    id: "3",
    platform: "YouTube",
    type: "Comment",
    description: "Leave a thoughtful comment on a YouTube video",
    points: 20,
    status: "completed",
    url: "https://www.youtube.com/watch?v=abcdefg",
  },
  {
    id: "4",
    platform: "LinkedIn",
    type: "Share",
    description: "Share an article on LinkedIn",
    points: 25,
    status: "available",
    url: "https://www.linkedin.com/posts/example",
  },
  {
    id: "5",
    platform: "Instagram",
    type: "Follow",
    description: "Follow a specific account on Instagram",
    points: 12,
    status: "available",
    url: "https://www.instagram.com/example2",
  },
  {
    id: "6",
    platform: "Twitter",
    type: "Like",
    description: "Like a specific tweet on Twitter",
    points: 8,
    status: "completed",
    url: "https://twitter.com/example/status/987654321",
  },
];

const EngagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePlatformFilterChange = (value: string) => {
    setPlatformFilter(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const filteredEngagements = mockEngagementData.filter((engagement) => {
    const searchMatch =
      engagement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      engagement.type.toLowerCase().includes(searchQuery.toLowerCase());
    const platformMatch = platformFilter === "all" || engagement.platform === platformFilter;
    const statusMatch = statusFilter === "all" || engagement.status === statusFilter;

    return searchMatch && platformMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Engagement Opportunities</h1>
          <p className="text-muted-foreground">Engage and earn points</p>
        </div>
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="md:w-64"
          />
          <Select value={platformFilter} onValueChange={handlePlatformFilterChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="instagram">
            <Instagram className="h-4 w-4 mr-2" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="twitter">
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </TabsTrigger>
          <TabsTrigger value="youtube">
            <Youtube className="h-4 w-4 mr-2" />
            YouTube
          </TabsTrigger>
          <TabsTrigger value="linkedin">
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </TabsTrigger>
        </TabsList>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEngagements.map((engagement) => (
            <Card key={engagement.id}>
              <CardHeader>
                <CardTitle>{engagement.type}</CardTitle>
                <CardDescription>{engagement.platform}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>{engagement.description}</p>
                <div className="flex items-center justify-between">
                  <Badge>{engagement.points} Points</Badge>
                  {engagement.status === "available" && (
                    <Button size="sm">Start</Button>
                  )}
                  {engagement.status === "in-progress" && (
                    <Button size="sm" variant="secondary">
                      Complete
                    </Button>
                  )}
                  {engagement.status === "completed" && (
                    <Badge variant="outline">Completed</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default EngagementPage;
