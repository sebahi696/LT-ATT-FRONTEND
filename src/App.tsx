import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { Login } from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminLayout } from './layouts/AdminLayout';
import { EmployeeLayout } from './layouts/EmployeeLayout';
import { Dashboard } from './components/admin/Dashboard';
import AttendanceReports from './components/admin/AttendanceReports';
import SalaryReports from './components/admin/SalaryReports';
import { AttendanceHistory } from './components/employee/AttendanceHistory';
import { QRScanner } from './components/employee/QRScanner';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;

// Protected Route Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  useEffect(() => {
    // Add any app-wide initialization here
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="attendance" element={<AttendanceReports />} />
                      <Route path="salary" element={<SalaryReports />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/employee/*"
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeeLayout>
                    <Routes>
                      <Route path="attendance" element={<AttendanceHistory />} />
                      <Route path="scan" element={<QRScanner onScanSuccess={(text) => console.log('QR Code scanned:', text)} />} />
                    </Routes>
                  </EmployeeLayout>
                </ProtectedRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
