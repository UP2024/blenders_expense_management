import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'error';
      case 'manager': return 'success'; 
      case 'employee': return 'primary';
      default: return 'default';
    }
  };

  return (
    <AppBar position="static" elevation={1} sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
          💼 ExpenseReimburse Pro
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: '500' }}>
              {user?.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              {user?.company}
            </Typography>
          </Box>
          <Chip 
            label={user?.role?.toUpperCase()} 
            color={getRoleColor(user?.role)}
            size="small"
          />
          <Button 
            variant="outlined" 
            onClick={handleLogout}
            sx={{ borderColor: '#e2e8f0', color: '#64748b' }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;