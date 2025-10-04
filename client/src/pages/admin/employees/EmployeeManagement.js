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
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'employee',
      department: 'Engineering',
      manager: 'Sarah Smith',
      status: 'active',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@company.com',
      role: 'manager',
      department: 'Engineering',
      manager: '-',
      status: 'active',
      joinDate: '2022-08-10'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'employee',
      department: 'Marketing',
      manager: 'Robert Brown',
      status: 'inactive',
      joinDate: '2024-03-20'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    department: '',
    manager: '',
    status: 'active'
  });

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const managers = employees.filter(emp => emp.role === 'manager');

  const handleOpenDialog = (employee = null) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData(employee);
    } else {
      setEditingEmployee(null);
      setFormData({
        name: '',
        email: '',
        role: 'employee',
        department: '',
        manager: '',
        status: 'active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingEmployee(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { ...formData, id: editingEmployee.id } : emp
      ));
    } else {
      // Add new employee
      const newEmployee = {
        ...formData,
        id: employees.length + 1,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setEmployees([...employees, newEmployee]);
    }
    handleCloseDialog();
  };

  const handleDelete = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'error';
      case 'manager': return 'success';
      case 'employee': return 'primary';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Employee Management
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Manage your company's employees, their roles, and departments.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {employees.length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {employees.filter(emp => emp.role === 'manager').length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Managers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {employees.filter(emp => emp.status === 'active').length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Active Employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {new Set(employees.map(emp => emp.department)).size}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Departments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          placeholder="Search employees..."
          size="small"
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Employee
        </Button>
      </Box>

      {/* Employees Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Manager</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Join Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                <TableCell>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>
                      {employee.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      {employee.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={employee.role.toUpperCase()} 
                    color={getRoleColor(employee.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.manager}</TableCell>
                <TableCell>
                  <Chip 
                    label={employee.status.toUpperCase()} 
                    color={getStatusColor(employee.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(employee.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDialog(employee)}
                    sx={{ color: '#3b82f6' }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(employee.id)}
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

      {/* Add/Edit Employee Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
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
                  label="Role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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
                  select
                  label="Manager"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  disabled={formData.role === 'manager' || formData.role === 'admin'}
                >
                  <MenuItem value="">No Manager</MenuItem>
                  {managers.map((manager) => (
                    <MenuItem key={manager.id} value={manager.name}>
                      {manager.name}
                    </MenuItem>
                  ))}
                </TextField>
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
              {editingEmployee ? 'Update Employee' : 'Add Employee'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default EmployeeManagement;