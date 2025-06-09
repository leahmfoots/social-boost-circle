
export type EngagementStatus = "pending" | "verified" | "rejected";

export interface Opportunity {
  id: string;
  username: string;
  platform: string;
  contentType: string;
  title: string;
  points: number;
  timeRequired: string;
}

export interface Engagement extends Omit<Opportunity, "timeRequired"> {
  user_id: string;
  content_url: string;
  points_value: number;
  submitted_at: string;
  completedAt?: string;
  status: EngagementStatus;
}
