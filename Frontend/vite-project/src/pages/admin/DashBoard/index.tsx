import React, { Suspense, lazy } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';

// Lazy load any additional components if needed
const SomeComponent = lazy(() => import('../../../components/SomeComponent')); // Example of a lazy-loaded component

const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ ml: '250px', p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Manage your site efficiently with the tools provided.
      </Typography>

      {/* Suspense for lazy loading */}
      <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={200} />}>
        <SomeComponent /> {/* Replace with your actual component */}
      </Suspense>

      {/* Example of additional content with skeleton loading */}
      <Suspense fallback={<Skeleton variant="text" width="80%" height={30} />}>
        <Typography variant="h6" sx={{ mt: 4 }}>
          Additional Information
        </Typography>
        <Typography variant="body1">
          Here you can find more details about your site management.
        </Typography>
      </Suspense>
    </Box>
  );
};

export default AdminDashboard;