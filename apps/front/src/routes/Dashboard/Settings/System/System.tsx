import React, { useState } from 'react';

import { Box, Card, CardContent, Chip, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { enqueueSnackbar } from 'notistack';
import LoaderSuspense from '../../../../components/Loader/LoaderSuspense';
import { useGetSystemSettings } from '../../../../services/api/useSystem';
import useVariable from '../../../../services/api/useVariable';

export default function System() {
  const { t } = useTranslation();
  const { updateVariable } = useVariable();
  const { isFetching, isFetchedAfterMount, data: settings } = useGetSystemSettings();
  const [history, setHistory] = useState(settings?.history || '1 month');
  const [units, setUnits] = useState(settings?.units || 'metric');

  const handleHistoryChange = async (h: string) => {
    await updateVariable.mutateAsync({ id: 'history_state_in_days', variable: { value: h } });
    setHistory(h);
    enqueueSnackbar(t('settings.system.saved'), { variant: 'success' });
  };

  const handleUnitsChange = async (u: string) => {
    await updateVariable.mutateAsync({ id: 'system_units', variable: { value: u } });
    setUnits(u);
    enqueueSnackbar(t('settings.system.saved'), { variant: 'success' });
  };

  return (
    <LoaderSuspense isFetching={isFetching && !isFetchedAfterMount}>
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight="bold">
          {t('settings.system.title')}
        </Typography>
        <Stack direction={'row'} spacing={2} justifyContent={'center'} useFlexGap flexWrap="wrap">
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={1}>
                <Typography sx={{ mb: 1.5 }} variant="h6" component="div">
                  {t('settings.system.version')}
                </Typography>
                <Typography>
                  {t('settings.system.installed')}: {settings?.version}
                </Typography>
                <Box>
                  <Chip label={t('settings.system.upToDate')} color="success" variant="outlined" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                {t('settings.system.history')}
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                {t('settings.system.historyDescription')}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="time">{t('settings.system.historyTitle')}</InputLabel>
                <Select labelId="time" id="time-select" label="Time" value={history} onChange={(e) => handleHistoryChange(e.target.value)}>
                  <MenuItem value="1 month">{t('settings.system.1m')}</MenuItem>
                  <MenuItem value="3 months">{t('settings.system.3m')}</MenuItem>
                  <MenuItem value="6 months">{t('settings.system.6m')}</MenuItem>
                  <MenuItem value="1 year">{t('settings.system.1y')}</MenuItem>
                  <MenuItem value="unlimited">{t('settings.system.unlimited')}</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                {t('settings.system.units')}
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                {t('settings.system.unitsDescription')}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="units">{t('settings.system.units')}</InputLabel>
                <Select labelId="units" id="units-select" label="Units" value={units} onChange={(e) => handleUnitsChange(e.target.value)}>
                  <MenuItem value="metric">{t('settings.system.metric')}</MenuItem>
                  <MenuItem value="us">{t('settings.system.us')}</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </LoaderSuspense>
  );
}
