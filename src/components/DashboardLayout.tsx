
import { ReactNode } from "react";
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
import { ChartBar, Link, Settings, Star, TrendingUp, User, Users, Bell } from "lucide-react";
import { Button } from "./ui/button";
import NotificationCenter from "./layout/NotificationCenter";
import SearchBar from "./layout/SearchBar";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title = "Dashboard" }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar className="sidebar">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4">
              <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="font-bold text-xl gradient-text">RoundAbout</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover-glow">
                      <RouterLink to="/dashboard">
                        <ChartBar />
                        <span>Dashboard</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover-glow">
                      <RouterLink to="/dashboard/accounts">
                        <Link />
                        <span>Social Accounts</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover-glow">
                      <RouterLink to="/dashboard/engagement">
                        <TrendingUp />
                        <span>Engagement</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover-glow">
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
              <SidebarGroupLabel>Community</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover-glow">
                      <RouterLink to="/dashboard/community">
                        <Users />
                        <span>Community</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover-glow">
                      <RouterLink to="/dashboard/analytics">
                        <ChartBar />
                        <span>Analytics</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover-glow">
                      <RouterLink to="/dashboard/notifications">
                        <Bell />
                        <span>Notifications</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover-glow">
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
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
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
          <header className="border-b bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="font-semibold text-xl gradient-text">{title}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden md:block w-72">
                  <SearchBar />
                </div>
                <NotificationCenter />
                <Button variant="ghost" size="icon" asChild className="hover-glow">
                  <RouterLink to="/dashboard/profile">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </RouterLink>
                </Button>
              </div>
            </div>
          </header>
          
          <main className="container py-8">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
