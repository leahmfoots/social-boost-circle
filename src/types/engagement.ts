
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
  completedAt: string;
  status: EngagementStatus;
}
