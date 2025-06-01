
import { ReactNode } from "react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useWebSocket } from "@/hooks/useWebSocket";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Connect to WebSocket for real-time notifications
  // In production, this would be an environment variable
  const { isConnected } = useWebSocket(process.env.NODE_ENV === 'development' ? 'ws://localhost:8080' : undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold gradient-text">{title}</h1>
            {process.env.NODE_ENV === 'development' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Use keyboard shortcuts: Ctrl+D (Dashboard), Ctrl+E (Engagement), Ctrl+R (Rewards), Ctrl+C (Community), Ctrl+K (Search)
          </p>
        </div>
        <div className="glass-card rounded-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
