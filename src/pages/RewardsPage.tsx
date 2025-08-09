
import { useState } from 'react';
import Layout from '@/components/Layout';
import RewardsSection from '@/components/rewards/RewardsSection';
import AchievementsSection from '@/components/rewards/AchievementsSection';
import PointsHistory from '@/components/rewards/PointsHistory';
import RewardsProgress from '@/components/rewards/RewardsProgress';
import RewardClaimModal from '@/components/rewards/RewardClaimModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Reward, Achievement, PointsTransaction } from '@/types/rewards';
import { Trophy, Star, Coins } from 'lucide-react';

const mockRewards: Reward[] = [
  {
    id: '1',
    title: '$10 Amazon Gift Card',
    description: 'Redeem points for a $10 Amazon gift card',
    pointsRequired: 1000,
    category: 'Gift Cards',
    available: true,
  },
  {
    id: '2',
    title: 'Premium Feature Access',
    description: '1 month of premium features',
    pointsRequired: 500,
    category: 'Platform Benefits',
    available: true,
  },
  {
    id: '3',
    title: 'Custom Profile Badge',
    description: 'Stand out with a unique profile badge',
    pointsRequired: 250,
    category: 'Customization',
    available: true,
  },
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first engagement',
    icon: '🎯',
    progress: 100,
    completed: true,
    claimed: false,
    pointsAwarded: 50,
  },
  {
    id: '2',
    title: 'Social Butterfly',
    description: 'Connect 5 social media accounts',
    icon: '🦋',
    progress: 60,
    completed: false,
    claimed: false,
    pointsAwarded: 200,
  },
  {
    id: '3',
    title: 'Engagement Master',
    description: 'Complete 100 engagement opportunities',
    icon: '⚡',
    progress: 45,
    completed: false,
    claimed: false,
    pointsAwarded: 500,
  },
];

const mockTransactions: PointsTransaction[] = [
  {
    id: '1',
    userId: 'user1',
    amount: 25,
    type: 'earned',
    description: 'Instagram post engagement',
    source: 'Instagram',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    userId: 'user1',
    amount: 50,
    type: 'earned',
    description: 'YouTube video share',
    source: 'YouTube',
    createdAt: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    userId: 'user1',
    amount: 100,
    type: 'bonus',
    description: 'Weekly engagement bonus',
    source: 'System',
    createdAt: '2024-01-13T09:00:00Z',
  },
];

const RewardsPage = () => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const userPoints = 750; // This would come from user context in real app

  const handleClaimReward = (reward: Reward) => {
    setSelectedReward(reward);
    setModalOpen(true);
  };

  const handleConfirmClaim = (rewardId: string) => {
    console.log('Claiming reward:', rewardId);
    // Implement actual reward claim logic
  };

  const handleClaimAchievement = (achievementId: string) => {
    console.log('Claiming achievement:', achievementId);
    // Implement actual achievement claim logic
  };

  const totalEarned = mockTransactions
    .filter(t => t.type === 'earned' || t.type === 'bonus')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = mockTransactions
    .filter(t => t.type === 'spent')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Rewards & Achievements</h1>
            <p className="text-muted-foreground">
              Earn points through engagement and redeem exciting rewards
            </p>
          </div>
        </div>

        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Points</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userPoints}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalEarned}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{totalSpent}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Badge variant="secondary">
                {mockAchievements.filter(a => a.completed).length}/{mockAchievements.length}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAchievements.filter(a => a.completed).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <RewardsProgress rewards={mockRewards} userPoints={userPoints} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="rewards" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="history">Points History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rewards" className="space-y-4">
            <RewardsSection 
              rewards={mockRewards} 
              userPoints={userPoints} 
              onClaimReward={handleClaimReward} 
            />
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-4">
            <AchievementsSection 
              achievements={mockAchievements}
              onClaimAchievement={handleClaimAchievement}
            />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <PointsHistory transactions={mockTransactions} />
          </TabsContent>
        </Tabs>

        {/* Claim Modal */}
        <RewardClaimModal
          reward={selectedReward}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onClaim={handleConfirmClaim}
          userPoints={userPoints}
        />
      </div>
    </Layout>
  );
};

export default RewardsPage;
