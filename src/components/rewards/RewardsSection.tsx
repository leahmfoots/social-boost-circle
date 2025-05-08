
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Lock } from "lucide-react";
import { Reward } from "@/types/rewards";

interface RewardsSectionProps {
  rewards: Reward[];
  userPoints: number;
  onClaimReward: (reward: Reward) => void;
}

const RewardsSection = ({ rewards, userPoints, onClaimReward }: RewardsSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map(reward => (
          <Card key={reward.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-1">
                {reward.category}
              </Badge>
              <div className="text-sm font-medium mt-1">
                {reward.pointsRequired} points required
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                disabled={userPoints < reward.pointsRequired}
                onClick={() => onClaimReward(reward)}
              >
                {userPoints >= reward.pointsRequired ? (
                  "Claim Reward"
                ) : (
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Need {reward.pointsRequired - userPoints} more points</span>
                  </div>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RewardsSection;
