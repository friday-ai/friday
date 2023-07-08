import React, { useCallback } from 'react';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
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

import { enqueueSnackbar } from 'notistack';

import { AvailableState, PluginAttributes } from '@friday-ai/shared';
import NoData from '../../Errors/NoData';
import { PluginState } from './States';

export default function PluginList({ plugins }: { plugins: PluginAttributes[] }) {
  const handlePluginAction = useCallback(() => {
    enqueueSnackbar('This feature is not implemented yet :(', { variant: 'warning' });
  }, []);

  return (
    <>
      {plugins.length < 1 && <NoData title="No data found" subtitle="Try installing a plugin or change yours filters" />}
      {plugins.length > 1 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Last heartbeat</TableCell>
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
                  <TableCell>
                    <PluginState state={plugin.state.value as AvailableState} />
                  </TableCell>
                  <TableCell>{new Date(plugin.lastHeartbeat).toLocaleString()}</TableCell>
                  <TableCell>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center">
                      <Tooltip title="Stop plugin">
                        <IconButton aria-label="stop plugin" onClick={() => handlePluginAction()}>
                          <StopCircleOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Restart plugin">
                        <IconButton aria-label="restart plugin" onClick={() => handlePluginAction()}>
                          <RestartAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Plugin configuration">
                        <IconButton aria-label="plugin settings" onClick={() => handlePluginAction()}>
                          <SettingsOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Uninstall plugin">
                        <IconButton aria-label="uninstall plugin" onClick={() => handlePluginAction()}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
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
