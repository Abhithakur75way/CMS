import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const SomeComponent: React.FC = () => {
  // Simulate a loading state
  const [loading, setLoading] = React.useState(true);

  // Simulate data fetching
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simulate data loading completion
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', mt: 2 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h6">Data Loaded</Typography>
          <Typography variant="body1">
            This is the content of the lazy-loaded component. You can replace this with actual data.
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SomeComponent;