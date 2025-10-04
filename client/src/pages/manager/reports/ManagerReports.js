import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const ManagerReports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', approved: 4200, pending: 1200, rejected: 300 },
    { month: 'Feb', approved: 3800, pending: 900, rejected: 200 },
    { month: 'Mar', approved: 5100, pending: 1500, rejected: 400 },
    { month: 'Apr', approved: 4800, pending: 1300, rejected: 350 },
    { month: 'May', approved: 6200, pending: 1800, rejected: 500 },
    { month: 'Jun', approved: 5900, pending: 1600, rejected: 450 }
  ];

  const categoryData = [
    { category: 'Travel', budget: 15000, spent: 12800, remaining: 2200 },
    { category: 'Meals', budget: 8000, spent: 6200, remaining: 1800 },
    { category: 'Software', budget: 12000, spent: 9800, remaining: 2200 },
    { category: 'Equipment', budget: 10000, spent: 7500, remaining: 2500 },
    { category: 'Training', budget: 5000, spent: 3200, remaining: 1800 }
  ];

  const teamPerformance = [
    { employee: 'John Doe', submitted: 18, approved: 15, rejected: 1, avgAmount: 467, approvalRate: '83%' },
    { employee: 'Sarah Smith', submitted: 15, approved: 13, rejected: 0, avgAmount: 415, approvalRate: '87%' },
    { employee: 'Mike Johnson', submitted: 12, approved: 9, rejected: 2, avgAmount: 343, approvalRate: '75%' },
    { employee: 'Emily Davis', submitted: 8, approved: 7, rejected: 1, avgAmount: 372, approvalRate: '88%' }
  ];

  const approvalTrends = [
    { week: 'W1', approvalRate: 78, avgProcessing: 2.1 },
    { week: 'W2', approvalRate: 82, avgProcessing: 1.8 },
    { week: 'W3', approvalRate: 75, avgProcessing: 2.4 },
    { week: 'W4', approvalRate: 85, avgProcessing: 1.6 },
    { week: 'W5', approvalRate: 88, avgProcessing: 1.4 }
  ];

  const totalApproved = monthlyData.reduce((sum, month) => sum + month.approved, 0);
  const totalPending = monthlyData.reduce((sum, month) => sum + month.pending, 0);
  const approvalRate = ((totalApproved / (totalApproved + totalPending)) * 100).toFixed(1);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Team Reports & Analytics
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Comprehensive analytics and insights for your team's expense management.
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
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                label="Report Type"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="overview">Overview</MenuItem>
                <MenuItem value="performance">Team Performance</MenuItem>
                <MenuItem value="budget">Budget Analysis</MenuItem>
                <MenuItem value="trends">Approval Trends</MenuItem>
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
                ${(totalApproved / 1000).toFixed(1)}K
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Approved
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
                53
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Submissions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                1.9
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Avg. Processing Days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* Monthly Expense Trend */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Monthly Expense Trends
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={monthlyData}>
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

        {/* Approval Trends */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Approval Trends
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={approvalTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="approvalRate" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Approval Rate %" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Budget vs Actual */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Budget vs Actual Spending
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#94a3b8" name="Budget" />
                <Bar dataKey="spent" fill="#3b82f6" name="Actual Spent" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Processing Time Trend */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Average Processing Time
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={approvalTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgProcessing" stroke="#f59e0b" strokeWidth={2} name="Days to Process" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Team Performance Table */}
      <Paper sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Team Performance
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Submitted</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Approved</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Rejected</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Avg. Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Approval Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamPerformance.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: '500' }}>{employee.employee}</TableCell>
                  <TableCell align="center">{employee.submitted}</TableCell>
                  <TableCell align="center">{employee.approved}</TableCell>
                  <TableCell align="center">{employee.rejected}</TableCell>
                  <TableCell align="center">${employee.avgAmount}</TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: parseFloat(employee.approvalRate) > 80 ? '#10b981' : 
                              parseFloat(employee.approvalRate) > 70 ? '#f59e0b' : '#ef4444',
                        fontWeight: 'bold'
                      }}
                    >
                      {employee.approvalRate}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ManagerReports;