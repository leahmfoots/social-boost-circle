
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
  points: number;
  createdAt: string;
}

export interface CreatorProfile extends User {
  followers: number;
  following: number;
  platforms: string[];
  verified: boolean;
  isFollowing: boolean;
}

export interface GroupMember {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  role: 'member' | 'moderator' | 'admin';
  joinedAt: string;
}

export interface GroupPost {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  memberCount: number;
  postCount: number;
  category: string;
  isJoined: boolean;
  createdAt: string;
  admin?: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  lastActivity?: string;
  isPinned?: boolean;
  tags?: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export interface GroupDetail extends Group {
  members: GroupMember[];
  posts: GroupPost[];
  isAdmin: boolean;
  isModerator: boolean;
  rules?: string[];
}
