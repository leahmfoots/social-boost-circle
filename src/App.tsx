
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { StripeProvider } from '@/components/payment/StripeProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import Auth from '@/pages/Auth';
import Premium from '@/pages/Premium';

function App() {
  return (
    <AuthProvider>
      <StripeProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/premium" element={
                <ProtectedRoute>
                  <Premium />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </StripeProvider>
    </AuthProvider>
  );
}

export default App;
