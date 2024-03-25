import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

import { useTranslation } from 'react-i18next';

import { ReactComponent as ServerError } from '../../assets/svg/server_error.svg';

export default function ServerDown() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" minHeight="100%" alignItems="center" justifyContent="center" padding={2}>
      <div style={{ width: 'fit-content', height: 'fit-content', marginBottom: '2rem' }}>
        <ServerError width="inerhit" height="inerhit" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} />
      </div>
      <Typography textAlign="center" variant="h4" fontWeight={700}>
        {t('errors.serverDown.title')}
      </Typography>
      <Typography textAlign="center" variant="subtitle1" color={theme.palette.text.secondary}>
        {t('errors.serverDown.description')}
      </Typography>
      <Typography textAlign="center" variant="subtitle1" color={theme.palette.text.secondary}>
        {t('errors.serverDown.subDescription')}
      </Typography>
    </Box>
  );
}
