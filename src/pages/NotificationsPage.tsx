import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, CheckCircle, AlertCircle, Info, Settings, Mail, Smartphone } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'error' | 'info';
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Follower',
    description: 'John Doe started following you.',
    type: 'success',
    date: '2023-10-26T10:00:00',
    read: false,
  },
  {
    id: '2',
    title: 'Engagement Milestone',
    description: 'You reached 1000 likes on your latest post!',
    type: 'success',
    date: '2023-10-25T14:30:00',
    read: false,
  },
  {
    id: '3',
    title: 'Account Warning',
    description: 'Your account is at risk of being suspended.',
    type: 'warning',
    date: '2023-10-24T08:00:00',
    read: true,
  },
  {
    id: '4',
    title: 'New Message',
    description: 'You have a new message from Jane Smith.',
    type: 'info',
    date: '2023-10-23T18:45:00',
    read: true,
  },
];

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: false,
    sms: false,
  });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const toggleSetting = (setting: keyof NotificationSettings) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
        <Button variant="outline" onClick={markAllAsRead}>
          Mark All as Read
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications" className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent>
                <p className="text-center text-muted-foreground">No notifications yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => {
                let icon;
                switch (notification.type) {
                  case 'success':
                    icon = <CheckCircle className="h-4 w-4 text-green-500" />;
                    break;
                  case 'warning':
                    icon = <AlertCircle className="h-4 w-4 text-yellow-500" />;
                    break;
                  case 'error':
                    icon = <AlertCircle className="h-4 w-4 text-red-500" />;
                    break;
                  default:
                    icon = <Info className="h-4 w-4 text-blue-500" />;
                }

                return (
                  <Card key={notification.id}>
                    <CardHeader className="space-y-0 pb-2">
                      <div className="flex items-center space-x-2">
                        {icon}
                        <CardTitle className="text-sm font-medium">{notification.title}</CardTitle>
                        {!notification.read && (
                          <Badge variant="secondary">New</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{notification.description}</CardDescription>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-muted-foreground">{new Date(notification.date).toLocaleDateString()}</p>
                        {!notification.read && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                </div>
                <Switch checked={settings.email} onCheckedChange={() => toggleSetting('email')} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device.</p>
                </div>
                <Switch checked={settings.push} onCheckedChange={() => toggleSetting('push')} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS.</p>
                </div>
                <Switch checked={settings.sms} onCheckedChange={() => toggleSetting('sms')} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
