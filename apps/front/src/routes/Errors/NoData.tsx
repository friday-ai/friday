import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';

import React from 'react';

import { ReactComponent as NoFound } from '../../assets/svg/no_data.svg';

export default function NoData({ title, subtitle }: { title: string; subtitle: string }) {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" minHeight="100%" alignItems="center" justifyContent="center" padding={2}>
      <div style={{ width: 'fit-content', height: 'fit-content', marginBottom: '2rem' }}>
        <NoFound width="inerhit" height="inerhit" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} />
      </div>
      <Typography textAlign="center" variant="h4" fontWeight={700}>
        {title}
      </Typography>
      <Typography textAlign="center" variant="subtitle1" color={theme.palette.text.secondary}>
        {subtitle}
      </Typography>
    </Box>
  );
}
