import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { Edit, Delete, Add, Group } from '@mui/icons-material';

const ManagerManagement = () => {
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      department: 'Engineering',
      teamSize: 8,
      status: 'active',
      joinDate: '2022-08-10',
      approvedExpenses: 145,
      pendingApprovals: 5
    },
    {
      id: 2,
      name: 'Robert Brown',
      email: 'robert.brown@company.com',
      department: 'Sales',
      teamSize: 12,
      status: 'active',
      joinDate: '2021-11-15',
      approvedExpenses: 89,
      pendingApprovals: 3
    },
    {
      id: 3,
      name: 'Jennifer Lee',
      email: 'jennifer.lee@company.com',
      department: 'Marketing',
      teamSize: 6,
      status: 'active',
      joinDate: '2023-03-22',
      approvedExpenses: 67,
      pendingApprovals: 2
    },
    {
      id: 4,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      department: 'Finance',
      teamSize: 4,
      status: 'inactive',
      joinDate: '2020-05-30',
      approvedExpenses: 112,
      pendingApprovals: 0
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingManager, setEditingManager] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    teamSize: '',
    status: 'active'
  });

  const departments = ['Engineering', 'Sales', 'Marketing', 'Finance', 'HR', 'Operations', 'Product'];

  const handleOpenDialog = (manager = null) => {
    if (manager) {
      setEditingManager(manager);
      setFormData(manager);
    } else {
      setEditingManager(null);
      setFormData({
        name: '',
        email: '',
        department: '',
        teamSize: '',
        status: 'active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingManager(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingManager) {
      // Update existing manager
      setManagers(managers.map(mgr => 
        mgr.id === editingManager.id ? { ...formData, id: editingManager.id } : mgr
      ));
    } else {
      // Add new manager
      const newManager = {
        ...formData,
        id: managers.length + 1,
        joinDate: new Date().toISOString().split('T')[0],
        approvedExpenses: 0,
        pendingApprovals: 0
      };
      setManagers([...managers, newManager]);
    }
    handleCloseDialog();
  };

  const handleDelete = (managerId) => {
    if (window.confirm('Are you sure you want to delete this manager?')) {
      setManagers(managers.filter(mgr => mgr.id !== managerId));
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const totalManagers = managers.length;
  const activeManagers = managers.filter(mgr => mgr.status === 'active').length;
  const totalTeamMembers = managers.reduce((sum, mgr) => sum + mgr.teamSize, 0);
  const totalApprovals = managers.reduce((sum, mgr) => sum + mgr.approvedExpenses, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Manager Management
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Manage company managers and their team assignments.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {totalManagers}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Managers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {activeManagers}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Active Managers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {totalTeamMembers}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Team Members
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {totalApprovals}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Approvals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          placeholder="Search managers..."
          size="small"
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Manager
        </Button>
      </Box>

      {/* Managers Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Manager</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Team Size</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Approved</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Pending</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Join Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers.map((manager) => (
              <TableRow key={manager.id} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#10b981', width: 32, height: 32, fontSize: '14px' }}>
                      {getInitials(manager.name)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: '500' }}>
                        {manager.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {manager.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{manager.department}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Group sx={{ fontSize: 16, color: '#64748b', mr: 0.5 }} />
                    {manager.teamSize}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip label={manager.approvedExpenses} color="success" size="small" />
                </TableCell>
                <TableCell align="center">
                  <Chip label={manager.pendingApprovals} color="warning" size="small" />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={manager.status.toUpperCase()} 
                    color={getStatusColor(manager.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(manager.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDialog(manager)}
                    sx={{ color: '#3b82f6' }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(manager.id)}
                    sx={{ color: '#ef4444' }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Manager Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingManager ? 'Edit Manager' : 'Add New Manager'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Team Size"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {editingManager ? 'Update Manager' : 'Add Manager'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Department Summary */}
      <Paper sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Department Overview
        </Typography>
        <Grid container spacing={2}>
          {departments.map((dept) => {
            const deptManagers = managers.filter(mgr => mgr.department === dept);
            const deptTeamSize = deptManagers.reduce((sum, mgr) => sum + mgr.teamSize, 0);
            
            return (
              <Grid item xs={12} sm={6} md={4} key={dept}>
                <Card sx={{ border: '1px solid #e2e8f0' }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {dept}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Managers: {deptManagers.length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Team: {deptTeamSize}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ManagerManagement;