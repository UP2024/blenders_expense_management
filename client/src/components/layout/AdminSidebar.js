import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Employees', path: '/admin/employees' },
    { label: 'Managers', path: '/admin/managers' },
    { label: 'Approval Rules', path: '/admin/approval-rules' },
    { label: 'Reports', path: '/admin/reports' },
    { label: 'Company Settings', path: '/admin/company-settings' }
  ];

  return (
    <Paper sx={{ 
      width: 280, 
      minHeight: '100vh', 
      borderRadius: 0,
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      color: 'white'
    }}>
      <Typography variant="h6" sx={{ p: 3, fontWeight: 'bold', borderBottom: '1px solid #334155' }}>
        Admin Portal
      </Typography>
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              textDecoration: 'none',
              color: '#cbd5e1',
              borderRadius: 2,
              mb: 1,
              '&.active': {
                backgroundColor: '#3b82f6',
                color: 'white',
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
              },
              '&:hover': {
                backgroundColor: '#334155',
                color: 'white'
              }
            }}
          >
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ 
                fontSize: '14px',
                fontWeight: '500'
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminSidebar;