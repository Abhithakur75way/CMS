import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/Reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          CMS App
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography sx={{ mr: 2 }}>
            {isAuthenticated ? `Welcome, ${user?.username || 'User  '}` : 'Please log in'}
          </Typography>
          <MotionButton
            color="inherit"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ marginLeft: 2 }}
            disabled={isAuthenticated} // Disable login button if authenticated
          >
            Login
          </MotionButton>
          <MotionButton
            color="inherit"
            onClick={() => navigate('/register')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ marginLeft: 2 }}
            disabled={isAuthenticated} // Disable register button if authenticated
          >
            Register
          </MotionButton>
          <MotionButton
            color="inherit"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ marginLeft: 2 }}
            disabled={!isAuthenticated} // Disable logout button if not authenticated
          >
            Logout
          </MotionButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;