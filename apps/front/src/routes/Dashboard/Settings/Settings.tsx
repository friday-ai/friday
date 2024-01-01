import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import AnimationLayout from '../../../components/App/AnimationLayout';
import useSelectedRoute from '../../../utils/useSelectedRoute';

export default function Settings() {
  const { t } = useTranslation();
  const selected = useSelectedRoute(['*/system', '*/house', '*/users', '*/sessions']);

  return (
    <Box padding={2}>
      <Stack spacing={2} direction={{ xs: 'column', lg: 'row' }}>
        <Stack spacing={2} maxWidth={250}>
          <Typography variant="h6" fontWeight="bold">
            Settings
          </Typography>
          <Paper sx={{ width: 250, maxWidth: '100%' }}>
            <MenuList>
              <MenuItem selected={selected === 0} component={Link} to="/dashboard/settings/system">
                <ListItemIcon>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText>{t('settings.system.title')}</ListItemText>
              </MenuItem>

              <MenuItem selected={selected === 1} component={Link} to="/dashboard/settings/houses">
                <ListItemIcon>
                  <MapsHomeWorkIcon />
                </ListItemIcon>
                <ListItemText>{t('settings.house.title')}</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem selected={selected === 2} component={Link} to="/dashboard/settings/users">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>{t('settings.user.title')}</ListItemText>
              </MenuItem>
              <MenuItem selected={selected === 3} component={Link} to="/dashboard/settings/sessions">
                <ListItemIcon>
                  <SmartphoneIcon />
                </ListItemIcon>
                <ListItemText>{t('settings.sessions.title')}</ListItemText>
              </MenuItem>
            </MenuList>
          </Paper>
        </Stack>
        <Box flex={1}>
          <AnimationLayout>
            <Outlet />
          </AnimationLayout>
        </Box>
      </Stack>
    </Box>
  );
}
