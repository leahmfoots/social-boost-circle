
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, Link as LinkIcon } from "lucide-react";
import { Opportunity } from "@/types/engagement";

interface EngagementOpportunityProps {
  opportunity: Opportunity;
  onEngage: (id: string) => void;
}

const EngagementOpportunity = ({ opportunity, onEngage }: EngagementOpportunityProps) => {
  // Map platform to icon color
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return 'text-red-600';
      case 'instagram': return 'text-pink-600';
      case 'twitter': return 'text-blue-400';
      case 'tiktok': return 'text-black';
      case 'linkedin': return 'text-blue-700';
      case 'facebook': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-muted`}>
            <LinkIcon className={`h-5 w-5 ${getPlatformColor(opportunity.platform)}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{opportunity.platform}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" /> {opportunity.timeRequired}
              </div>
            </div>
            <h3 className="font-medium mb-1">{opportunity.title}</h3>
            <p className="text-sm text-muted-foreground">
              by @{opportunity.username} • {opportunity.contentType}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between">
        <div className="flex items-center text-sm">
          <Award className="h-4 w-4 mr-1 text-primary" />
          <span className="font-medium">{opportunity.points} points</span>
        </div>
        <Button size="sm" onClick={() => onEngage(opportunity.id)}>
          Engage Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EngagementOpportunity;
