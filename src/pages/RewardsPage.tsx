import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Gift, Trophy, Star, Clock, CheckCircle, Plus, Minus } from "lucide-react";
import RewardClaimModal from "@/components/rewards/RewardClaimModal";
import PointsHistory from "@/components/rewards/PointsHistory";
import type { Reward, Achievement, PointsTransaction } from "@/types/rewards";

const mockRewards: Reward[] = [
  {
    id: "1",
    title: "20% Off Coupon",
    description: "Get 20% off your next purchase",
    pointsRequired: 500,
    category: "Discounts",
    available: true,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Exclusive Merchandise",
    description: "Limited edition t-shirt",
    pointsRequired: 1000,
    category: "Merchandise",
    available: true,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    title: "Early Access Pass",
    description: "Get early access to new features",
    pointsRequired: 1500,
    category: "Access",
    available: true,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    title: "Free Coffee",
    description: "Enjoy a free coffee at our partner cafe",
    pointsRequired: 300,
    category: "Food & Drink",
    available: false,
    image: "https://via.placeholder.com/150",
  },
];

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Post",
    description: "Create your first social media post",
    icon: "edit",
    progress: 100,
    completed: true,
    claimed: true,
    pointsAwarded: 50,
  },
  {
    id: "2",
    title: "100 Followers",
    description: "Reach 100 followers on any platform",
    icon: "users",
    progress: 100,
    completed: true,
    claimed: true,
    pointsAwarded: 100,
  },
  {
    id: "3",
    title: "1000 Likes",
    description: "Get 1000 likes on your content",
    icon: "heart",
    progress: 60,
    completed: false,
    claimed: false,
    pointsAwarded: 200,
  },
  {
    id: "4",
    title: "Share Your First Post",
    description: "Share your first social media post",
    icon: "share",
    progress: 40,
    completed: false,
    claimed: false,
    pointsAwarded: 50,
  },
];

const mockPointsHistory: PointsTransaction[] = [
  {
    id: "1",
    userId: "user123",
    amount: 50,
    type: "earned",
    description: "Completed 'First Post' achievement",
    source: "Achievement",
    createdAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "2",
    userId: "user123",
    amount: 100,
    type: "earned",
    description: "Reached 100 followers",
    source: "Achievement",
    createdAt: "2024-01-25T09:15:00Z",
  },
  {
    id: "3",
    userId: "user123",
    amount: -300,
    type: "spent",
    description: "Redeemed 'Free Coffee' reward",
    source: "Reward Redemption",
    createdAt: "2024-02-01T16:45:00Z",
  },
  {
    id: "4",
    userId: "user123",
    amount: 25,
    type: "bonus",
    description: "Daily login bonus",
    source: "System",
    createdAt: "2024-02-05T10:00:00Z",
  },
];

const RewardsPage = () => {
  const [points, setPoints] = useState(275);
  const [rewards, setRewards] = useState(mockRewards);
  const [achievements, setAchievements] = useState(mockAchievements);
  const [pointsHistory, setPointsHistory] = useState(mockPointsHistory);
  const [loading, setLoading] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (reward: Reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReward(null);
  };

  const handleClaimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && points >= reward.pointsRequired) {
      setPoints(points - reward.pointsRequired);
      setRewards(
        rewards.map((r) =>
          r.id === reward.id ? { ...r, available: false, claimed: true } : r
        )
      );
      setPointsHistory([
        ...pointsHistory,
        {
          id: String(Date.now()),
          userId: "user123",
          amount: -reward.pointsRequired,
          type: "spent",
          description: `Redeemed '${reward.title}' reward`,
          source: "Reward Redemption",
          createdAt: new Date().toISOString(),
        },
      ]);
      handleCloseModal();
    }
  };

  const handleClaimAchievement = (achievement: Achievement) => {
    if (!achievement.claimed) {
      setPoints(points + achievement.pointsAwarded);
      setAchievements(
        achievements.map((a) =>
          a.id === achievement.id ? { ...a, claimed: true } : a
        )
      );
      setPointsHistory([
        ...pointsHistory,
        {
          id: String(Date.now()),
          userId: "user123",
          amount: achievement.pointsAwarded,
          type: "earned",
          description: `Claimed '${achievement.title}' achievement`,
          source: "Achievement",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Your Points</CardTitle>
            <CardDescription>Track your points balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">{points}</div>
            <p className="text-muted-foreground">
              {pointsHistory.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Rewards Available</CardTitle>
            <CardDescription>Explore available rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">{rewards.filter((r) => r.available).length}</div>
            <p className="text-muted-foreground">
              {rewards.length} total rewards
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Achievements</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">{achievements.filter((a) => a.completed).length} / {achievements.length}</div>
            <p className="text-muted-foreground">
              {achievements.length} total achievements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Points to Next Reward</CardTitle>
            <CardDescription>Keep earning points!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">{rewards.length > 0 ? Math.max(0, rewards[0].pointsRequired - points) : 0}</div>
            <p className="text-muted-foreground">
              Next reward: {rewards.length > 0 ? rewards[0].title : "No rewards available"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rewards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="history">Points History</TabsTrigger>
        </TabsList>
        <TabsContent value="rewards" className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card key={reward.id}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="rounded-md mb-3"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      <Gift className="mr-2 h-4 w-4 inline-block" />
                      {reward.pointsRequired} Points
                    </p>
                    {reward.available ? (
                      <Button onClick={() => handleOpenModal(reward)} size="sm">
                        Claim Reward
                      </Button>
                    ) : (
                      <Badge variant="secondary">Claimed</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Progress value={achievement.progress} />
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      <Trophy className="mr-2 h-4 w-4 inline-block" />
                      {achievement.pointsAwarded} Points
                    </p>
                    {achievement.completed ? (
                      achievement.claimed ? (
                        <Badge variant="secondary">Claimed</Badge>
                      ) : (
                        <Button onClick={() => handleClaimAchievement(achievement)} size="sm">
                          Claim
                        </Button>
                      )
                    ) : (
                      <Badge variant="outline">In Progress</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-2">
          <PointsHistory transactions={pointsHistory} />
        </TabsContent>
      </Tabs>

      <RewardClaimModal
        reward={selectedReward}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onClaim={handleClaimReward}
        userPoints={points}
      />
    </div>
  );
};

export default RewardsPage;
