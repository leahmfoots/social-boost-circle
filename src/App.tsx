import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Import pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import EngagementPage from "@/pages/EngagementPage";
import AccountsPage from "@/pages/AccountsPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import CommunityPage from "@/pages/CommunityPage";
import CreatorProfilePage from "@/pages/CreatorProfilePage";
import GroupDetailsPage from "@/pages/GroupDetailsPage";
import MessagingPage from "@/pages/MessagingPage";
import NotificationsPage from "@/pages/NotificationsPage";
import RewardsPage from "@/pages/RewardsPage";
import SettingsPage from "@/pages/SettingsPage";
import Premium from "@/pages/Premium";
import CryptoBotPage from "@/pages/CryptoBotPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="roundabout-theme">
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/engagement" element={<ProtectedRoute><EngagementPage /></ProtectedRoute>} />
              <Route path="/accounts" element={<ProtectedRoute><AccountsPage /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
              <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
              <Route path="/creator/:id" element={<ProtectedRoute><CreatorProfilePage /></ProtectedRoute>} />
              <Route path="/community/group/:id" element={<ProtectedRoute><GroupDetailsPage /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><MessagingPage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
              <Route path="/crypto-bot" element={<ProtectedRoute><CryptoBotPage /></ProtectedRoute>} />
              
              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
