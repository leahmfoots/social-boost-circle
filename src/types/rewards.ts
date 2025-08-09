
export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  category: string;
  available: boolean;
  claimed?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  completed: boolean;
  claimed: boolean;
  pointsAwarded: number;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'spent' | 'bonus';
  description: string;
  source: string;
  createdAt: string;
}
