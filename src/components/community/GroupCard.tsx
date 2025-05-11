
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Users, MessageSquare, Calendar, Pin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Group } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GroupCardProps {
  group: Group;
  onJoinToggle?: (groupId: string, isJoined: boolean) => void;
  compact?: boolean;
}

const GroupCard = ({ group, onJoinToggle, compact = false }: GroupCardProps) => {
  const [isJoined, setIsJoined] = useState(group.isJoined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleJoinToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      setIsLoading(true);
      // In a real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network request
      
      const newJoinState = !isJoined;
      setIsJoined(newJoinState);
      
      if (onJoinToggle) {
        onJoinToggle(group.id, newJoinState);
      }
      
      toast.success(
        newJoinState 
          ? `You have joined "${group.name}"` 
          : `You have left "${group.name}"`
      );
    } catch (error) {
      toast.error("Failed to update group membership. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewGroup = () => {
    navigate(`/dashboard/community/groups/${group.id}`);
  };
  
  // Format date to "Month Day, Year"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format relative time for last activity
  const formatRelativeTime = (dateString?: string) => {
    if (!dateString) return "No recent activity";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };
  
  if (compact) {
    return (
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleViewGroup}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-base">{group.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Users className="h-3 w-3 mr-1" />
                <span>{group.memberCount}</span>
                <MessageSquare className="h-3 w-3 ml-2 mr-1" />
                <span>{group.postCount}</span>
              </div>
            </div>
            
            <Button
              variant={isJoined ? "outline" : "default"}
              size="sm"
              className="ml-2"
              onClick={handleJoinToggle}
              disabled={isLoading}
            >
              {isJoined ? "Leave" : "Join"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleViewGroup}>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-2">
            <h3 className="font-medium text-lg">{group.name}</h3>
            {group.isPinned && <Pin className="h-4 w-4 text-amber-500" />}
          </div>
          <Badge variant="outline">{group.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {group.description}
        </p>
        
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{group.memberCount} members</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{group.postCount} posts</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Created {formatDate(group.createdAt)}</span>
          </div>
          
          {group.lastActivity && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Active {formatRelativeTime(group.lastActivity)}</span>
            </div>
          )}
        </div>
        
        {group.admin && (
          <div className="mt-3 flex items-center">
            <span className="text-xs text-muted-foreground mr-2">Admin:</span>
            <Avatar className="h-5 w-5 mr-1">
              <AvatarImage src={group.admin.avatar} />
              <AvatarFallback>{group.admin.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{group.admin.name}</span>
          </div>
        )}
        
        {group.tags && group.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {group.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant={isJoined ? "outline" : "default"}
          size="sm"
          className="w-full"
          onClick={handleJoinToggle}
          disabled={isLoading}
        >
          {isJoined ? "Leave Group" : "Join Group"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
