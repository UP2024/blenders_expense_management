import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Team = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Software Engineer',
      status: 'active',
      totalExpenses: 8450,
      pendingExpenses: 2,
      approvedExpenses: 15,
      rejectedExpenses: 1,
      joinDate: '2023-03-15'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@company.com',
      role: 'Product Manager',
      status: 'active',
      totalExpenses: 6230,
      pendingExpenses: 1,
      approvedExpenses: 12,
      rejectedExpenses: 0,
      joinDate: '2022-11-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'UX Designer',
      status: 'active',
      totalExpenses: 4120,
      pendingExpenses: 3,
      approvedExpenses: 8,
      rejectedExpenses: 2,
      joinDate: '2023-06-10'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'QA Engineer',
      status: 'active',
      totalExpenses: 2980,
      pendingExpenses: 0,
      approvedExpenses: 6,
      rejectedExpenses: 1,
      joinDate: '2024-01-08'
    }
  ];

  // Team expense trends
  const expenseTrends = [
    { name: 'John', expenses: 8450 },
    { name: 'Sarah', expenses: 6230 },
    { name: 'Mike', expenses: 4120 },
    { name: 'Emily', expenses: 2980 }
  ];

  // Expense categories distribution
  const categoryData = [
    { name: 'Travel', value: 35, color: '#3b82f6' },
    { name: 'Meals', value: 25, color: '#10b981' },
    { name: 'Software', value: 20, color: '#f59e0b' },
    { name: 'Equipment', value: 15, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' }
  ];

  // Recent team expenses
  const recentExpenses = [
    { id: 1, employee: 'John Doe', amount: 450, category: 'Travel', status: 'approved', date: '2024-06-15' },
    { id: 2, employee: 'Sarah Smith', amount: 120, category: 'Meals', status: 'pending', date: '2024-06-14' },
    { id: 3, employee: 'Mike Johnson', amount: 299, category: 'Software', status: 'rejected', date: '2024-06-13' },
    { id: 4, employee: 'Emily Davis', amount: 89, category: 'Meals', status: 'approved', date: '2024-06-12' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const totalTeamExpenses = teamMembers.reduce((sum, member) => sum + member.totalExpenses, 0);
  const pendingApprovals = teamMembers.reduce((sum, member) => sum + member.pendingExpenses, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        My Team
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Manage and monitor your team's expenses and performance.
      </Typography>

      {/* Team Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {teamMembers.length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Team Members
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                ${(totalTeamExpenses / 1000).toFixed(1)}K
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Expenses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {pendingApprovals}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Pending Approvals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                78%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Approval Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Team Members Table */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Team Members
            </Typography>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Member</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Total Expenses</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Pending</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Approved</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Rejected</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: '#3b82f6', width: 32, height: 32, fontSize: '14px' }}>
                            {getInitials(member.name)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>
                              {member.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                              {member.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell align="right">${member.totalExpenses.toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <Chip label={member.pendingExpenses} color="warning" size="small" />
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={member.approvedExpenses} color="success" size="small" />
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={member.rejectedExpenses} color="error" size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Recent Team Expenses */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Recent Team Expenses
            </Typography>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
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
        </Grid>

        {/* Charts Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Expense Distribution */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3, height: 300 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Expense Distribution
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

          {/* Team Expense Comparison */}
          <Paper sx={{ p: 3, borderRadius: 3, height: 300 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Team Expense Comparison
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={expenseTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="expenses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Team;