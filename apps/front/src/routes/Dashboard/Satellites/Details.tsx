import React, { useCallback, useState } from 'react';

import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { enqueueSnackbar } from 'notistack';

import { SatelliteAttributes } from '@friday-ai/shared';

import PluginList from './PluginList';
import SatelliteCard from './SatelliteCard';

export default function Details({ satellite }: { satellite: SatelliteAttributes }) {
  const [filter, setFilter] = useState(['running', 'stopped', 'errored', 'waiting-config']);

  const handleFilter = (_: React.MouseEvent<HTMLElement>, newFilter: string[]) => {
    setFilter(newFilter);
  };

  const handleAction = useCallback(() => {
    enqueueSnackbar('This feature is not implemented yet :(', { variant: 'warning' });
  }, []);

  return (
    <Box padding={2}>
      <Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack spacing={2} minWidth={400} maxWidth={550}>
          <Stack direction="row" alignItems="center" paddingBottom={0.4}>
            <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
              Satellite
            </Typography>
            <Stack direction="row">
              <Tooltip title="Stop satellite">
                <IconButton aria-label="stop satellite" onClick={() => handleAction()}>
                  <StopCircleOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Restart satellite">
                <IconButton aria-label="restart satellite" onClick={() => handleAction()}>
                  <RestartAltOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <SatelliteCard satellite={satellite} />
        </Stack>

        <Stack spacing={2} flexGrow={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
              Installed plugins
            </Typography>

            <Paper>
              <ToggleButtonGroup color="primary" value={filter} onChange={handleFilter} aria-label="plugin filter" size="small">
                <ToggleButton value="running">Running</ToggleButton>
                <ToggleButton value="stopped">Stopped</ToggleButton>
                <ToggleButton value="errored">Errored</ToggleButton>
                <ToggleButton value="waiting-config">Waiting Config</ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Stack>

          <PluginList plugins={satellite.plugins} />
        </Stack>
      </Stack>
    </Box>
  );
}
