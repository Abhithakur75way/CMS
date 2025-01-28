import React from 'react';
import { Box, List, ListItem, ListItemText, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionListItem = motion(ListItem);

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      width={250}
      bgcolor={theme.palette.background.paper}
      height="100vh"
      position="fixed"
      boxShadow={theme.shadows[2]}
    >
      <List>
        <MotionListItem
          button
          onClick={() => navigate('/admin/dashboard')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ListItemText primary="Dashboard" />
        </MotionListItem>
        <Divider />
        <MotionListItem
          button
          onClick={() => navigate('/admin/form-builder')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ListItemText primary="Form Builder" />
        </MotionListItem>
        <Divider />
        <MotionListItem
          button
          onClick={() => navigate('/admin/static-content')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ListItemText primary="Static Content" />
        </MotionListItem>
        <Divider />
        <MotionListItem
          button
          onClick={() => navigate('/admin/seo-manager')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ListItemText primary="SEO Manager" />
        </MotionListItem>
      </List>
    </Box>
  );
};

export default AdminSidebar;