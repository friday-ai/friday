import { AvailableState, type PluginAttributes } from "@friday-ai/shared";
import type { Theme } from "@mui/material";
import { formatDistance as format } from "date-fns";
import * as dateLocals from "date-fns/locale";

// Maybe an api on backend for this ?
const getPluginsStates = (plugins: PluginAttributes[], theme: Theme) => {
  // Map colors to states
  const colors: { [key: string]: string } = {
    [AvailableState.PLUGIN_INSTALLED]: theme.palette.primary[theme.palette.mode],
    [AvailableState.PLUGIN_RUNNING]: theme.palette.success[theme.palette.mode],
    [AvailableState.PLUGIN_WAITING_CONFIGURATION]: theme.palette.info[theme.palette.mode],
    [AvailableState.PLUGIN_ERRORED]: theme.palette.error[theme.palette.mode],
    [AvailableState.PLUGIN_STOPPED]: theme.palette.warning[theme.palette.mode],
    [AvailableState.PLUGIN_WAITING_INSTALLATION]: theme.palette.secondary[theme.palette.mode],
  };

  // Map labels translation to states
  const labels: { [key: string]: string } = {
    [AvailableState.PLUGIN_INSTALLED]: "dashboard.satellites.stateInstalled",
    [AvailableState.PLUGIN_RUNNING]: "dashboard.satellites.stateRunning",
    [AvailableState.PLUGIN_WAITING_CONFIGURATION]: "dashboard.satellites.stateWaitingConfig",
    [AvailableState.PLUGIN_ERRORED]: "dashboard.satellites.stateErrored",
    [AvailableState.PLUGIN_STOPPED]: "dashboard.satellites.stateStopped",
    [AvailableState.PLUGIN_WAITING_INSTALLATION]: "dashboard.satellites.stateWaitingInstall",
  };

  // Fisrt filter states of plugins
  const states = plugins.map((plugin) => {
    return { label: plugin.name, value: plugin.state.value as string };
  });

  // Then count the number of each state
  const statesCount: { [key: string]: number } = {};

  for (const state of states) {
    const { value } = state;
    if (statesCount[value]) {
      statesCount[value] += 1;
    } else {
      statesCount[value] = 1;
    }
  }

  // Finally, build data object
  const data: { key: string; label: string; value: number; color: string }[] = [];

  for (const key of Object.keys(statesCount)) {
    data.push({ key, label: labels[key], color: colors[key], value: statesCount[key] });
  }

  return data;
};

const formatDistance = (date: Date) => {
  const language = localStorage.getItem("i18nextLng") || "en";
  let local = dateLocals.enUS;

  switch (language) {
    case "fr":
      local = dateLocals.fr;
      break;
    default:
      break;
  }

  return format(new Date(date), new Date(), { addSuffix: true, locale: local });
};

export { formatDistance, getPluginsStates };
