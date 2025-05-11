
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Users, MessageSquare, Plus } from "lucide-react";
import { Group, CreatorProfile, GroupPost as GroupPostType } from "@/types/user";
import CreatorCard from "@/components/community/CreatorCard";
import GroupCard from "@/components/community/GroupCard";
import GroupPost from "@/components/community/GroupPost";

// Mock data for creators
const mockCreators: CreatorProfile[] = [
  {
    id: "creator1",
    name: "Emma Wilson",
    username: "design_emma",
    email: "emma@example.com",
    bio: "UX/UI Designer | Creating beautiful digital experiences",
    avatar: undefined,
    followers: 2543,
    following: 345,
    platforms: ["Instagram", "Behance", "Dribbble"],
    verified: true,
    isFollowing: false,
    points: 1250,
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "creator2",
    name: "Alex Chen",
    username: "alex_codes",
    email: "alex@example.com",
    bio: "Software Engineer | React & TypeScript enthusiast",
    avatar: undefined,
    followers: 1876,
    following: 230,
    platforms: ["Twitter", "GitHub", "YouTube"],
    verified: false,
    isFollowing: true,
    points: 980,
    createdAt: "2023-02-10T14:45:00Z"
  },
  {
    id: "creator3",
    name: "Sarah Johnson",
    username: "social_sarah",
    email: "sarah@example.com",
    bio: "Social Media Manager | Content Creator | Photography Lover",
    avatar: undefined,
    followers: 5230,
    following: 625,
    platforms: ["Instagram", "TikTok", "YouTube"],
    verified: true,
    isFollowing: false,
    points: 2150,
    createdAt: "2023-03-05T09:15:00Z"
  },
  {
    id: "creator4",
    name: "Michael Brown",
    username: "mike_writes",
    email: "michael@example.com",
    bio: "Content Writer | Storyteller | Book Enthusiast",
    avatar: undefined,
    followers: 1230,
    following: 540,
    platforms: ["LinkedIn", "Twitter", "Medium"],
    verified: false,
    isFollowing: false,
    points: 760,
    createdAt: "2023-04-20T16:30:00Z"
  },
  {
    id: "creator5",
    name: "Jennifer Lee",
    username: "jen_videos",
    email: "jennifer@example.com",
    bio: "Video Creator | Editor | Animation Expert",
    avatar: undefined,
    followers: 8450,
    following: 310,
    platforms: ["YouTube", "TikTok", "Instagram"],
    verified: true,
    isFollowing: true,
    points: 3240,
    createdAt: "2023-01-25T11:20:00Z"
  },
  {
    id: "creator6",
    name: "David Moore",
    username: "dave_tech",
    email: "david@example.com",
    bio: "Tech Reviewer | Gadget Enthusiast | Programmer",
    avatar: undefined,
    followers: 4120,
    following: 215,
    platforms: ["YouTube", "Twitter", "GitHub"],
    verified: false,
    isFollowing: false,
    points: 1870,
    createdAt: "2023-02-18T08:40:00Z"
  }
];

// Mock data for groups
const mockGroups: Group[] = [
  {
    id: "group1",
    name: "UX/UI Design Community",
    description: "A community for UX/UI designers to share work, get feedback, and discuss design trends.",
    memberCount: 2458,
    postCount: 342,
    category: "Design",
    isJoined: true,
    createdAt: "2023-01-10T08:30:00Z"
  },
  {
    id: "group2",
    name: "React Developers",
    description: "Connect with fellow React developers. Share projects, ask questions, and collaborate.",
    memberCount: 3672,
    postCount: 563,
    category: "Development",
    isJoined: false,
    createdAt: "2023-02-05T14:20:00Z"
  },
  {
    id: "group3",
    name: "Content Creator Hub",
    description: "For content creators across all platforms to network, share tips, and grow together.",
    memberCount: 5241,
    postCount: 872,
    category: "Content Creation",
    isJoined: false,
    createdAt: "2023-03-15T10:45:00Z"
  },
  {
    id: "group4",
    name: "Social Media Strategies",
    description: "Discuss effective social media strategies, algorithms, and growth tactics.",
    memberCount: 1872,
    postCount: 293,
    category: "Marketing",
    isJoined: true,
    createdAt: "2023-04-01T09:10:00Z"
  },
  {
    id: "group5",
    name: "Freelance Network",
    description: "A community for freelancers to share opportunities, advice, and support.",
    memberCount: 2134,
    postCount: 415,
    category: "Freelancing",
    isJoined: false,
    createdAt: "2023-02-20T15:30:00Z"
  },
  {
    id: "group6",
    name: "Tech Industry Insights",
    description: "Stay updated on tech industry trends, news, and career opportunities.",
    memberCount: 4287,
    postCount: 632,
    category: "Technology",
    isJoined: true,
    createdAt: "2023-01-30T11:15:00Z"
  }
];

// Mock data for feed posts
const mockFeedPosts: GroupPostType[] = [
  {
    id: "post1",
    content: "Just published a new tutorial on React hooks! Check it out and let me know what you think. This covers useState, useEffect, useContext, and some custom hooks patterns that have been really useful in my projects.\n\nhttps://example.com/react-hooks-tutorial",
    author: {
      id: "creator2",
      name: "Alex Chen",
      username: "alex_codes",
      avatar: undefined
    },
    createdAt: "2023-05-18T09:30:00Z",
    likes: 45,
    comments: 12,
    isLiked: false
  },
  {
    id: "post2",
    content: "Excited to share my latest UI design project! I've been working on a new dashboard interface for a productivity app. Would love to get some feedback from fellow designers.",
    author: {
      id: "creator1",
      name: "Emma Wilson",
      username: "design_emma",
      avatar: undefined
    },
    createdAt: "2023-05-17T14:45:00Z",
    likes: 72,
    comments: 23,
    isLiked: true
  },
  {
    id: "post3",
    content: "What's your favorite tool for video editing? I've been using Adobe Premiere Pro for years but I'm curious if there are better alternatives out there for content creators.",
    author: {
      id: "creator5",
      name: "Jennifer Lee",
      username: "jen_videos",
      avatar: undefined
    },
    createdAt: "2023-05-16T16:20:00Z",
    likes: 31,
    comments: 45,
    isLiked: false
  },
  {
    id: "post4",
    content: "Just hit 5,000 followers on Twitter! Thank you to everyone who's supported my content. Here are 5 lessons I've learned on this journey:\n\n1. Consistency is key\n2. Engage with your audience\n3. Provide value before asking for anything\n4. Collaborate with others\n5. Stay authentic to your voice",
    author: {
      id: "creator3",
      name: "Sarah Johnson",
      username: "social_sarah",
      avatar: undefined
    },
    createdAt: "2023-05-15T11:10:00Z",
    likes: 124,
    comments: 37,
    isLiked: true
  }
];

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [creators, setCreators] = useState<CreatorProfile[]>(mockCreators);
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [feedPosts, setFeedPosts] = useState<GroupPostType[]>(mockFeedPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [creatorFilter, setCreatorFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Filter creators based on search term and filter
    const filteredCreators = mockCreators.filter(creator => {
      const matchesSearch = 
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.bio?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = 
        creatorFilter === "all" ||
        (creatorFilter === "following" && creator.isFollowing) ||
        (creatorFilter === "verified" && creator.verified);
      
      return matchesSearch && matchesFilter;
    });
    
    setCreators(filteredCreators);
  }, [searchTerm, creatorFilter]);
  
  useEffect(() => {
    // Filter groups based on search term and filter
    const filteredGroups = mockGroups.filter(group => {
      const matchesSearch = 
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = 
        groupFilter === "all" ||
        (groupFilter === "joined" && group.isJoined);
      
      return matchesSearch && matchesFilter;
    });
    
    setGroups(filteredGroups);
  }, [searchTerm, groupFilter]);
  
  const handleFollowToggle = (creatorId: string, isFollowing: boolean) => {
    setCreators(prev => 
      prev.map(creator => 
        creator.id === creatorId 
          ? { ...creator, isFollowing }
          : creator
      )
    );
  };
  
  const handleJoinToggle = (groupId: string, isJoined: boolean) => {
    setGroups(prev => 
      prev.map(group => 
        group.id === groupId 
          ? { ...group, isJoined }
          : group
      )
    );
  };
  
  const handleLikePost = (postId: string, isLiked: boolean) => {
    setFeedPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked,
              likes: isLiked ? post.likes + 1 : post.likes - 1 
            }
          : post
      )
    );
  };
  
  const handleLoadMore = async () => {
    setIsLoading(true);
    
    // Simulate loading more content
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
  };

  return (
    <DashboardLayout title="Community">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Community</h1>
            <p className="text-muted-foreground">
              Connect with creators, join groups, and share your thoughts
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search community..."
                className="w-[200px] sm:w-[300px] pl-8"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <TabsContent value="feed" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Your Feed</h2>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Post
                </Button>
              </div>
              
              {feedPosts.length > 0 ? (
                <div className="grid gap-4">
                  {feedPosts.map(post => (
                    <GroupPost 
                      key={post.id}
                      post={post}
                      onLike={handleLikePost}
                    />
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No posts yet</h3>
                    <p className="text-muted-foreground text-center mt-1">
                      Follow creators or join groups to see content in your feed
                    </p>
                    <div className="flex mt-4 gap-2">
                      <Button onClick={() => setActiveTab("creators")}>Find Creators</Button>
                      <Button variant="outline" onClick={() => setActiveTab("groups")}>
                        Join Groups
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="creators">
              <div className="flex flex-col-reverse sm:flex-row gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={creatorFilter === "all" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setCreatorFilter("all")}
                  >
                    All Creators
                  </Badge>
                  <Badge 
                    variant={creatorFilter === "following" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setCreatorFilter("following")}
                  >
                    Following
                  </Badge>
                  <Badge 
                    variant={creatorFilter === "verified" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setCreatorFilter("verified")}
                  >
                    Verified
                  </Badge>
                </div>
                
                <div className="ml-auto">
                  <Select defaultValue="suggested">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suggested">Suggested</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="recent">Recently Joined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {creators.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {creators.map(creator => (
                    <CreatorCard 
                      key={creator.id} 
                      creator={creator} 
                      onFollowToggle={handleFollowToggle}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Users className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No creators found</h3>
                    <p className="text-muted-foreground text-center mt-1">
                      {searchTerm 
                        ? "Try adjusting your search or filters"
                        : "We couldn't find any creators matching your filters"}
                    </p>
                    {(searchTerm || creatorFilter !== "all") && (
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchTerm("");
                          setCreatorFilter("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="groups">
              <div className="flex flex-col-reverse sm:flex-row gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={groupFilter === "all" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setGroupFilter("all")}
                  >
                    All Groups
                  </Badge>
                  <Badge 
                    variant={groupFilter === "joined" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setGroupFilter("joined")}
                  >
                    Joined
                  </Badge>
                </div>
                
                <div className="ml-auto flex gap-2">
                  <Select defaultValue="popular">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="active">Most Active</SelectItem>
                      <SelectItem value="new">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Create Group
                  </Button>
                </div>
              </div>
              
              {groups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {groups.map(group => (
                    <GroupCard 
                      key={group.id} 
                      group={group} 
                      onJoinToggle={handleJoinToggle}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Users className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No groups found</h3>
                    <p className="text-muted-foreground text-center mt-1">
                      {searchTerm 
                        ? "Try adjusting your search or filters"
                        : "We couldn't find any groups matching your filters"}
                    </p>
                    {(searchTerm || groupFilter !== "all") && (
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchTerm("");
                          setGroupFilter("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;
