import React, { useCallback } from 'react';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { AvailableState, SatelliteAttributes } from '@friday-ai/shared';
import { formatDistance } from 'date-fns';
import { enqueueSnackbar } from 'notistack';

import Pie from '../../../components/Charts/Pie';
import { SatelliteState } from './States';

import { getPluginsStates } from '../../../utils/data';

export default function SatelliteCard({ satellite }: { satellite: SatelliteAttributes }) {
  const theme = useTheme();

  const uptime = formatDistance(new Date(satellite.lastHeartbeat), new Date(), { addSuffix: true });

  const handleAction = useCallback(() => {
    enqueueSnackbar('This feature is not implemented yet :(', { variant: 'warning' });
  }, []);

  return (
    <Paper sx={{ padding: '2rem' }}>
      <Stack spacing={3}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold">
            {satellite.name}
          </Typography>
          <SatelliteState state={satellite.state.value as AvailableState} />
        </Stack>

        <Stack spacing={2}>
          <Stack spacing={6} direction="row" alignItems="start">
            <Stack spacing={1}>
              <Typography color="GrayText">Ip address:</Typography>
              <Typography color="GrayText">Location:</Typography>
              <Typography color="GrayText">Uptime:</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight="500">192.168.3.3</Typography>
              <Typography fontWeight="500">{satellite.room.name}</Typography>
              <Typography fontWeight="500">{uptime}</Typography>
            </Stack>
          </Stack>

          <Divider flexItem />

          <Stack direction="row" alignItems="center">
            <Typography fontWeight="bold" sx={{ flexGrow: 1 }}>
              Plugins states
            </Typography>
            <Stack direction="row">
              <Tooltip title="Install new plugin">
                <IconButton aria-label="install new plugin" onClick={() => handleAction()}>
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Stop all plugins">
                <IconButton aria-label="stop all plugins" onClick={() => handleAction()} disabled={satellite.plugins.length < 1}>
                  <StopCircleOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Restart all plugins">
                <IconButton aria-label="restart all plugins" onClick={() => handleAction()} disabled={satellite.plugins.length < 1}>
                  <RestartAltOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Box sx={{ height: 350 }}>
            <Pie data={getPluginsStates(satellite.plugins, theme)} totalCount={satellite.plugins.length} totalLabel="Plugins" />
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
