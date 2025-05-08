
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users, MessageSquare, Award, Check } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

// Sample creators data
const creatorsData = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alexcreative",
    avatar: "/placeholder.svg",
    points: 2450,
    followers: 12500,
    bio: "Digital content creator specializing in tech reviews and tutorials.",
    platforms: ["YouTube", "Instagram", "Twitter"],
    tags: ["Tech", "Reviews", "Tutorials"],
    isFollowing: true
  },
  {
    id: "2",
    name: "Samantha Lee",
    username: "samcreates",
    avatar: "/placeholder.svg",
    points: 1890,
    followers: 8700,
    bio: "Lifestyle blogger sharing travel, fashion, and food experiences.",
    platforms: ["Instagram", "TikTok"],
    tags: ["Lifestyle", "Travel", "Fashion"],
    isFollowing: false
  },
  {
    id: "3",
    name: "Marcus Williams",
    username: "marcusfilm",
    avatar: "/placeholder.svg",
    points: 3200,
    followers: 15800,
    bio: "Filmmaker and photographer telling stories through visual media.",
    platforms: ["YouTube", "Instagram"],
    tags: ["Film", "Photography", "Storytelling"],
    isFollowing: false
  },
  {
    id: "4",
    name: "Priya Patel",
    username: "priyacooks",
    avatar: "/placeholder.svg",
    points: 1650,
    followers: 7300,
    bio: "Cooking enthusiast sharing quick and easy recipes for busy people.",
    platforms: ["YouTube", "TikTok", "Instagram"],
    tags: ["Cooking", "Recipes", "Food"],
    isFollowing: true
  },
  {
    id: "5",
    name: "David Chen",
    username: "davetechguy",
    avatar: "/placeholder.svg",
    points: 2780,
    followers: 9400,
    bio: "Software developer creating coding tutorials and tech insights.",
    platforms: ["YouTube", "Twitter"],
    tags: ["Coding", "Tech", "Software"],
    isFollowing: false
  },
  {
    id: "6",
    name: "Olivia Martinez",
    username: "livfitness",
    avatar: "/placeholder.svg",
    points: 2100,
    followers: 13200,
    bio: "Personal trainer sharing workouts and wellness tips for all levels.",
    platforms: ["Instagram", "YouTube", "TikTok"],
    tags: ["Fitness", "Wellness", "Health"],
    isFollowing: false
  }
];

// Sample discussions data
const discussionsData = [
  {
    id: "d1",
    title: "Best practices for growing your YouTube channel in 2023",
    author: {
      name: "Alex Johnson",
      username: "alexcreative",
      avatar: "/placeholder.svg"
    },
    replies: 24,
    views: 156,
    lastActive: "2023-05-07T13:45:00Z",
    tags: ["YouTube", "Growth", "Strategy"]
  },
  {
    id: "d2",
    title: "How are you handling Instagram's new algorithm changes?",
    author: {
      name: "Samantha Lee",
      username: "samcreates",
      avatar: "/placeholder.svg"
    },
    replies: 37,
    views: 215,
    lastActive: "2023-05-06T09:22:00Z",
    tags: ["Instagram", "Algorithm", "Strategy"]
  },
  {
    id: "d3",
    title: "Let's share our content calendars and planning strategies",
    author: {
      name: "Priya Patel",
      username: "priyacooks",
      avatar: "/placeholder.svg"
    },
    replies: 18,
    views: 94,
    lastActive: "2023-05-05T17:10:00Z",
    tags: ["Planning", "Content Calendar", "Organization"]
  }
];

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [creators, setCreators] = useState(creatorsData);
  const [discussions, setDiscussions] = useState(discussionsData);
  
  const handleFollow = (creatorId: string) => {
    setCreators(creators.map(creator => 
      creator.id === creatorId 
        ? { ...creator, isFollowing: !creator.isFollowing } 
        : creator
    ));
  };
  
  const filteredCreators = creators.filter(creator => 
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout title="Community">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Creator Community</h1>
        <p className="text-muted-foreground">
          Connect with other content creators, share insights, and grow together.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search creators by name, username, or interest" 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="creators">
        <TabsList className="mb-6">
          <TabsTrigger value="creators">Top Creators</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creators">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map(creator => (
              <Card key={creator.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{creator.name}</CardTitle>
                      <CardDescription>@{creator.username}</CardDescription>
                    </div>
                    <div>
                      <Button 
                        size="sm" 
                        variant={creator.isFollowing ? "outline" : "default"}
                        onClick={() => handleFollow(creator.id)}
                      >
                        {creator.isFollowing ? (
                          <><Check className="h-4 w-4 mr-1" /> Following</>
                        ) : "Follow"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{creator.bio}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {creator.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{creator.followers.toLocaleString()} followers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>{creator.points.toLocaleString()} points</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="discussions">
          {discussions.map(discussion => (
            <Card key={discussion.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>{discussion.title}</CardTitle>
                  <div className="flex gap-2">
                    {discussion.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>Started by {discussion.author.name}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {discussion.replies} replies
                    </span>
                    <span>
                      {discussion.views} views
                    </span>
                  </div>
                  <span>
                    Last active {new Date(discussion.lastActive).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Discussion</Button>
              </CardFooter>
            </Card>
          ))}
          
          <div className="mt-6 text-center">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start New Discussion
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <div className="p-8 text-center">
            <div className="h-20 w-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Users className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">Community Events Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              We're working on bringing virtual and in-person events for content creators.
            </p>
            <Button variant="outline">Get Notified</Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CommunityPage;
