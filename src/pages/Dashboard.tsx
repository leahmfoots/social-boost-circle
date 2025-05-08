
import { Button } from "@/components/ui/button";
import { 
  ChartBar, 
  Link, 
  Settings, 
  Star, 
  TrendingUp, 
  User,
  Users
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4">
              <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="font-bold text-xl">RoundAbout</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <RouterLink to="/dashboard">
                        <ChartBar />
                        <span>Dashboard</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <RouterLink to="/dashboard/accounts">
                        <Link />
                        <span>Social Accounts</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <RouterLink to="/dashboard/engagement">
                        <TrendingUp />
                        <span>Engagement</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <RouterLink to="/dashboard/rewards">
                        <Star />
                        <span>Rewards</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <RouterLink to="/dashboard/profile">
                        <User />
                        <span>Profile</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <RouterLink to="/dashboard/community">
                        <Users />
                        <span>Community</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <RouterLink to="/dashboard/settings">
                        <Settings />
                        <span>Settings</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <div className="flex items-center gap-3 border-t pt-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Demo User</p>
                  <p className="text-xs text-muted-foreground">demo@roundabout.com</p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1">
          <header className="border-b bg-white">
            <div className="container py-4 flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="font-semibold text-xl">Dashboard</h1>
            </div>
          </header>
          
          <main className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Total Points", value: "1,250", change: "+24%" },
                { label: "Engagement Rate", value: "18.2%", change: "+5.3%" },
                { label: "Content Growth", value: "37%", change: "+12%" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-3xl font-semibold mt-1">{stat.value}</div>
                  <div className="text-xs text-green-600 mt-1">{stat.change} from last month</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Engagement Overview</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Engagement chart will be displayed here</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Recent Activity</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {[
                    "User1 commented on your YouTube video",
                    "User2 liked your Instagram post",
                    "User3 followed your Twitter account",
                    "User4 shared your LinkedIn post",
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Connect Your Social Accounts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "YouTube", connected: false },
                  { name: "Instagram", connected: false },
                  { name: "Twitter", connected: true },
                  { name: "TikTok", connected: false },
                  { name: "LinkedIn", connected: true },
                  { name: "Facebook", connected: false },
                ].map((platform, i) => (
                  <div key={i} className="border rounded-lg p-4 flex justify-between items-center">
                    <span className="font-medium">{platform.name}</span>
                    <Button variant={platform.connected ? "outline" : "default"} size="sm">
                      {platform.connected ? "Connected" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
