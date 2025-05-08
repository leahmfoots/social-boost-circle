
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Gift, Star, TrendingUp, Lock, Shield, Users, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import RewardClaimModal from "@/components/RewardClaimModal";
import { Achievement, Reward } from "@/types/rewards";
import RewardsSection from "@/components/rewards/RewardsSection";
import AchievementsSection from "@/components/rewards/AchievementsSection";
import RewardsProgress from "@/components/rewards/RewardsProgress";

// Sample rewards data
const rewardsData: Reward[] = [
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
const achievementsData: Achievement[] = [
  {
    id: "a1",
    title: "First Steps",
    description: "Complete your first 5 engagements",
    progress: 100,
    icon: <Users />,
    completed: true,
    claimed: true,
    pointsAwarded: 50
  },
  {
    id: "a2",
    title: "Rising Star",
    description: "Reach 100 points in total",
    progress: 100,
    icon: <Star />,
    completed: true,
    claimed: true,
    pointsAwarded: 100
  },
  {
    id: "a3",
    title: "Engagement Expert",
    description: "Complete 25 engagements",
    progress: 60,
    icon: <TrendingUp />,
    completed: false,
    claimed: false,
    pointsAwarded: 200
  },
  {
    id: "a4",
    title: "Platform Master",
    description: "Connect all supported social platforms",
    progress: 33,
    icon: <Shield />,
    completed: false,
    claimed: false,
    pointsAwarded: 300
  }
];

const RewardsPage = () => {
  const [rewards, setRewards] = useState(rewardsData);
  const [achievements, setAchievements] = useState(achievementsData);
  const [showModal, setShowModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [userPoints, setUserPoints] = useState(780);
  
  const handleClaimReward = (reward: Reward) => {
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
        
        <RewardsProgress 
          rewards={rewards}
          userPoints={userPoints}
        />
      </div>
      
      <RewardsSection 
        rewards={rewards}
        userPoints={userPoints}
        onClaimReward={handleClaimReward}
      />
      
      <AchievementsSection 
        achievements={achievements}
        onClaimAchievement={handleClaimAchievement}
      />
      
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
