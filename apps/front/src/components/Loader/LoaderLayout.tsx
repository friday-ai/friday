import Box from '@mui/material/Box';
import React from 'react';

import FaviconLoader from './Loader';

export default function LoaderLayout() {
  return (
    <Box display="flex" minHeight="100%" alignItems="center" justifyContent="center">
      <FaviconLoader />
    </Box>
  );
}
