
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Users, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Group } from "@/types/user";

interface GroupCardProps {
  group: Group;
  onJoinToggle?: (groupId: string, isJoined: boolean) => void;
}

const GroupCard = ({ group, onJoinToggle }: GroupCardProps) => {
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
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleViewGroup}>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{group.name}</h3>
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
        
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>Created {formatDate(group.createdAt)}</span>
        </div>
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
