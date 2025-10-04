import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Paper } from '@mui/material';

const StatCard = ({ title, value, subtitle, color = '#3b82f6' }) => (
  <Card sx={{ 
    background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
    color: 'white',
    borderRadius: 3,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }}>
    <CardContent>
      <Typography variant="h6" sx={{ opacity: 0.9, fontSize: '14px' }}>
        {title}
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Company Overview
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Welcome back! Here's what's happening with your company today.
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Employees" 
            value="47" 
            subtitle="+2 this month"
            color="#3b82f6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Pending Expenses" 
            value="23" 
            subtitle="Awaiting approval"
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Active Managers" 
            value="8" 
            subtitle="Managing teams"
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Monthly Spend" 
            value="$12,450" 
            subtitle="This month"
            color="#ef4444"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1e293b' }}>
              Recent Activity
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ 
                  p: 2, 
                  border: '1px solid #e2e8f0', 
                  borderRadius: 2,
                  '&:hover': { backgroundColor: '#f8fafc' }
                }}>
                  <Typography variant="body2" sx={{ fontWeight: '500' }}>
                    New expense submitted by John Doe
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    2 hours ago • $150 • Travel
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1e293b' }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 2, backgroundColor: '#f0f9ff', borderRadius: 2, cursor: 'pointer' }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  Add New Employee
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Invite team members
                </Typography>
              </Box>
              <Box sx={{ p: 2, backgroundColor: '#f0fdf4', borderRadius: 2, cursor: 'pointer' }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  Review Expenses
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  23 pending approvals
                </Typography>
              </Box>
              <Box sx={{ p: 2, backgroundColor: '#fffbeb', borderRadius: 2, cursor: 'pointer' }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  Generate Reports
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Monthly analytics
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;