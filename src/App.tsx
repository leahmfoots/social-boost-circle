
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import EngagementPage from "./pages/EngagementPage";
import RewardsPage from "./pages/RewardsPage";
import CommunityPage from "./pages/CommunityPage";
import AccountsPage from "./pages/AccountsPage";
import NotificationsPage from "./pages/NotificationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CreatorProfilePage from "./pages/CreatorProfilePage";
import MessagingPage from "./pages/MessagingPage";
import GroupDetailsPage from "./pages/GroupDetailsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="engagement" element={<EngagementPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="community/profile/:id" element={<CreatorProfilePage />} />
            <Route path="community/messages" element={<MessagingPage />} />
            <Route path="community/messages/:id" element={<MessagingPage />} />
            <Route path="community/groups/:id" element={<GroupDetailsPage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
