
import { useState } from "react";
import { toast } from "sonner";
import { Bell, Eye, Lock, UserCircle, Zap } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import UserProfile from "@/components/profile/UserProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    newOpportunities: true,
    achievementUnlocked: true,
    pointsEarned: true,
    weeklyDigest: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    showEngagements: true,
    showRewards: false,
    allowTagging: true
  });

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully");
  };

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="profile" className="gap-2">
              <UserCircle className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Eye className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="gap-2">
              <Zap className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Decide what notifications you receive and how they're delivered
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Delivery Preferences</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-normal">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationChange('emailNotifications')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="font-normal">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch 
                      id="push-notifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={() => handleNotificationChange('pushNotifications')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails" className="font-normal">
                        Marketing Emails
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and offers
                      </p>
                    </div>
                    <Switch 
                      id="marketing-emails" 
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={() => handleNotificationChange('marketingEmails')}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Types</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-opportunities" className="font-normal">
                        New Opportunities
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new engagement opportunities
                      </p>
                    </div>
                    <Switch 
                      id="new-opportunities" 
                      checked={notificationSettings.newOpportunities}
                      onCheckedChange={() => handleNotificationChange('newOpportunities')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="achievement-unlocked" className="font-normal">
                        Achievement Unlocked
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you unlock a new achievement
                      </p>
                    </div>
                    <Switch 
                      id="achievement-unlocked" 
                      checked={notificationSettings.achievementUnlocked}
                      onCheckedChange={() => handleNotificationChange('achievementUnlocked')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="points-earned" className="font-normal">
                        Points Earned
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you earn points
                      </p>
                    </div>
                    <Switch 
                      id="points-earned" 
                      checked={notificationSettings.pointsEarned}
                      onCheckedChange={() => handleNotificationChange('pointsEarned')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-digest" className="font-normal">
                        Weekly Digest
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get a weekly summary of your activity
                      </p>
                    </div>
                    <Switch 
                      id="weekly-digest" 
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={() => handleNotificationChange('weeklyDigest')}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your privacy preferences and what others can see about you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-visibility" className="font-normal">
                      Public Profile
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to view your profile
                    </p>
                  </div>
                  <Switch 
                    id="profile-visibility" 
                    checked={privacySettings.profileVisibility}
                    onCheckedChange={() => handlePrivacyChange('profileVisibility')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-engagements" className="font-normal">
                      Show Engagements
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Make your engagement activities visible to others
                    </p>
                  </div>
                  <Switch 
                    id="show-engagements" 
                    checked={privacySettings.showEngagements}
                    onCheckedChange={() => handlePrivacyChange('showEngagements')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-rewards" className="font-normal">
                      Show Rewards
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Make your claimed rewards visible to others
                    </p>
                  </div>
                  <Switch 
                    id="show-rewards" 
                    checked={privacySettings.showRewards}
                    onCheckedChange={() => handlePrivacyChange('showRewards')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-tagging" className="font-normal">
                      Allow Tagging
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to tag you in their content
                    </p>
                  </div>
                  <Switch 
                    id="allow-tagging" 
                    checked={privacySettings.allowTagging}
                    onCheckedChange={() => handlePrivacyChange('allowTagging')}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Privacy Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSavePassword}>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input type="password" id="current-password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input type="password" id="new-password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input type="password" id="confirm-password" required />
                  </div>
                  
                  <Button type="submit">Update Password</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Account Type</h3>
                  <div className="flex items-center gap-2 p-3 rounded-md bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                    <span>Free Account</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Upgrade to Premium to unlock more features and rewards
                  </p>
                  <Button variant="outline" className="mt-2">
                    View Premium Plans
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Data Export</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Download a copy of your data, including your profile, engagements, and rewards
                  </p>
                  <Button variant="outline">Export Data</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-red-500 mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
