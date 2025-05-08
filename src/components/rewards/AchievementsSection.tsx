
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Achievement } from "@/types/rewards";

interface AchievementsSectionProps {
  achievements: Achievement[];
  onClaimAchievement: (achievementId: string) => void;
}

const AchievementsSection = ({ achievements, onClaimAchievement }: AchievementsSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map(achievement => (
          <Card key={achievement.id}>
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {achievement.icon}
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  {achievement.title}
                  {achievement.completed && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Completed
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{achievement.progress}%</span>
                </div>
                <Progress value={achievement.progress} />
              </div>
              {achievement.completed && (
                <div className="mt-3 text-sm font-medium">
                  {achievement.claimed ? (
                    <Badge>Claimed ({achievement.pointsAwarded} points)</Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => onClaimAchievement(achievement.id)}
                    >
                      Claim {achievement.pointsAwarded} points
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
