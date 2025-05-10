
import { ReactNode } from "react";

export interface SocialAccount {
  id: string;
  name: string;
  icon: ReactNode;
  connected: boolean;
  username?: string;
  stats: {
    followers: number;
    posts: number;
    engagement: number;
  };
}
