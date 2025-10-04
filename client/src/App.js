import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { ExpenseProvider } from './contexts/ExpenseContext';

// Layouts
import BaseLayout from './components/layout/BaseLayout';
import AdminSidebar from './components/layout/AdminSidebar';
import ManagerSidebar from './components/layout/ManagerSidebar';
import EmployeeSidebar from './components/layout/EmployeeSidebar';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Login from './pages/auth/Login';

// Admin Pages
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import EmployeeManagement from './pages/admin/employees/EmployeeManagement';
import ManagerManagement from './pages/admin/managers/ManagerManagement';
import ApprovalRules from './pages/admin/approval-rules/ApprovalRules';
import AdminReports from './pages/admin/reports/AdminReports';
import CompanySettings from './pages/admin/company-settings/CompanySettings';

// Manager Pages
import ManagerDashboard from './pages/manager/dashboard/ManagerDashboard';
import Proposals from './pages/manager/proposals/Proposals';
import Team from './pages/manager/team/Team';
import ManagerReports from './pages/manager/reports/ManagerReports';

// Employee Pages
import EmployeeDashboard from './pages/employee/dashboard/EmployeeDashboard';
import NewExpense from './pages/employee/new-expense/NewExpense';
import MyExpenses from './pages/employee/expenses/MyExpenses';
import ExpensePolicy from './pages/employee/policy/ExpensePolicy';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#64748b',
    },
  },
});

// Layout wrappers
const AdminLayoutWrapper = () => {
  return (
    <BaseLayout sidebar={<AdminSidebar />}>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employees" element={<EmployeeManagement />} />
        <Route path="managers" element={<ManagerManagement />} />
        <Route path="approval-rules" element={<ApprovalRules />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="company-settings" element={<CompanySettings />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </BaseLayout>
  );
};

const ManagerLayoutWrapper = () => {
  return (
    <BaseLayout sidebar={<ManagerSidebar />}>
      <Routes>
        <Route index element={<ManagerDashboard />} />
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="team" element={<Team />} />
        <Route path="reports" element={<ManagerReports />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </BaseLayout>
  );
};

const EmployeeLayoutWrapper = () => {
  return (
    <BaseLayout sidebar={<EmployeeSidebar />}>
      <Routes>
        <Route index element={<EmployeeDashboard />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="new-expense" element={<NewExpense />} />
        <Route path="expenses" element={<MyExpenses />} />
        <Route path="policy" element={<ExpensePolicy />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </BaseLayout>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ExpenseProvider>
          <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayoutWrapper />
              </ProtectedRoute>
            } />
            
            {/* Manager Routes */}
            <Route path="/manager/*" element={
              <ProtectedRoute allowedRoles={['manager', 'admin']}>
                <ManagerLayoutWrapper />
              </ProtectedRoute>
            } />
            
            {/* Employee Routes */}
            <Route path="/employee/*" element={
              <ProtectedRoute allowedRoles={['employee', 'manager', 'admin']}>
                <EmployeeLayoutWrapper />
              </ProtectedRoute>
            } />
            
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
        </ExpenseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;