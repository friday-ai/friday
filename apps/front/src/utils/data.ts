import { AvailableState, PluginAttributes, StateOwner } from '@friday-ai/shared';
import { Theme } from '@mui/material';

// Maybe an api on backend for this ?
const getPluginsStates = (plugins: PluginAttributes[], theme: Theme) => {
  // Map colors to states
  const colors: { [key: string]: string } = {
    [AvailableState.PLUGIN_RUNNING]: theme.palette.success[theme.palette.mode],
    [AvailableState.PLUGIN_WAITING_CONFIGURATION]: theme.palette.info[theme.palette.mode],
    [AvailableState.PLUGIN_ERRORED]: theme.palette.error[theme.palette.mode],
    [AvailableState.PLUGIN_STOPPED]: theme.palette.warning[theme.palette.mode],
  };

  // Map labels translation to states
  const labels: { [key: string]: string } = {
    [AvailableState.PLUGIN_RUNNING]: 'Running',
    [AvailableState.PLUGIN_WAITING_CONFIGURATION]: 'Waiting config',
    [AvailableState.PLUGIN_ERRORED]: 'Errored',
    [AvailableState.PLUGIN_STOPPED]: 'Stopped',
  };

  // Fisrt filter states of plugins
  const states = plugins.map((plugin) => {
    return { label: plugin.name, value: plugin.state.value as string };
  });

  // Then count the number of each state
  const statesCount: { [key: string]: number } = {};

  states.forEach((state) => {
    const { value } = state;
    if (statesCount[value]) {
      statesCount[value] += 1;
    } else {
      statesCount[value] = 1;
    }
  });

  // Finally, build data object
  const data: { key: string; label: string; value: number; color: string }[] = [];

  Object.keys(statesCount).forEach((key) => {
    data.push({ key, label: labels[key], color: colors[key], value: statesCount[key] });
  });

  return data;
};

export { getPluginsStates };
