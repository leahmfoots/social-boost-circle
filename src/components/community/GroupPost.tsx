
import { useState } from "react";
import { toast } from "sonner";
import { ThumbsUp, MessageSquare, Share, MoreHorizontal, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GroupPost as GroupPostType, Comment } from "@/types/user";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface GroupPostProps {
  post: GroupPostType;
  onLike?: (postId: string, isLiked: boolean) => void;
}

const GroupPost = ({ post, onLike }: GroupPostProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    if (onLike) {
      onLike(post.id, newLikedState);
    }
  };
  
  const handleToggleComments = async () => {
    if (!showComments && comments.length === 0) {
      try {
        setIsLoadingComments(true);
        // In a real implementation, this would fetch comments from an API
        await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network request
        
        // Mock comments data
        const mockComments: Comment[] = [
          {
            id: "c1",
            content: "Great post! Thanks for sharing.",
            author: {
              id: "u1",
              name: "Jane Smith",
              username: "janesmith",
              avatar: undefined
            },
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            likes: 2,
            isLiked: false
          },
          {
            id: "c2",
            content: "I found this really helpful. Looking forward to more content like this!",
            author: {
              id: "u2",
              name: "Mike Johnson",
              username: "mikej",
              avatar: undefined
            },
            createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
            likes: 5,
            isLiked: true
          }
        ];
        
        setComments(mockComments);
      } catch (error) {
        toast.error("Failed to load comments. Please try again.");
      } finally {
        setIsLoadingComments(false);
      }
    }
    
    setShowComments(!showComments);
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // Create a new comment
    const newCommentObj: Comment = {
      id: `c${Date.now()}`,
      content: newComment,
      author: {
        id: "current-user",
        name: "Current User",
        username: "currentuser",
        avatar: undefined
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    toast.success("Comment added");
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
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
    <Card>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>@{post.author.username}</span>
                <span className="mx-1">•</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{formatTime(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Report post</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-col">
        <div className="flex items-center justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike}
            className={isLiked ? "text-blue-500" : ""}
          >
            <ThumbsUp className="h-4 w-4 mr-1" fill={isLiked ? "currentColor" : "none"} />
            {likesCount > 0 && <span>{likesCount}</span>}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleToggleComments}>
            <MessageSquare className="h-4 w-4 mr-1" />
            {post.comments > 0 && <span>{post.comments}</span>}
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
        
        {showComments && (
          <div className="mt-4 w-full">
            <form onSubmit={handleSubmitComment} className="flex gap-2 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>CU</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                />
                <Button size="sm" type="submit" disabled={!newComment.trim()}>
                  Post
                </Button>
              </div>
            </form>
            
            {isLoadingComments ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{getInitials(comment.author.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted p-2 rounded-md">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">@{comment.author.username}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center mt-1 gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-auto p-0 text-xs ${comment.isLiked ? 'text-blue-500' : 'text-muted-foreground'}`}
                        >
                          Like {comment.likes > 0 && `(${comment.likes})`}
                        </Button>
                        <span className="text-xs text-muted-foreground">{formatTime(comment.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default GroupPost;
