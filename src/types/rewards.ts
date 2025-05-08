
import { ReactNode } from "react";

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  image: string;
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: ReactNode;
  completed: boolean;
  claimed: boolean;
  pointsAwarded: number;
}
