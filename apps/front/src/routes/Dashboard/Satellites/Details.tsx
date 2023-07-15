import React, { useCallback, useState } from 'react';

import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
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

import { AvailableState, PluginAttributes, SatelliteAttributes } from '@friday-ai/shared';

import Menu from '../../../components/Menu/Menu';
import PluginList from './PluginList';
import SatelliteCard from './SatelliteCard';

export default function Details({ satellite }: { satellite: SatelliteAttributes }) {
  const [filter, setFilter] = useState([
    AvailableState.PLUGIN_RUNNING,
    AvailableState.PLUGIN_STOPPED,
    AvailableState.PLUGIN_ERRORED,
    AvailableState.PLUGIN_WAITING_CONFIGURATION,
  ]);

  const [plugins, setPlugins] = useState<PluginAttributes[]>(satellite.plugins);

  const handleFilter = (_: React.MouseEvent<HTMLElement>, newFilter: AvailableState[]) => {
    setFilter(newFilter);
    const filteredPlugins = satellite.plugins.filter((plugin) => newFilter.includes(plugin.state.value as AvailableState));
    setPlugins(filteredPlugins);
  };

  const handleAction = useCallback(() => {
    enqueueSnackbar('This feature is not implemented yet :(', { variant: 'warning' });
  }, []);

  return (
    <Box padding={2}>
      <Stack spacing={2} direction={{ xs: 'column', lg: 'row' }} divider={<Divider orientation="vertical" flexItem />}>
        <Stack spacing={2} minWidth={300} maxWidth={{ lg: 550 }}>
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

            <Paper sx={{ display: { xs: 'none', md: 'block' } }}>
              <ToggleButtonGroup
                color="primary"
                value={filter}
                onChange={handleFilter}
                aria-label="plugin filter"
                size="small"
                disabled={satellite.plugins.length < 1}
              >
                <ToggleButton value={AvailableState.PLUGIN_RUNNING}>Running</ToggleButton>
                <ToggleButton value={AvailableState.PLUGIN_STOPPED}>Stopped</ToggleButton>
                <ToggleButton value={AvailableState.PLUGIN_ERRORED}>Errored</ToggleButton>
                <ToggleButton value={AvailableState.PLUGIN_WAITING_CONFIGURATION}>Waiting Config</ToggleButton>
              </ToggleButtonGroup>
            </Paper>

            <Menu
              id="plugins-filter-menu"
              title="dashboard.appBar.userMenu.title"
              ariaLabel="filter for plugins list"
              ariaControls="plugins-menu-filter"
              label="Filters"
              icon={<FilterListOutlinedIcon />}
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            >
              <ToggleButtonGroup
                color="primary"
                value={filter}
                onChange={handleFilter}
                aria-label="plugin filter"
                size="small"
                orientation="vertical"
                disabled={satellite.plugins.length < 1}
              >
                <ToggleButton value={AvailableState.PLUGIN_RUNNING}>Running</ToggleButton>
                <ToggleButton value={AvailableState.PLUGIN_STOPPED}>Stopped</ToggleButton>
                <ToggleButton value={AvailableState.PLUGIN_ERRORED}>Errored</ToggleButton>
                <ToggleButton value={AvailableState.PLUGIN_WAITING_CONFIGURATION}>Waiting Config</ToggleButton>
              </ToggleButtonGroup>
            </Menu>
          </Stack>

          <PluginList plugins={plugins} />
        </Stack>
      </Stack>
    </Box>
  );
}
