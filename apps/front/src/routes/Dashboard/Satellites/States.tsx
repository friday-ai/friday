import React from 'react';

import Chip from '@mui/material/Chip';

import { AvailableState } from '@friday-ai/shared';
import { useTranslation } from 'react-i18next';

export function SatelliteState({ state }: { state: AvailableState }) {
  const { t } = useTranslation();
  switch (state) {
    case AvailableState.SATELLITE_CONNECTED:
      return <Chip label={t('dashboard.satellites.stateConnected')} color="success" variant="outlined" size="small" />;
    case AvailableState.SATELLITE_DISCONNECTED:
      return <Chip label={t('dashboard.satellites.stateDisconnected')} color="warning" variant="outlined" size="small" />;
    case AvailableState.SATELLITE_WAITING_CONFIGURATION:
      return <Chip label={t('dashboard.satellites.stateWaitingConfig')} color="info" variant="outlined" size="small" />;
    default:
      return <Chip label={t('dashboard.satellites.stateErrored')} color="error" variant="outlined" size="small" />;
  }
}

export function PluginState({ state }: { state: AvailableState }) {
  const { t } = useTranslation();
  switch (state) {
    case AvailableState.PLUGIN_INSTALLED:
      return <Chip label={t('dashboard.satellites.stateInstalled')} color="primary" variant="outlined" size="small" />;
    case AvailableState.PLUGIN_RUNNING:
      return <Chip label={t('dashboard.satellites.stateRunning')} color="success" variant="outlined" size="small" />;
    case AvailableState.PLUGIN_STOPPED:
      return <Chip label={t('dashboard.satellites.stateStopped')} color="warning" variant="outlined" size="small" />;
    case AvailableState.PLUGIN_WAITING_CONFIGURATION:
      return <Chip label={t('dashboard.satellites.stateWaitingConfig')} color="info" variant="outlined" size="small" />;
    case AvailableState.PLUGIN_WAITING_INSTALLATION:
      return <Chip label={t('dashboard.satellites.stateWaitingInstall')} color="secondary" variant="outlined" size="small" />;
    default:
      return <Chip label={t('dashboard.satellites.stateErrored')} color="error" variant="outlined" size="small" />;
  }
}
