
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserPlus, UserMinus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreatorProfile } from "@/types/user";

interface CreatorCardProps {
  creator: CreatorProfile;
  onFollowToggle?: (creatorId: string, isFollowing: boolean) => void;
}

const CreatorCard = ({ creator, onFollowToggle }: CreatorCardProps) => {
  const [isFollowing, setIsFollowing] = useState(creator.isFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleFollowToggle = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network request
      
      const newFollowState = !isFollowing;
      setIsFollowing(newFollowState);
      
      if (onFollowToggle) {
        onFollowToggle(creator.id, newFollowState);
      }
      
      toast.success(
        newFollowState 
          ? `You are now following ${creator.name}` 
          : `You have unfollowed ${creator.name}`
      );
    } catch (error) {
      toast.error("Failed to update follow status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewProfile = () => {
    navigate(`/dashboard/community/creators/${creator.id}`);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div 
          className="h-24 bg-gradient-to-r from-purple-400 to-pink-500" 
          aria-hidden="true"
        />
      </CardHeader>
      <CardContent className="pt-0 -mt-12">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{getInitials(creator.name)}</AvatarFallback>
          </Avatar>
          
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <h3 className="font-medium text-lg">{creator.name}</h3>
              {creator.verified && (
                <Badge variant="outline" className="text-blue-500 border-blue-500">
                  Verified
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">@{creator.username}</p>
            
            {creator.bio && (
              <p className="mt-2 text-sm line-clamp-2">{creator.bio}</p>
            )}
            
            <div className="mt-3 flex justify-center gap-4 text-sm">
              <div>
                <p className="font-medium">{creator.followers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="font-medium">{creator.following.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1 justify-center">
              {creator.platforms.map((platform) => (
                <Badge key={platform} variant="secondary" className="text-xs">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-between">
        <Button 
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          className="w-full"
          onClick={handleFollowToggle}
          disabled={isLoading}
        >
          {isFollowing ? (
            <>
              <UserMinus className="h-4 w-4 mr-1" />
              Unfollow
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-1" />
              Follow
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleViewProfile}
        >
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only">View Profile</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatorCard;
