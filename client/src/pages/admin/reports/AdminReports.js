import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminReports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [department, setDepartment] = useState('all');

  // Mock data for charts
  const expenseData = [
    { month: 'Jan', approved: 12500, pending: 3200, rejected: 800 },
    { month: 'Feb', approved: 11800, pending: 2800, rejected: 600 },
    { month: 'Mar', approved: 14200, pending: 3500, rejected: 900 },
    { month: 'Apr', approved: 13800, pending: 3100, rejected: 700 },
    { month: 'May', approved: 15600, pending: 4200, rejected: 1100 },
    { month: 'Jun', approved: 16200, pending: 3800, rejected: 900 }
  ];

  const categoryData = [
    { name: 'Travel', value: 35, color: '#3b82f6' },
    { name: 'Meals', value: 25, color: '#10b981' },
    { name: 'Software', value: 15, color: '#f59e0b' },
    { name: 'Equipment', value: 12, color: '#ef4444' },
    { name: 'Office Supplies', value: 8, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#64748b' }
  ];

  const departmentData = [
    { department: 'Engineering', total: 45200, approved: 38500, pending: 5200, rejected: 1500 },
    { department: 'Sales', total: 32800, approved: 28500, pending: 3500, rejected: 800 },
    { department: 'Marketing', total: 21500, approved: 18200, pending: 2800, rejected: 500 },
    { department: 'HR', total: 9800, approved: 8500, pending: 1200, rejected: 100 },
    { department: 'Finance', total: 7600, approved: 6800, pending: 700, rejected: 100 }
  ];

  const recentExpenses = [
    { id: 1, employee: 'John Doe', department: 'Engineering', amount: 1500, category: 'Equipment', status: 'approved', date: '2024-06-15' },
    { id: 2, employee: 'Sarah Smith', department: 'Sales', amount: 890, category: 'Travel', status: 'pending', date: '2024-06-14' },
    { id: 3, employee: 'Mike Johnson', department: 'Marketing', amount: 450, category: 'Meals', status: 'approved', date: '2024-06-13' },
    { id: 4, employee: 'Emily Davis', department: 'Engineering', amount: 2200, category: 'Software', status: 'rejected', date: '2024-06-12' },
    { id: 5, employee: 'Robert Brown', department: 'HR', amount: 320, category: 'Office Supplies', status: 'approved', date: '2024-06-11' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const totalExpenses = expenseData.reduce((sum, month) => sum + month.approved + month.pending + month.rejected, 0);
  const totalApproved = expenseData.reduce((sum, month) => sum + month.approved, 0);
  const approvalRate = ((totalApproved / totalExpenses) * 100).toFixed(1);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Reports & Analytics
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Comprehensive view of company expense patterns and trends.
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="week">Last Week</MenuItem>
                <MenuItem value="month">Last Month</MenuItem>
                <MenuItem value="quarter">Last Quarter</MenuItem>
                <MenuItem value="year">Last Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="all">All Departments</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="finance">Finance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                ${(totalExpenses / 1000).toFixed(0)}K
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Expenses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {approvalRate}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Approval Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                47
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Active Employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                23
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Pending Approvals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Expense Trend Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Expense Trends
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill="#10b981" name="Approved" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Expense by Category
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Department Breakdown */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Department Performance
            </Typography>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Total Expenses</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Approved</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Pending</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Rejected</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Approval Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departmentData.map((dept) => {
                    const approvalRate = ((dept.approved / dept.total) * 100).toFixed(1);
                    return (
                      <TableRow key={dept.department}>
                        <TableCell sx={{ fontWeight: '500' }}>{dept.department}</TableCell>
                        <TableCell align="right">${dept.total.toLocaleString()}</TableCell>
                        <TableCell align="right">${dept.approved.toLocaleString()}</TableCell>
                        <TableCell align="right">${dept.pending.toLocaleString()}</TableCell>
                        <TableCell align="right">${dept.rejected.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={`${approvalRate}%`} 
                            color={approvalRate > 80 ? 'success' : approvalRate > 60 ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Large Expenses */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Recent Large Expenses
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.employee}</TableCell>
                  <TableCell>{expense.department}</TableCell>
                  <TableCell align="right">${expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    <Chip 
                      label={expense.status.toUpperCase()} 
                      color={getStatusColor(expense.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminReports;