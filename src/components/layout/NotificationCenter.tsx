
import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "engagement" | "achievement" | "reward" | "system";
}

const exampleNotifications: Notification[] = [
  {
    id: "n1",
    title: "Engagement Verified",
    message: "You earned 15 points for engaging with 'How to Grow Your Audience in 2023'.",
    time: "10 minutes ago",
    read: false,
    type: "engagement",
  },
  {
    id: "n2",
    title: "Achievement Unlocked",
    message: "You've completed the 'First Steps' achievement. Claim your 50 points!",
    time: "2 hours ago",
    read: false,
    type: "achievement",
  },
  {
    id: "n3",
    title: "New Reward Available",
    message: "You can now claim the 'Featured Creator Spotlight' reward.",
    time: "1 day ago",
    read: true,
    type: "reward",
  },
  {
    id: "n4",
    title: "Welcome to RoundAbout",
    message: "Welcome to your engagement dashboard. Start by connecting your social accounts.",
    time: "3 days ago",
    read: true,
    type: "system",
  },
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(exampleNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({...notification, read: true})));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 pb-2">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 text-xs text-muted-foreground"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="h-80">
          {notifications.length > 0 ? (
            <div className="space-y-1 p-2">
              {notifications.map(notification => (
                <button
                  key={notification.id}
                  className={`w-full cursor-default rounded-md p-2 text-left text-sm transition-colors hover:bg-accent ${notification.read ? "" : "bg-muted"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{notification.title}</span>
                    <Badge variant="outline" className="px-1 text-[10px]">
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {notification.message}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                    {!notification.read && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>No new notifications</p>
            </div>
          )}
        </ScrollArea>
        <Separator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full" onClick={() => setOpen(false)}>
            <Check className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
