import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    
    // Mock user data based on email
    let userData = null;
    
    if (email.includes('admin')) {
      userData = {
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'admin',
        company: 'Tech Corp'
      };
    } else if (email.includes('manager')) {
      userData = {
        id: 2,
        name: 'Manager User',
        email: email,
        role: 'manager',
        company: 'Tech Corp',
        teamSize: 8
      };
    } else {
      userData = {
        id: 3,
        name: 'Employee User',
        email: email,
        role: 'employee',
        company: 'Tech Corp',
        manager: 'Manager User'
      };
    }

    setTimeout(() => {
      setUser(userData);
      setLoading(false);
      localStorage.setItem('user', JSON.stringify(userData));
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user exists in localStorage on app start
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};