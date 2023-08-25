import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { enqueueSnackbar } from 'notistack';

import { AvailableState, PluginAttributes } from '@friday-ai/shared';

import { useTranslation } from 'react-i18next';
import LoaderSuspense from '../../../components/Loader/LoaderSuspense';
import Menu from '../../../components/Menu/Menu';
import PluginList from './Plugins/PluginList';
import SatelliteCard from './SatelliteCard';

import { useGetSatelliteById } from '../../../services/api/useSatellite';

export default function Details() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { isLoading, data: satellite } = useGetSatelliteById(id || '');

  const [filter, setFilter] = useState([
    AvailableState.PLUGIN_INSTALLED,
    AvailableState.PLUGIN_RUNNING,
    AvailableState.PLUGIN_STOPPED,
    AvailableState.PLUGIN_ERRORED,
    AvailableState.PLUGIN_WAITING_CONFIGURATION,
  ]);

  const [plugins, setPlugins] = useState<PluginAttributes[]>([]);

  const handleFilter = (_: React.MouseEvent<HTMLElement>, newFilter: AvailableState[]) => {
    setFilter(newFilter);
    const filteredPlugins = satellite ? satellite.plugins.filter((plugin) => newFilter.includes(plugin.state.value as AvailableState)) : [];
    setPlugins(filteredPlugins);
  };

  const handleRemovePLugin = (pluginId: string) => {
    const newPlugins = satellite ? satellite.plugins.filter((plugin) => plugin.id !== pluginId) : [];
    satellite!.plugins = newPlugins;
    setPlugins(newPlugins);
  };

  const handleAction = useCallback(() => {
    enqueueSnackbar('This feature is not implemented yet :(', { variant: 'warning' });
  }, []);

  useEffect(() => {
    if (satellite && satellite.plugins) {
      setPlugins(satellite.plugins);
    }
  }, [satellite]);

  return (
    <LoaderSuspense isFetching={isLoading}>
      <Box padding={2}>
        <Stack spacing={2} direction={{ xs: 'column', lg: 'row' }} divider={<Divider orientation="vertical" flexItem />}>
          <Stack spacing={2} minWidth={300} maxWidth={{ lg: 550 }}>
            <Stack direction="row" alignItems="center" paddingBottom={0.4}>
              <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                {t('dashboard.satellites.satellite')}
              </Typography>
              <Stack direction="row">
                <Tooltip title={t('dashboard.satellites.stopSatellite')}>
                  <IconButton aria-label="stop satellite" onClick={() => handleAction()}>
                    <StopCircleOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('dashboard.satellites.restartSatellite')}>
                  <IconButton aria-label="restart satellite" onClick={() => handleAction()}>
                    <RestartAltOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            {satellite && (
              <Fade in={!isLoading} style={{ transitionDelay: '300ms' }}>
                <Box>
                  <SatelliteCard satellite={satellite} />
                </Box>
              </Fade>
            )}
          </Stack>

          <Stack spacing={2} flexGrow={1}>
            <Stack direction="row" alignItems="center">
              <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                {t('dashboard.satellites.installedPlugins')}
              </Typography>

              <Paper sx={{ display: { xs: 'none', md: 'block' } }}>
                <ToggleButtonGroup
                  color="primary"
                  value={filter}
                  onChange={handleFilter}
                  aria-label="plugin filter"
                  size="small"
                  disabled={satellite && satellite.plugins.length < 1}
                >
                  <ToggleButton value={AvailableState.PLUGIN_INSTALLED}>{t('dashboard.satellites.stateInstalled')}</ToggleButton>
                  <ToggleButton value={AvailableState.PLUGIN_RUNNING}>{t('dashboard.satellites.stateRunning')}</ToggleButton>
                  <ToggleButton value={AvailableState.PLUGIN_STOPPED}>{t('dashboard.satellites.stateStopped')}</ToggleButton>
                  <ToggleButton value={AvailableState.PLUGIN_ERRORED}>{t('dashboard.satellites.stateErrored')}</ToggleButton>
                  <ToggleButton value={AvailableState.PLUGIN_WAITING_CONFIGURATION}>{t('dashboard.satellites.stateWaitingConfig')}</ToggleButton>
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
                  disabled={satellite && satellite.plugins.length < 1}
                >
                  <ToggleButton value={AvailableState.PLUGIN_INSTALLED}>{t('dashboard.satellites.stateInstalled')}</ToggleButton>
                  <ToggleButton value={AvailableState.PLUGIN_RUNNING}>{t('dashboard.satellites.stateRunning')}</ToggleButton>
                  <ToggleButton value={AvailableState.PLUGIN_STOPPED}>{t('dashboard.satellites.stateStopped')}</ToggleButton>
                  <ToggleButton value={AvailableState.PLUGIN_ERRORED}>{t('dashboard.satellites.stateErrored')}</ToggleButton>
                  <ToggleButton value={AvailableState.PLUGIN_WAITING_CONFIGURATION}>{t('dashboard.satellites.stateWaitingConfig')}</ToggleButton>
                </ToggleButtonGroup>
              </Menu>
            </Stack>

            <Fade in={!isLoading} style={{ transitionDelay: '300ms' }}>
              <Box>
                <PluginList plugins={plugins} onRemovePlugin={handleRemovePLugin} />
              </Box>
            </Fade>
          </Stack>
        </Stack>
      </Box>
    </LoaderSuspense>
  );
}
