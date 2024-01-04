import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { useTheme } from '@mui/material/styles';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { ReactComponent as ServerError } from '../../assets/svg/404.svg';

export default function NotFound() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" minHeight="100%" alignItems="center" justifyContent="center" margin={2}>
      <div style={{ width: 'fit-content', height: 'fit-content', marginBottom: '2rem' }}>
        <ServerError width="inerhit" height="inerhit" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} />
      </div>
      <Typography textAlign="center" variant="h4" fontWeight={700}>
        {t('errors.notFound.title')}
      </Typography>
      <Typography textAlign="center" variant="subtitle1" color={theme.palette.text.secondary}>
        {t('errors.notFound.description')}
      </Typography>
      <Link component={RouterLink} to="/dashboard">
        {t('errors.notFound.backToHome')}
      </Link>
    </Box>
  );
}
