import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
      padding={4}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Your CMS
      </Typography>
      <Typography variant="body1" paragraph>
        This is your content management system (CMS). Choose the features you'd like to use.
      </Typography>
      <Typography variant="body2" paragraph>
        Manage your forms, static content, and SEO settings all in one place. 
        Get started by navigating to the admin dashboard or explore the static content.
      </Typography>
      <MotionButton
        variant="contained"
        color="primary"
        onClick={() => navigate('/admin/dashboard')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ margin: '10px' }}
      >
        Go to Admin Dashboard
      </MotionButton>
      <MotionButton
        variant="outlined"
        color="secondary"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ margin: '10px' }}
      >
        Explore Static Content
      </MotionButton>
    </Box>
  );
};

export default Home;