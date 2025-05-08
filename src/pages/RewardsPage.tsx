
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Gift, Star, TrendingUp, Lock, Shield, Users, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import RewardClaimModal from "@/components/RewardClaimModal";

// Sample rewards data
const rewardsData = [
  {
    id: "1",
    title: "Featured Creator Spotlight",
    description: "Get featured on our homepage as a top creator for 24 hours",
    pointsRequired: 500,
    image: "gift-box",
    category: "feature"
  },
  {
    id: "2",
    title: "Premium Account Badge",
    description: "Special badge showing your status as a premium contributor",
    pointsRequired: 1000,
    image: "badge",
    category: "badge"
  },
  {
    id: "3",
    title: "Analytics Pro Access",
    description: "1 month access to advanced analytics and insights",
    pointsRequired: 1500,
    image: "analytics",
    category: "subscription"
  },
  {
    id: "4",
    title: "Engagement Booster",
    description: "Your content gets priority in the engagement feed for 48 hours",
    pointsRequired: 2000,
    image: "boost",
    category: "feature"
  },
  {
    id: "5",
    title: "Expert Creator Badge",
    description: "Exclusive badge indicating your expert-level contribution",
    pointsRequired: 5000,
    image: "expert-badge",
    category: "badge"
  }
];

// Sample achievements data
const achievementsData = [
  {
    id: "a1",
    title: "First Steps",
    description: "Complete your first 5 engagements",
    progress: 100,
    icon: <Users />,
    completed: true,
    pointsAwarded: 50
  },
  {
    id: "a2",
    title: "Rising Star",
    description: "Reach 100 points in total",
    progress: 100,
    icon: <Star />,
    completed: true,
    pointsAwarded: 100
  },
  {
    id: "a3",
    title: "Engagement Expert",
    description: "Complete 25 engagements",
    progress: 60,
    icon: <TrendingUp />,
    completed: false,
    pointsAwarded: 200
  },
  {
    id: "a4",
    title: "Platform Master",
    description: "Connect all supported social platforms",
    progress: 33,
    icon: <Shield />,
    completed: false,
    pointsAwarded: 300
  }
];

const RewardsPage = () => {
  const [rewards, setRewards] = useState(rewardsData);
  const [achievements, setAchievements] = useState(achievementsData);
  const [showModal, setShowModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<typeof rewardsData[0] | null>(null);
  const [userPoints, setUserPoints] = useState(780);
  
  const handleClaimReward = (reward: typeof rewardsData[0]) => {
    setSelectedReward(reward);
    setShowModal(true);
  };
  
  const handleConfirmClaim = () => {
    if (!selectedReward) return;
    
    // Check if user has enough points
    if (userPoints >= selectedReward.pointsRequired) {
      // Deduct points
      setUserPoints(prev => prev - selectedReward.pointsRequired);
      
      toast({
        title: "Reward Claimed!",
        description: `You have successfully claimed ${selectedReward.title}.`,
      });
      
      // Close modal
      setShowModal(false);
    } else {
      toast({
        title: "Not Enough Points",
        description: "You don't have enough points to claim this reward.",
        variant: "destructive"
      });
    }
  };
  
  const handleClaimAchievement = (achievementId: string) => {
    // Find the achievement
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement || !achievement.completed) return;
    
    // Update achievements to mark it as claimed
    setAchievements(prev => prev.map(a => 
      a.id === achievementId ? {...a, claimed: true} : a
    ));
    
    // Add points
    setUserPoints(prev => prev + achievement.pointsAwarded);
    
    toast({
      title: "Achievement Claimed!",
      description: `You earned ${achievement.pointsAwarded} points from ${achievement.title}.`,
    });
  };

  return (
    <DashboardLayout title="Rewards">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Rewards & Achievements</h1>
        <p className="text-muted-foreground">
          Earn points through engagement and redeem them for valuable rewards.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Points</h2>
          <Badge variant="outline" className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            <span>{userPoints} points available</span>
          </Badge>
        </div>
        
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
      </div>
      
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
                  onClick={() => handleClaimReward(reward)}
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
                        onClick={() => handleClaimAchievement(achievement.id)}
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
      
      <RewardClaimModal
        open={showModal}
        onOpenChange={setShowModal}
        reward={selectedReward}
        userPoints={userPoints}
        onClaim={handleConfirmClaim}
      />
    </DashboardLayout>
  );
};

export default RewardsPage;
