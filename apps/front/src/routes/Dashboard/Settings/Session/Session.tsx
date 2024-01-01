import React from 'react';

import { Box, List, Paper, Stack, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import LoaderSuspense from '../../../../components/Loader/LoaderSuspense';
import { useGetSessions } from '../../../../services/api/useSession';
import SessionItem from './SessionItem';

export default function Sessions() {
  const { t } = useTranslation();
  const { isFetching, data } = useGetSessions();

  return (
    <LoaderSuspense isFetching={isFetching}>
      <Box display={'flex'} justifyContent={'center'}>
        <Stack spacing={2} minWidth={800} maxWidth={{ lg: 1000 }}>
          <Typography variant="h6" fontWeight="bold">
            {t('settings.sessions.title')}
          </Typography>
          <Paper sx={{ padding: '1rem' }}>
            <List>{data && data.map((session) => <SessionItem key={session.id} session={session}></SessionItem>)}</List>
          </Paper>
        </Stack>
      </Box>
    </LoaderSuspense>
  );
}
