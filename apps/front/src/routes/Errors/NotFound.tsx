import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import React from 'react';

import { useTheme } from '@mui/material/styles';

import { Typography } from '@mui/material';
import { ReactComponent as ServerError } from '../../assets/svg/404.svg';

export default function NotFound() {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" minHeight="100%" alignItems="center" justifyContent="center" margin={2}>
      <div style={{ width: 'fit-content', height: 'fit-content', marginBottom: '2rem' }}>
        <ServerError width="inerhit" height="inerhit" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} />
      </div>
      <Typography textAlign="center" variant="h4" fontWeight={700}>
        Sorry we couldn&apos;t find this page.
      </Typography>
      <Typography textAlign="center" variant="subtitle1" color={theme.palette.text.secondary}>
        But dont worry, you can find plenty of other things on homepage.
      </Typography>
      <Link href="/dashboard/devices">back to homepage</Link>
    </Box>
  );
}
