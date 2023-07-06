import React from 'react';

import Chip from '@mui/material/Chip';

import { AvailableState } from '@friday-ai/shared';

export function SatelliteState({ state }: { state: AvailableState }) {
  switch (state) {
    case AvailableState.SATELLITE_CONNECTED:
      return <Chip label="Connected" color="success" variant="outlined" size="small" />;
    case AvailableState.SATELLITE_DISCONNECTED:
      return <Chip label="Disconnected" color="warning" variant="outlined" size="small" />;
    case AvailableState.SATELLITE_WAITING_CONFIGURATION:
      return <Chip label="Waiting config" color="info" variant="outlined" size="small" />;
    default:
      return <Chip label="Errored" color="error" variant="outlined" size="small" />;
  }
}

export function PluginState({ state }: { state: AvailableState }) {
  switch (state) {
    case AvailableState.PLUGIN_RUNNING:
      return <Chip label="Running" color="success" variant="outlined" size="small" />;
    case AvailableState.PLUGIN_STOPPED:
      return <Chip label="Stopped" color="warning" variant="outlined" size="small" />;
    case AvailableState.PLUGIN_WAITING_CONFIGURATION:
      return <Chip label="Waiting config" color="info" variant="outlined" size="small" />;
    default:
      return <Chip label="Errored" color="error" variant="outlined" size="small" />;
  }
}
