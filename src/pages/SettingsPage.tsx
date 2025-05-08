
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => {
  const [user, setUser] = useState({
    name: "Demo User",
    email: "demo@roundabout.com",
    username: "demouser",
    bio: "Content creator passionate about technology and digital marketing.",
    avatar: "/placeholder.svg",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    engagementAlerts: true,
    achievementAlerts: true,
    newsletterSubscribed: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    showStats: true,
    allowTagging: true,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    });
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handlePrivacyChange = (key: keyof typeof privacySettings, value: boolean) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: value,
    });
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved.",
    });
  };

  return (
    <DashboardLayout title="Settings">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences, profile information, and privacy settings.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">{user.name}</h3>
              <p className="text-muted-foreground">@{user.username}</p>
              <Button size="sm">Change Avatar</Button>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <Input 
                    id="name" 
                    value={user.name} 
                    onChange={e => setUser({...user, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input 
                    id="username" 
                    value={user.username} 
                    onChange={e => setUser({...user, username: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input 
                  id="email" 
                  type="email" 
                  value={user.email} 
                  onChange={e => setUser({...user, email: e.target.value})}
                />
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <Textarea 
                  id="bio" 
                  value={user.bio} 
                  onChange={e => setUser({...user, bio: e.target.value})}
                  rows={4}
                />
                <FormDescription>
                  Tell other creators about yourself. This will be visible on your public profile.
                </FormDescription>
              </div>

              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <FormLabel className="text-base">Email Notifications</FormLabel>
                  <FormDescription>
                    Receive email notifications about your account activity.
                  </FormDescription>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={value => handleNotificationChange('emailNotifications', value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <FormLabel className="text-base">Engagement Alerts</FormLabel>
                  <FormDescription>
                    Get notified when someone engages with your content.
                  </FormDescription>
                </div>
                <Switch 
                  checked={notificationSettings.engagementAlerts}
                  onCheckedChange={value => handleNotificationChange('engagementAlerts', value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <FormLabel className="text-base">Achievement Alerts</FormLabel>
                  <FormDescription>
                    Get notified when you earn new achievements or rewards.
                  </FormDescription>
                </div>
                <Switch 
                  checked={notificationSettings.achievementAlerts}
                  onCheckedChange={value => handleNotificationChange('achievementAlerts', value)}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="text-lg font-medium">Marketing Communications</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <FormLabel className="text-base">Newsletter</FormLabel>
                  <FormDescription>
                    Receive our weekly newsletter with creator tips and platform updates.
                  </FormDescription>
                </div>
                <Switch 
                  checked={notificationSettings.newsletterSubscribed}
                  onCheckedChange={value => handleNotificationChange('newsletterSubscribed', value)}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Profile Visibility</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <FormLabel className="text-base">Public Profile</FormLabel>
                  <FormDescription>
                    Make your profile visible to all users on the platform.
                  </FormDescription>
                </div>
                <Switch 
                  checked={privacySettings.profilePublic}
                  onCheckedChange={value => handlePrivacyChange('profilePublic', value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <FormLabel className="text-base">Show Statistics</FormLabel>
                  <FormDescription>
                    Display your engagement stats and points on your public profile.
                  </FormDescription>
                </div>
                <Switch 
                  checked={privacySettings.showStats}
                  onCheckedChange={value => handlePrivacyChange('showStats', value)}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="text-lg font-medium">Interaction Settings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <FormLabel className="text-base">Allow Tagging</FormLabel>
                  <FormDescription>
                    Allow other creators to tag you in posts and discussions.
                  </FormDescription>
                </div>
                <Switch 
                  checked={privacySettings.allowTagging}
                  onCheckedChange={value => handlePrivacyChange('allowTagging', value)}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="text-lg font-medium">Data Management</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You can download your data or request account deletion at any time.
              </p>
              <div className="flex gap-4">
                <Button variant="outline">Download My Data</Button>
                <Button variant="destructive">Request Account Deletion</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <FormLabel htmlFor="current-password">Current Password</FormLabel>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="new-password">New Password</FormLabel>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="confirm-password">Confirm New Password</FormLabel>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Update Password</Button>
            </div>

            <Separator className="my-6" />

            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button variant="outline">Set Up Two-Factor Authentication</Button>
            </div>

            <Separator className="my-6" />

            <h3 className="text-lg font-medium">Login Sessions</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Manage your active login sessions across devices.
              </p>
              <Button variant="outline">View Active Sessions</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;
