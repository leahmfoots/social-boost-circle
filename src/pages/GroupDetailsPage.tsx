
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Users, MessageSquare, Share2, Settings, UserPlus, Crown } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import GroupPost from "@/components/community/GroupPost";
import GroupMemberList from "@/components/community/GroupMemberList";
import { GroupPost as GroupPostType, GroupMember } from "@/types/user";

interface GroupDetails {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  isPrivate: boolean;
  creator: {
    id: string;
    username: string;
    avatar?: string;
  };
  joinedAt?: string;
  isMember: boolean;
  isAdmin: boolean;
}

const mockGroup: GroupDetails = {
  id: "1",
  name: "Content Creators Hub",
  description: "A community for content creators to share tips, collaborate, and grow together. Share your experiences, ask questions, and connect with fellow creators.",
  memberCount: 247,
  category: "Content Creation",
  isPrivate: false,
  creator: {
    id: "creator1",
    username: "content_master",
    avatar: "/creator1.jpg"
  },
  joinedAt: "2023-04-15",
  isMember: true,
  isAdmin: false
};

const mockPosts: GroupPostType[] = [
  {
    id: "p1",
    author: {
      id: "u1",
      name: "Video Creator",
      username: "video_creator",
      avatar: "/user1.jpg"
    },
    content: "Just hit 10k subscribers! 🎉 Here are my top 5 tips for growing your YouTube channel: 1) Consistency is key 2) Engage with your audience 3) Quality over quantity 4) Use trending hashtags 5) Collaborate with others",
    createdAt: "2023-05-15T14:30:00Z",
    likes: 45,
    comments: 12,
    isLiked: false
  },
  {
    id: "p2",
    author: {
      id: "u2",
      name: "Design Guru",
      username: "design_guru",
      avatar: "/user2.jpg"
    },
    content: "Quick question for the community: What's your favorite tool for creating thumbnails? I've been using Canva but looking for alternatives that might offer more flexibility.",
    createdAt: "2023-05-15T11:15:00Z",
    likes: 23,
    comments: 8,
    isLiked: true
  }
];

const mockMembers: GroupMember[] = [
  {
    id: "u1",
    name: "Video Creator",
    username: "video_creator",
    avatar: "/user1.jpg",
    role: "admin",
    joinedAt: "2023-04-15T10:00:00Z"
  },
  {
    id: "u2",
    name: "Design Guru",
    username: "design_guru",
    avatar: "/user2.jpg",
    role: "moderator",
    joinedAt: "2023-04-20T14:30:00Z"
  },
  {
    id: "u3",
    name: "Content Master",
    username: "content_master",
    role: "member",
    joinedAt: "2023-05-01T09:15:00Z"
  }
];

const GroupDetailsPage = () => {
  const { id } = useParams();
  const [group] = useState(mockGroup);
  const [posts, setPosts] = useState(mockPosts);
  const [members] = useState(mockMembers);
  const [newPost, setNewPost] = useState("");
  const [isMember, setIsMember] = useState(group.isMember);

  const handleJoinGroup = () => {
    setIsMember(true);
    toast.success(`Joined ${group.name}!`);
  };

  const handleLeaveGroup = () => {
    setIsMember(false);
    toast.success(`Left ${group.name}`);
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    const post: GroupPostType = {
      id: `p${posts.length + 1}`,
      author: {
        id: "current_user",
        name: "You",
        username: "you"
      },
      content: newPost,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setPosts(prev => [post, ...prev]);
    setNewPost("");
    toast.success("Post shared with the group!");
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleRemoveMember = (memberId: string) => {
    toast.success("Member removed from group");
  };

  const handlePromoteMember = (memberId: string, role: 'member' | 'moderator' | 'admin') => {
    toast.success(`Member promoted to ${role}`);
  };

  return (
    <DashboardLayout title={`Group: ${group.name}`}>
      <div className="space-y-6">
        {/* Group Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xl font-bold">
                  {group.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{group.name}</h1>
                    <Badge variant={group.isPrivate ? "secondary" : "default"}>
                      {group.isPrivate ? "Private" : "Public"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{group.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{group.memberCount} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Crown className="h-4 w-4" />
                      <span>Created by @{group.creator.username}</span>
                    </div>
                    <Badge variant="outline">{group.category}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isMember ? (
                  <>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" onClick={handleLeaveGroup}>
                      Leave Group
                    </Button>
                    {group.isAdmin && (
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    )}
                  </>
                ) : (
                  <Button onClick={handleJoinGroup}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Join Group
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {isMember && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Share with the group</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="What would you like to share with the group?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {posts.map((post) => (
                <GroupPost
                  key={post.id}
                  post={post}
                  onLike={() => handleLikePost(post.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <GroupMemberList 
              members={members}
              isAdmin={group.isAdmin}
              onRemoveMember={handleRemoveMember}
              onPromoteMember={handlePromoteMember}
            />
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About this group</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{group.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Group Rules</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Be respectful and supportive of other members</li>
                    <li>• No spam or self-promotion without context</li>
                    <li>• Share valuable content and insights</li>
                    <li>• Help others when you can</li>
                    <li>• Stay on topic and relevant to content creation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Group Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{group.memberCount}</div>
                      <div className="text-sm text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{posts.length}</div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">15</div>
                      <div className="text-sm text-muted-foreground">Active Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">4.8</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Created</h3>
                  <p className="text-muted-foreground">
                    {new Date(group.joinedAt || "2023-01-01").toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default GroupDetailsPage;
