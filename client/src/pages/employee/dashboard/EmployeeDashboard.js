import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EmployeeDashboard = () => {
  // Real data
  const expenseStats = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 900 },
    { month: 'Apr', amount: 2100 },
    { month: 'May', amount: 1500 },
    { month: 'Jun', amount: 1900 }
  ];

  const recentActivities = [
    { id: 1, description: 'Hotel accommodation approved', amount: 300, date: '2024-06-15', status: 'approved' },
    { id: 2, description: 'Team lunch submitted', amount: 85, date: '2024-06-14', status: 'pending' },
    { id: 3, description: 'Software subscription rejected', amount: 299, date: '2024-06-10', status: 'rejected' },
    { id: 4, description: 'Flight tickets approved', amount: 450, date: '2024-06-08', status: 'approved' }
  ];

  const getStatusColor = (status) => {
    return status === 'approved' ? '#10b981' : status === 'pending' ? '#f59e0b' : '#ef4444';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        My Expense Dashboard
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Welcome back! Here's your expense summary and recent activity.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                $7,450
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Submitted
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                12
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Approved Expenses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                3
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Pending Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                2
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Rejected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Expense Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Monthly Expense Trend
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={expenseStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Recent Activity
            </Typography>
            <List sx={{ maxHeight: 320, overflow: 'auto' }}>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id} sx={{ borderBottom: '1px solid #e2e8f0', py: 2 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: '500' }}>
                        {activity.description}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          ${activity.amount} • {new Date(activity.date).toLocaleDateString()}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: getStatusColor(activity.status),
                            fontWeight: 'bold'
                          }}
                        >
                          {activity.status.toUpperCase()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mt: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer', '&:hover': { backgroundColor: '#f8fafc' } }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                📝 New Expense
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Submit a new expense
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer', '&:hover': { backgroundColor: '#f8fafc' } }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                📋 My Expenses
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                View all expenses
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer', '&:hover': { backgroundColor: '#f8fafc' } }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                📊 Reports
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                View analytics
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer', '&:hover': { backgroundColor: '#f8fafc' } }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                ⚙️ Profile
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Update settings
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EmployeeDashboard;