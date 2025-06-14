
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { StripeProvider } from '@/components/payment/StripeProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import Auth from '@/pages/Auth';
import Premium from '@/pages/Premium';
import Index from '@/pages/Index';
import AccountsPage from '@/pages/AccountsPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import CommunityPage from '@/pages/CommunityPage';
import CreatorProfilePage from '@/pages/CreatorProfilePage';
import EngagementPage from '@/pages/EngagementPage';
import GroupDetailsPage from '@/pages/GroupDetailsPage';
import MessagingPage from '@/pages/MessagingPage';
import NotificationsPage from '@/pages/NotificationsPage';
import RewardsPage from '@/pages/RewardsPage';
import SettingsPage from '@/pages/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <StripeProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/engagement" element={
                <ProtectedRoute>
                  <EngagementPage />
                </ProtectedRoute>
              } />
              <Route path="/accounts" element={
                <ProtectedRoute>
                  <AccountsPage />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              } />
              <Route path="/community/group/:id" element={
                <ProtectedRoute>
                  <GroupDetailsPage />
                </ProtectedRoute>
              } />
              <Route path="/creator/:id" element={
                <ProtectedRoute>
                  <CreatorProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <MessagingPage />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              } />
              <Route path="/rewards" element={
                <ProtectedRoute>
                  <RewardsPage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/premium" element={
                <ProtectedRoute>
                  <Premium />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </StripeProvider>
    </AuthProvider>
  );
}

export default App;
