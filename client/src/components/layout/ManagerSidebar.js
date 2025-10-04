import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';

const ManagerSidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/manager/dashboard' },
    { icon: '✅', label: 'Proposals', path: '/manager/proposals' },
    { icon: '👥', label: 'My Team', path: '/manager/team' },
    { icon: '📊', label: 'Reports', path: '/manager/reports' }
  ];

  return (
    <Paper sx={{ width: 250, minHeight: '100vh', borderRadius: 0 }}>
      <List>
        <ListItem>
          <ListItemText 
            primary="👨‍💼 Manager Portal" 
            primaryTypographyProps={{ 
              variant: 'h6', 
              fontWeight: 'bold',
              sx: { color: 'success.main' }
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
                backgroundColor: 'success.main',
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

export default ManagerSidebar;