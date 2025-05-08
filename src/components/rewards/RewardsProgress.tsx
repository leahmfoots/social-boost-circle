
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Reward } from "@/types/rewards";

interface RewardsProgressProps {
  rewards: Reward[];
  userPoints: number;
}

const RewardsProgress = ({ rewards, userPoints }: RewardsProgressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Progress</CardTitle>
        <CardDescription>Track your journey to the next reward level</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rewards
          .sort((a, b) => a.pointsRequired - b.pointsRequired)
          .filter(r => r.pointsRequired > userPoints)
          .slice(0, 1)
          .map(nextReward => (
            <div key={nextReward.id} className="space-y-2">
              <div className="flex justify-between">
                <span>Next reward: {nextReward.title}</span>
                <span>{userPoints}/{nextReward.pointsRequired} points</span>
              </div>
              <Progress value={(userPoints / nextReward.pointsRequired) * 100} />
              <p className="text-xs text-muted-foreground">
                {nextReward.pointsRequired - userPoints} more points needed
              </p>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default RewardsProgress;
