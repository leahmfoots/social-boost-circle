
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, Gift, MessageSquare, Settings, Bell, BarChart3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: MessageSquare, label: "Engagement", path: "/dashboard/engagement" },
    { icon: Gift, label: "Rewards", path: "/dashboard/rewards" },
    { icon: Users, label: "Community", path: "/dashboard/community" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Settings, label: "Accounts", path: "/dashboard/accounts" },
    { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">RoundAbout</h1>
          <p className="text-sm text-muted-foreground">Creator Platform</p>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate(item.path)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
