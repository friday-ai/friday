import { useCallback } from 'react';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import NiceModal from '@ebay/nice-modal-react';
import { enqueueSnackbar } from 'notistack';

import { AvailableState, PluginAttributes } from '@friday-ai/shared';
import { useTranslation } from 'react-i18next';
import Menu from '../../../../components/Menu/Menu';
import ConfirmDialog from '../../../../components/Modal/Confirm';
import NoData from '../../../Errors/NoData';
import { PluginState } from '../States';

import usePlugin from '../../../../services/api/usePlugin';
import { formatDistance } from '../../../../utils/data';

export default function PluginList({ plugins, onRemovePlugin }: { plugins: PluginAttributes[]; onRemovePlugin: (id: string) => void }) {
  const { t } = useTranslation();
  const { stopPlugin, restartPlugin, uninstallPlugin } = usePlugin();

  const handlePluginAction = useCallback(() => {
    enqueueSnackbar('This feature is not implemented yet :(', { variant: 'warning' });
  }, []);

  const handleDeletePlugin = (name: string, id: string) => {
    NiceModal.show(ConfirmDialog, {
      title: t('dashboard.satellites.areYouSure'),
      content: `${t('dashboard.satellites.deletePluginMessage')} <b>${name}</b>.`,
      onClose: async (confirm: boolean) => {
        if (confirm) {
          uninstallPlugin
            .mutateAsync(id)
            .then((res) => {
              if (res.success) {
                onRemovePlugin(id);
              } else {
                enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: 'error' });
              }
            })
            .catch(() => {
              enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: 'error' });
            });
        }
      },
    });
  };

  const handleStopPlugin = async (id: string) => {
    enqueueSnackbar('Stopping plugin...', { variant: 'info' });

    stopPlugin
      .mutateAsync(id)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar('Plugin stopped', { variant: 'success' });
        } else {
          enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: 'error' });
        }
      })
      .catch(() => {
        enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: 'error' });
      });
  };

  const handleRestartPlugin = async (id: string) => {
    enqueueSnackbar('Restarting plugin...', { variant: 'info' });

    restartPlugin
      .mutateAsync(id)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar('Plugin Restating', { variant: 'success' });
        } else {
          enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: 'error' });
        }
      })
      .catch(() => {
        enqueueSnackbar("An error has occurred, please check satellite's logs", { variant: 'error' });
      });
  };

  return (
    <>
      {plugins.length < 1 && <NoData title={t('dashboard.satellites.noDataFound')} subtitle={t('dashboard.satellites.resetFilters')} />}
      {plugins.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="plugin list">
            <TableHead>
              <TableRow>
                <TableCell>{t('dashboard.satellites.name')}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{t('dashboard.satellites.state')}</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{t('dashboard.satellites.lastHeartbeat')}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {plugins.map((plugin) => (
                <TableRow key={plugin.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar variant="rounded" src={`https://img.logoipsum.com/${[299, 298, 296, 246][Math.floor(Math.random() * 4)]}.svg`} />
                      <Stack>
                        <Typography fontWeight="500">{plugin.name}</Typography>
                        <Typography fontWeight="300">{plugin.version}</Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <PluginState state={plugin.state.value as AvailableState} />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{formatDistance(plugin.lastHeartbeat)}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
                      <Tooltip title={t('dashboard.satellites.stopPlugin')}>
                        <IconButton aria-label="stop plugin" onClick={() => handleStopPlugin(plugin.id)}>
                          <StopCircleOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('dashboard.satellites.restartPlugin')}>
                        <IconButton aria-label="restart plugin" onClick={() => handleRestartPlugin(plugin.id)}>
                          <RestartAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('dashboard.satellites.configPlugin')}>
                        <IconButton aria-label="plugin settings" onClick={() => handlePluginAction()}>
                          <SettingsOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('dashboard.satellites.uninstallPlugin')}>
                        <IconButton aria-label="uninstall plugin" onClick={() => handleDeletePlugin(plugin.name, plugin.id)}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>

                    <Menu
                      id="test"
                      title="test"
                      ariaLabel="test"
                      ariaControls="test"
                      buttonType="icon"
                      icon={<MoreVertOutlinedIcon />}
                      sx={{ display: { md: 'none' } }}
                    >
                      <MenuItem onClick={() => handlePluginAction()}>
                        <ListItemIcon>
                          <StopCircleOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        Stop plugin
                      </MenuItem>
                      <MenuItem onClick={() => handlePluginAction()}>
                        <ListItemIcon>
                          <RestartAltOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        Restart plugin
                      </MenuItem>
                      <MenuItem onClick={() => handlePluginAction()}>
                        <ListItemIcon>
                          <SettingsOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        Plugin settings
                      </MenuItem>
                      <MenuItem onClick={() => handlePluginAction()}>
                        <ListItemIcon>
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        Uninstall plugin
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
