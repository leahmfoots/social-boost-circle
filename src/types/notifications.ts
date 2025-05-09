
import { ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "engagement" | "reward" | "achievement" | "system";
  actionUrl?: string;
}
