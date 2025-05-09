
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  Heart, 
  MessageSquare, 
  MoreHorizontal, 
  Search, 
  Share2, 
  Star, 
  Users
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  platforms: string[];
  followers: number;
  following: boolean;
  verified: boolean;
}

interface Post {
  id: string;
  creator: Creator;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
}

const mockCreators: Creator[] = [
  {
    id: "c1",
    name: "Sarah Johnson",
    username: "design_sarah",
    avatar: "/creator1.jpg",
    bio: "UX/UI Designer | Creating beautiful digital experiences",
    platforms: ["Instagram", "Behance"],
    followers: 2543,
    following: true,
    verified: true
  },
  {
    id: "c2",
    name: "Mike Chen",
    username: "mike_codes",
    avatar: "/creator2.jpg",
    bio: "Software Engineer | React & TypeScript enthusiast",
    platforms: ["Twitter", "YouTube"],
    followers: 1876,
    following: false,
    verified: false
  },
  {
    id: "c3",
    name: "Emma Wilson",
    username: "emma_creates",
    avatar: "/creator3.jpg",
    bio: "Digital Artist | Motion Graphics | Animation",
    platforms: ["Instagram", "TikTok"],
    followers: 5432,
    following: true,
    verified: true
  },
  {
    id: "c4",
    name: "Alex Rodriguez",
    username: "tech_alex",
    avatar: "/creator4.jpg",
    bio: "Tech Reviewer | Gadget Enthusiast | Web Developer",
    platforms: ["YouTube", "Twitter"],
    followers: 10200,
    following: false,
    verified: true
  },
  {
    id: "c5",
    name: "Jordan Taylor",
    username: "j_taylor",
    avatar: "/creator5.jpg",
    bio: "Content Creator | Photography | Travel Vlogs",
    platforms: ["Instagram", "YouTube"],
    followers: 3678,
    following: false,
    verified: false
  }
];

const mockPosts: Post[] = [
  {
    id: "p1",
    creator: mockCreators[0],
    content: "Just launched my new portfolio website! Check it out and let me know your thoughts 🚀 #WebDesign #Portfolio",
    likes: 48,
    comments: 12,
    timestamp: "2023-05-18T14:32:00Z",
    liked: true
  },
  {
    id: "p2",
    creator: mockCreators[2],
    content: "New animation project in the works. Here's a sneak peek! #Animation #MotionGraphics",
    image: "/post-image1.jpg",
    likes: 126,
    comments: 24,
    timestamp: "2023-05-17T09:15:00Z",
    liked: false
  },
  {
    id: "p3",
    creator: mockCreators[3],
    content: "Reviewing the latest MacBook Pro. Is it worth the upgrade? Full video on my channel now! #TechReview #Apple",
    likes: 87,
    comments: 31,
    timestamp: "2023-05-16T18:45:00Z",
    liked: true
  }
];

const CommunityPage = () => {
  const [creators, setCreators] = useState(mockCreators);
  const [posts, setPosts] = useState(mockPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const handleFollowToggle = (creatorId: string) => {
    setCreators(prev => 
      prev.map(creator => 
        creator.id === creatorId 
          ? { ...creator, following: !creator.following } 
          : creator
      )
    );
  };
  
  const handleLikePost = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1 
            } 
          : post
      )
    );
  };
  
  const filteredCreators = creators.filter(creator => {
    if (searchTerm) {
      return (
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filter === "following") {
      return creator.following;
    }
    
    if (filter === "verified") {
      return creator.verified;
    }
    
    return true;
  });
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 24 * 60) {
      return `${Math.floor(diffMins / 60)}h ago`;
    } else {
      return `${Math.floor(diffMins / (60 * 24))}d ago`;
    }
  };

  return (
    <DashboardLayout title="Community">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Community</h1>
            <p className="text-muted-foreground">Connect with other creators and engage with their content</p>
          </div>
        </div>
        
        <Tabs defaultValue="discover" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search creators..."
                className="w-[200px] pl-8 sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="discover">
            <div className="mb-4">
              <ToggleGroup type="single" value={filter} onValueChange={(value) => value && setFilter(value)}>
                <ToggleGroupItem value="all" className="text-sm">All Creators</ToggleGroupItem>
                <ToggleGroupItem value="following" className="text-sm">Following</ToggleGroupItem>
                <ToggleGroupItem value="verified" className="text-sm">Verified</ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCreators.length > 0 ? (
                filteredCreators.map((creator) => (
                  <Card key={creator.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={creator.avatar} alt={creator.name} />
                            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1">
                              <CardTitle className="text-base">{creator.name}</CardTitle>
                              {creator.verified && (
                                <CheckCircle className="h-4 w-4 text-blue-500 fill-blue-500" />
                              )}
                            </div>
                            <CardDescription>@{creator.username}</CardDescription>
                          </div>
                        </div>
                        <Button 
                          variant={creator.following ? "outline" : "default"} 
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handleFollowToggle(creator.id)}
                        >
                          {creator.following ? "Following" : "Follow"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">{creator.bio}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {creator.platforms.map((platform) => (
                          <Badge key={platform} variant="secondary" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{creator.followers.toLocaleString()} followers</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">No creators found</p>
                  {searchTerm && (
                    <Button variant="ghost" onClick={() => setSearchTerm("")} className="mt-2">
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="feed">
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.creator.avatar} alt={post.creator.name} />
                          <AvatarFallback>{post.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <CardTitle className="text-sm font-medium">{post.creator.name}</CardTitle>
                            {post.creator.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-500 fill-blue-500" />
                            )}
                          </div>
                          <CardDescription className="text-xs">@{post.creator.username}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm mb-3">{post.content}</p>
                    {post.image && (
                      <div className="rounded-md overflow-hidden mb-3">
                        <img src={post.image} alt="Post" className="w-full h-auto" />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs h-8 gap-1"
                          onClick={() => handleLikePost(post.id)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${post.liked ? "fill-red-500 text-red-500" : ""}`} 
                          />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs h-8 gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                      </div>
                      <div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="groups">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-base">UX/UI Designers</CardTitle>
                  </div>
                  <CardDescription>A community for UX/UI designers to share work and feedback</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <Avatar key={i} className="h-7 w-7 border-2 border-background">
                          <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">1.2k members</span>
                  </div>
                  <Button className="w-full">
                    Join Group
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Code className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-base">Frontend Developers</CardTitle>
                  </div>
                  <CardDescription>Share tips, resources, and help each other with code</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <Avatar key={i} className="h-7 w-7 border-2 border-background">
                          <AvatarFallback className="text-xs">F{i}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">876 members</span>
                  </div>
                  <Button className="w-full">
                    Join Group
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-base">Content Creators</CardTitle>
                  </div>
                  <CardDescription>For video creators to collaborate and share tips</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Avatar key={i} className="h-7 w-7 border-2 border-background">
                          <AvatarFallback className="text-xs">C{i}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">2.5k members</span>
                  </div>
                  <Button className="w-full">
                    Join Group
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Import the Code and Video icons for the groups
const Code = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const Video = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
    <path d="m22 8-6 4 6 4V8Z"></path>
  </svg>
);

export default CommunityPage;
