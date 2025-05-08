
export interface SocialAccount {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  username?: string;
  stats: {
    followers: number;
    posts: number;
    engagement: number;
  };
}
