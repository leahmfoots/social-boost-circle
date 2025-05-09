
import { useState } from "react";
import { toast } from "sonner";
import { Award, Gift, Shield, ThumbsUp, TrendingUp, Users } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import RewardsProgress from "@/components/rewards/RewardsProgress";
import RewardsSection from "@/components/rewards/RewardsSection";
import AchievementsSection from "@/components/rewards/AchievementsSection";
import RewardClaimModal from "@/components/RewardClaimModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Reward, Achievement } from "@/types/rewards";

// Mock data
const mockRewards: Reward[] = [
  {
    id: "r1",
    title: "$5 Amazon Gift Card",
    description: "Redeem your points for an Amazon gift card",
    pointsRequired: 500,
    image: "/gift-card.png",
    category: "Gift Card"
  },
  {
    id: "r2",
    title: "Premium Account (1 Month)",
    description: "Upgrade to premium features for one month",
    pointsRequired: 800,
    image: "/premium.png",
    category: "Subscription"
  },
  {
    id: "r3",
    title: "Profile Boost",
    description: "Get your profile featured on the platform for a week",
    pointsRequired: 300,
    image: "/boost.png",
    category: "Promotion"
  },
  {
    id: "r4",
    title: "$10 PayPal Credit",
    description: "Get $10 credit directly to your PayPal account",
    pointsRequired: 1000,
    image: "/paypal.png",
    category: "Cash"
  },
  {
    id: "r5",
    title: "Custom Profile Badge",
    description: "Get a unique badge for your profile",
    pointsRequired: 200,
    image: "/badge.png",
    category: "Customization"
  }
];

const mockAchievements: Achievement[] = [
  {
    id: "a1",
    title: "First Connection",
    description: "Connect your first social media account",
    progress: 100,
    icon: <Users className="h-6 w-6" />,
    completed: true,
    claimed: true,
    pointsAwarded: 50
  },
  {
    id: "a2",
    title: "Engagement Pro",
    description: "Complete 10 engagement activities",
    progress: 70,
    icon: <ThumbsUp className="h-6 w-6" />,
    completed: false,
    claimed: false,
    pointsAwarded: 100
  },
  {
    id: "a3",
    title: "Social Butterfly",
    description: "Connect 3 different social platforms",
    progress: 100,
    icon: <Shield className="h-6 w-6" />,
    completed: true,
    claimed: false,
    pointsAwarded: 75
  },
  {
    id: "a4",
    title: "Trending Creator",
    description: "Get 100+ engagements on your content",
    progress: 45,
    icon: <TrendingUp className="h-6 w-6" />,
    completed: false,
    claimed: false,
    pointsAwarded: 150
  }
];

const RewardsPage = () => {
  const [userPoints, setUserPoints] = useState(350);
  const [achievements, setAchievements] = useState(mockAchievements);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClaimReward = (reward: Reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const handleConfirmClaim = () => {
    if (selectedReward && userPoints >= selectedReward.pointsRequired) {
      setUserPoints(prev => prev - selectedReward.pointsRequired);
      
      toast.success(`You've claimed: ${selectedReward.title}`, {
        description: `${selectedReward.pointsRequired} points have been deducted from your account.`
      });
      
      setIsModalOpen(false);
    }
  };

  const handleClaimAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    
    if (achievement && achievement.completed && !achievement.claimed) {
      // Update the achievement to claimed
      setAchievements(prevAchievements =>
        prevAchievements.map(a =>
          a.id === achievementId ? { ...a, claimed: true } : a
        )
      );
      
      // Add points to user
      setUserPoints(prev => prev + achievement.pointsAwarded);
      
      toast.success(`Achievement Claimed: ${achievement.title}`, {
        description: `You earned ${achievement.pointsAwarded} points!`
      });
    }
  };

  return (
    <DashboardLayout title="Rewards & Achievements">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Rewards & Achievements</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
              <Award className="h-4 w-4 text-primary" />
              <span className="font-medium">{userPoints} points</span>
            </div>
          </div>
        </div>
        
        <RewardsProgress rewards={mockRewards} userPoints={userPoints} />
        
        <Tabs defaultValue="rewards">
          <TabsList className="mb-4">
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Point History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rewards">
            <RewardsSection
              rewards={mockRewards}
              userPoints={userPoints}
              onClaimReward={handleClaimReward}
            />
          </TabsContent>
          
          <TabsContent value="achievements">
            <AchievementsSection
              achievements={achievements}
              onClaimAchievement={handleClaimAchievement}
            />
          </TabsContent>
          
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Points Activity</CardTitle>
                <CardDescription>Track your points earned and spent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-medium mb-2">Points Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-xs text-muted-foreground mb-1">Total Earned</div>
                          <div className="text-2xl font-bold">670</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-xs text-muted-foreground mb-1">Total Spent</div>
                          <div className="text-2xl font-bold">320</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-xs text-muted-foreground mb-1">Current Balance</div>
                          <div className="text-2xl font-bold">{userPoints}</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">Achievement: First Connection</div>
                          <div className="text-sm text-muted-foreground">May 15, 2023</div>
                        </div>
                        <div className="text-green-600">+50 points</div>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">Engagement: React Tutorial Video</div>
                          <div className="text-sm text-muted-foreground">May 10, 2023</div>
                        </div>
                        <div className="text-green-600">+45 points</div>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">Reward: Profile Boost</div>
                          <div className="text-sm text-muted-foreground">May 5, 2023</div>
                        </div>
                        <div className="text-red-600">-300 points</div>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">Engagement: Twitter Thread</div>
                          <div className="text-sm text-muted-foreground">May 1, 2023</div>
                        </div>
                        <div className="text-green-600">+25 points</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <RewardClaimModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        reward={selectedReward}
        userPoints={userPoints}
        onClaim={handleConfirmClaim}
      />
    </DashboardLayout>
  );
};

export default RewardsPage;
