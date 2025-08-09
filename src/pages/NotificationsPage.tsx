
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Check, X, Settings, Mail, MessageSquare, Award, Users, Smartphone } from 'lucide-react';

interface Notification {
  id: string;
  type: 'engagement' | 'reward' | 'social' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'engagement',
    title: 'New Engagement Opportunity',
    message: 'A new YouTube engagement opportunity worth 45 points is available',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    actionUrl: '/engagement',
  },
  {
    id: '2',
    type: 'reward',
    title: 'Achievement Unlocked!',
    message: 'You\'ve completed your first engagement and earned 50 points',
    timestamp: '2024-01-14T15:45:00Z',
    read: false,
  },
  {
    id: '3',
    type: 'social',
    title: 'New Follower',
    message: 'Sarah Johnson started following you',
    timestamp: '2024-01-14T12:20:00Z',
    read: true,
    actionUrl: '/creator/sarah-johnson',
  },
  {
    id: '4',
    type: 'system',
    title: 'Account Connected',
    message: 'Your Instagram account has been successfully connected',
    timestamp: '2024-01-13T09:15:00Z',
    read: true,
  },
  {
    id: '5',
    type: 'engagement',
    title: 'Engagement Completed',
    message: 'Your Instagram post engagement has been verified. +25 points earned!',
    timestamp: '2024-01-12T16:30:00Z',
    read: true,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState({
    email: {
      engagement: true,
      rewards: true,
      social: false,
      system: true,
    },
    push: {
      engagement: true,
      rewards: true,
      social: true,
      system: false,
    },
    inApp: {
      engagement: true,
      rewards: true,
      social: true,
      system: true,
    },
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'engagement':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'reward':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'social':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'system':
        return <Settings className="h-4 w-4 text-gray-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const updateSetting = (channel: keyof typeof settings, type: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: value,
      },
    }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">
                Manage your notifications and communication preferences
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-lg px-3 py-1">
              {unreadCount} unread
            </Badge>
          )}
        </div>

        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">Recent Notifications</h2>
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    <Check className="h-4 w-4 mr-2" />
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>

            <Card>
              <ScrollArea className="h-[600px]">
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition-colors ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{notification.title}</h3>
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs">New</Badge>
                              )}
                              <Badge variant="outline" className="text-xs capitalize">
                                {notification.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>
                                {new Date(notification.timestamp).toLocaleString()}
                              </span>
                              {notification.actionUrl && (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-xs"
                                  onClick={() => window.location.href = notification.actionUrl!}
                                >
                                  View details
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {notifications.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">No notifications yet</h3>
                      <p className="text-muted-foreground">
                        You'll see notifications here as you engage with the platform
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Email Notifications</h3>
                  </div>
                  <div className="space-y-3 ml-7">
                    {Object.entries(settings.email).map(([type, enabled]) => (
                      <div key={type} className="flex items-center justify-between">
                        <Label htmlFor={`email-${type}`} className="capitalize">
                          {type} notifications
                        </Label>
                        <Switch
                          id={`email-${type}`}
                          checked={enabled}
                          onCheckedChange={(value) => updateSetting('email', type, value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Push Notifications</h3>
                  </div>
                  <div className="space-y-3 ml-7">
                    {Object.entries(settings.push).map(([type, enabled]) => (
                      <div key={type} className="flex items-center justify-between">
                        <Label htmlFor={`push-${type}`} className="capitalize">
                          {type} notifications
                        </Label>
                        <Switch
                          id={`push-${type}`}
                          checked={enabled}
                          onCheckedChange={(value) => updateSetting('push', type, value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* In-App Notifications */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">In-App Notifications</h3>
                  </div>
                  <div className="space-y-3 ml-7">
                    {Object.entries(settings.inApp).map(([type, enabled]) => (
                      <div key={type} className="flex items-center justify-between">
                        <Label htmlFor={`inapp-${type}`} className="capitalize">
                          {type} notifications
                        </Label>
                        <Switch
                          id={`inapp-${type}`}
                          checked={enabled}
                          onCheckedChange={(value) => updateSetting('inApp', type, value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
