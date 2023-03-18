import Box from '@mui/material/Box';
import React from 'react';

import { useTheme } from '@mui/material/styles';

import { Typography } from '@mui/material';
import { ReactComponent as ServerError } from '../../assets/svg/server_error.svg';

export default function ServerDown() {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" minHeight="100%" alignItems="center" justifyContent="center" margin={2}>
      <div style={{ width: 'fit-content', height: 'fit-content', marginBottom: '2rem' }}>
        <ServerError width="inerhit" height="inerhit" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} />
      </div>
      <Typography textAlign="center" variant="h4" fontWeight={700}>
        Your server is feeling a little down
      </Typography>
      <Typography textAlign="center" variant="subtitle1" color={theme.palette.text.secondary}>
        Please restart your machine and try again in a few moments
      </Typography>
      <Typography textAlign="center" variant="subtitle1" color={theme.palette.text.secondary}>
        He&apos;ll be back in no time
      </Typography>
    </Box>
  );
}
