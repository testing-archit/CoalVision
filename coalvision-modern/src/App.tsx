import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ShiftHandover from './pages/ShiftHandover';
import SafetyManagement from './pages/SafetyManagement';
import ResponsePlan from './pages/ResponsePlan';
import Updates from './pages/Updates';
import Holidays from './pages/Holidays';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/shift-handover" element={
        <ProtectedRoute>
          <ShiftHandover />
        </ProtectedRoute>
      } />
      <Route path="/safety" element={
        <ProtectedRoute>
          <SafetyManagement />
        </ProtectedRoute>
      } />
      <Route path="/response-plan" element={
        <ProtectedRoute>
          <ResponsePlan />
        </ProtectedRoute>
      } />
      <Route path="/updates" element={
        <ProtectedRoute>
          <Updates />
        </ProtectedRoute>
      } />
      <Route path="/holidays" element={
        <ProtectedRoute>
          <Holidays />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#f8fafc',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#f8fafc',
              },
            },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
