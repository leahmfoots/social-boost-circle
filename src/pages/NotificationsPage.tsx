
import { useState } from "react";
import { toast } from "sonner";
import { Bell, Check, X, Settings, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Notification {
  id: string;
  type: "engagement" | "reward" | "system" | "community";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "engagement",
    title: "New engagement opportunity",
    message: "A new video from @tech_guru is available for engagement",
    timestamp: "2023-05-15T10:30:00Z",
    read: false,
    actionRequired: true
  },
  {
    id: "2",
    type: "reward",
    title: "Points earned!",
    message: "You earned 45 points for engaging with content",
    timestamp: "2023-05-15T09:15:00Z",
    read: false
  },
  {
    id: "3",
    type: "community",
    title: "New message",
    message: "You have a new message from @design_expert",
    timestamp: "2023-05-14T16:20:00Z",
    read: true
  },
  {
    id: "4",
    type: "system",
    title: "Account verification",
    message: "Your TikTok account has been successfully verified",
    timestamp: "2023-05-14T14:10:00Z",
    read: true
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    engagementAlerts: true,
    rewardUpdates: true,
    communityMessages: true
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success("Notification deleted");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "engagement": return "💼";
      case "reward": return "🎁";
      case "community": return "👥";
      case "system": return "⚙️";
      default: return "📱";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout title="Notifications">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your platform activity
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <Badge variant={notification.type === 'engagement' ? 'default' : 'secondary'}>
                            {notification.type}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge variant="destructive">Action required</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter(n => !n.read).map((notification) => (
              <Card key={notification.id} className="border-primary/50 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <Badge variant="default">{notification.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            {notifications.filter(n => n.type === 'engagement').map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💼</div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            {notifications.filter(n => n.type === 'reward').map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">🎁</div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="engagement-alerts">Engagement Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new engagement opportunities</p>
                  </div>
                  <Switch
                    id="engagement-alerts"
                    checked={settings.engagementAlerts}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, engagementAlerts: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reward-updates">Reward Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about points and rewards</p>
                  </div>
                  <Switch
                    id="reward-updates"
                    checked={settings.rewardUpdates}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, rewardUpdates: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="community-messages">Community Messages</Label>
                    <p className="text-sm text-muted-foreground">Messages from other creators</p>
                  </div>
                  <Switch
                    id="community-messages"
                    checked={settings.communityMessages}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, communityMessages: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
