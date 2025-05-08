
import { ReactNode } from "react";
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
import { ChartBar, Link, Settings, Star, TrendingUp, User, Users } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title = "Dashboard" }: DashboardLayoutProps) => {
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
              <h1 className="font-semibold text-xl">{title}</h1>
            </div>
          </header>
          
          <main className="container py-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
