import { useNavigate } from "react-router-dom";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { AvailableState, PluginAttributes, SatelliteAttributes } from "@friday-ai/shared";
import { enqueueSnackbar } from "notistack";

import { useTranslation } from "react-i18next";
import Pie from "../../../components/Charts/Pie";
import useSatellite from "../../../services/api/useSatellite";
import { SatelliteState } from "./States";

import { formatDistance, getPluginsStates } from "../../../utils/data";

export default function SatelliteCard({ satellite, plugins }: { satellite: SatelliteAttributes; plugins: PluginAttributes[] }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { stopAllPlugins, restartAllPlugins } = useSatellite();

  const handleStopAllPlugins = async (id: string) => {
    enqueueSnackbar("Stopping plugin...", { variant: "info" });

    stopAllPlugins
      .mutateAsync(id)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Plugins stopped", { variant: "success" });
        } else {
          enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: "error" });
      });
  };

  const handleRestartAllPlugins = async (id: string) => {
    enqueueSnackbar("Restarting plugins...", { variant: "info" });

    restartAllPlugins
      .mutateAsync(id)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Plugins Restating", { variant: "success" });
        } else {
          enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: "error" });
      });
  };

  return (
    <Paper sx={{ padding: "2rem" }}>
      <Stack spacing={3}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold">
            {satellite.name}
          </Typography>
          <SatelliteState state={satellite.state.value as AvailableState} />
        </Stack>

        <Stack spacing={2} direction={{ xs: "column", md: "row", lg: "column" }} justifyContent="space-between">
          <Stack spacing={6} direction="row" alignItems="start">
            <Stack spacing={1}>
              <Typography color="GrayText">{t("dashboard.satellites.ipAddress")}:</Typography>
              <Typography color="GrayText">{t("dashboard.satellites.location")}:</Typography>
              <Typography color="GrayText">{t("dashboard.satellites.uptime")}:</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight="500">192.168.3.3</Typography>
              <Typography fontWeight="500">{satellite.room.name}</Typography>
              <Typography fontWeight="500">{formatDistance(satellite.lastHeartbeat)}</Typography>
            </Stack>
          </Stack>

          <Divider flexItem sx={{ display: { xs: "flex", md: "none", lg: "flex" } }} />
          <Divider flexItem orientation="vertical" sx={{ display: { xs: "none", md: "flex", lg: "none" } }} />

          <Stack direction="column">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography fontWeight="bold">{t("dashboard.satellites.pluginsStates")}</Typography>
              <Stack direction="row">
                <Tooltip title={t("dashboard.satellites.installPlugin")}>
                  <IconButton aria-label="install new plugin" onClick={() => navigate("plugins/install")}>
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("dashboard.satellites.stopAllPlugins")}>
                  <span>
                    <IconButton
                      aria-label="stop all plugins"
                      onClick={() => handleStopAllPlugins(satellite.id)}
                      disabled={satellite.plugins.length < 1}
                    >
                      <StopCircleOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={t("dashboard.satellites.restartAllPlugins")}>
                  <span>
                    <IconButton
                      aria-label="restart all plugins"
                      onClick={() => handleRestartAllPlugins(satellite.id)}
                      disabled={satellite.plugins.length < 1}
                    >
                      <RestartAltOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Stack>

            <Box display="flex" alignItems="center" justifyContent="center">
              <Box sx={{ width: 350, height: 350 }}>
                <Pie data={getPluginsStates(plugins, theme)} totalCount={plugins.length} totalLabel="Plugins" />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
