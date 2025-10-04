import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';

const EmployeeSidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/employee/dashboard' },
    { icon: '💰', label: 'New Expense', path: '/employee/new-expense' },
    { icon: '📋', label: 'My Expenses', path: '/employee/expenses' },
    { icon: '🚨', label: 'Expense Policy', path: '/employee/policy' }
  ];

  return (
    <Paper sx={{ width: 250, minHeight: '100vh', borderRadius: 0 }}>
      <List>
        <ListItem>
          <ListItemText 
            primary="👩‍💻 Employee Portal" 
            primaryTypographyProps={{ 
              variant: 'h6', 
              fontWeight: 'bold',
              sx: { color: 'info.main' }
            }} 
          />
        </ListItem>
        {menuItems.map((item) => (
          <ListItem 
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&.active': {
                backgroundColor: 'info.main',
                color: 'white',
                '& .MuiListItemIcon-root': { color: 'white' }
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default EmployeeSidebar;