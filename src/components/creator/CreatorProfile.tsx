
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserPlus, UserMinus, MessageCircle, Share2, Users, Calendar, MapPin, Link, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { CreatorProfile as CreatorProfileType } from "@/types/user";

// Mock data - in real app would fetch from API
const mockCreator: CreatorProfileType = {
  id: "creator-1",
  name: "Sarah Johnson",
  username: "sarahjohnson",
  email: "sarah@example.com",
  bio: "Content creator passionate about lifestyle, travel, and wellness. Sharing my journey one post at a time! 🌟",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  points: 12500,
  createdAt: "2023-01-15T00:00:00Z",
  followers: 85420,
  following: 1250,
  platforms: ["Instagram", "Twitter", "YouTube", "LinkedIn"],
  verified: true,
  isFollowing: false
};

const mockPosts = [
  {
    id: "1",
    content: "Just launched my new morning routine series! Starting with meditation and journaling has been a game-changer for my productivity.",
    author: mockCreator,
    createdAt: "2024-01-10T10:00:00Z",
    likes: 342,
    comments: 28,
    isLiked: false,
    platform: "Instagram",
    image: "https://picsum.photos/400/300?random=1"
  },
  {
    id: "2", 
    content: "Travel tip: Always pack a portable charger and download offline maps before exploring a new city! What's your best travel hack?",
    author: mockCreator,
    createdAt: "2024-01-08T15:30:00Z",
    likes: 156,
    comments: 45,
    isLiked: true,
    platform: "Twitter"
  },
  {
    id: "3",
    content: "New YouTube video is live! '10 Budget-Friendly Home Decor Ideas That Actually Work' - link in bio!",
    author: mockCreator,
    createdAt: "2024-01-05T09:15:00Z",
    likes: 789,
    comments: 67,
    isLiked: false,
    platform: "YouTube",
    image: "https://picsum.photos/400/300?random=2"
  }
];

const CreatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<CreatorProfileType>(mockCreator);
  const [isFollowing, setIsFollowing] = useState(creator.isFollowing);
  const [posts] = useState(mockPosts);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setCreator(prev => ({
      ...prev,
      followers: isFollowing ? prev.followers - 1 : prev.followers + 1,
      isFollowing: !isFollowing
    }));
    toast.success(isFollowing ? "Unfollowed successfully" : "Following successfully");
  };

  const handleMessage = () => {
    navigate(`/dashboard/community/messages/${creator.id}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile link copied to clipboard");
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      default: return <Link className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32 mx-auto md:mx-0">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback className="text-2xl">
                {creator.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{creator.name}</h1>
                {creator.verified && (
                  <Badge variant="secondary" className="w-fit mx-auto md:mx-0">
                    ✓ Verified
                  </Badge>
                )}
              </div>
              
              <p className="text-muted-foreground mb-2">@{creator.username}</p>
              
              <div className="flex justify-center md:justify-start gap-6 mb-4">
                <div className="text-center">
                  <p className="font-bold">{creator.followers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{creator.following.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{creator.points.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Points</p>
                </div>
              </div>
              
              {creator.bio && (
                <p className="text-sm mb-4">{creator.bio}</p>
              )}
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {creator.platforms.map((platform) => (
                  <Badge key={platform} variant="outline" className="flex items-center gap-1">
                    {getPlatformIcon(platform)}
                    {platform}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-center md:justify-start gap-2">
                <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"}>
                  {isFollowing ? (
                    <>
                      <UserMinus className="w-4 h-4 mr-2" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                <Button onClick={handleMessage} variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button onClick={handleShare} variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.createdAt)} • {post.platform}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{post.platform}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.content}</p>
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {post.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments} comments
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About {creator.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Joined {formatDate(creator.createdAt)}</span>
              </div>
              {creator.bio && (
                <div>
                  <h4 className="font-medium mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground">{creator.bio}</p>
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {creator.platforms.map((platform) => (
                    <Badge key={platform} variant="outline" className="flex items-center gap-1">
                      {getPlatformIcon(platform)}
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Early Adopter", description: "Joined in the first month", earned: true },
                  { title: "Social Butterfly", description: "Connected 5+ platforms", earned: true },
                  { title: "Engagement Master", description: "10,000+ total engagements", earned: true },
                  { title: "Community Leader", description: "100+ followers", earned: true },
                  { title: "Content Creator", description: "Posted 50+ times", earned: false },
                  { title: "Verified Creator", description: "Get verified status", earned: true }
                ].map((achievement) => (
                  <div 
                    key={achievement.title}
                    className={`p-4 border rounded-lg ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <Badge variant={achievement.earned ? "default" : "outline"} className="mt-2">
                      {achievement.earned ? "Earned" : "Locked"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorProfile;
