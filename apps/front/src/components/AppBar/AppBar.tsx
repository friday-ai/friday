import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import MenuIcon from '@mui/icons-material/Menu';
import SatelliteAltRoundedIcon from '@mui/icons-material/SatelliteAltRounded';

import Bar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ReactComponent as ReactLogo } from '../../assets/svg/favicon.svg';

import useSelectedRoute from '../../utils/useSelectedRoute';
import Menu from '../Menu/Menu';
import AccountMenu from './AccountMenu';

export default function AppBar() {
  const theme = useTheme();
  const { t } = useTranslation();

  const selected = useSelectedRoute(['dashboard', '*/satellites']);

  return (
    <Bar position="static">
      <Toolbar sx={{ marginX: 2 }}>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 3 }}>
          <Menu id="pages-menu" title="Pages menu" ariaLabel="pages menu" ariaControls="pages-menu-appbar" buttonType="icon" icon={<MenuIcon />}>
            <MenuItem selected={selected === 0} component={Link} to="/dashboard">
              <Typography textAlign="center">{t('dashboard.appBar.dashboard')}</Typography>
            </MenuItem>
            <MenuItem selected={selected === 1} component={Link} to="/dashboard/satellites">
              <Typography textAlign="center">{t('dashboard.appBar.satellites')}</Typography>
            </MenuItem>
          </Menu>
        </Box>

        <MuiLink component={Link} to="/dashboard" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mr: 3 }}>
          <ReactLogo width="1.8em" display="block" fill={theme.palette.primary.main} />
        </MuiLink>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
          <Tabs value={selected} aria-label="main tabs navigation" sx={{ minHeight: 64, '&.MuiTabs-root > div': { display: 'flex' } }}>
            <Tab
              id="dashboard"
              component={Link}
              to="/dashboard"
              aria-controls="dashboard"
              label={t('dashboard.appBar.dashboard')}
              icon={<DashboardRoundedIcon />}
              iconPosition="start"
            />

            <Tab
              id="satellites"
              component={Link}
              to="/dashboard/satellites"
              aria-controls="satellites"
              label={t('dashboard.appBar.satellites')}
              icon={<SatelliteAltRoundedIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <MuiLink component={Link} to="/dashboard" sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, flexGrow: 1 }}>
          <ReactLogo width="1.8em" display="block" fill={theme.palette.primary.main} />
        </MuiLink>

        <AccountMenu />
      </Toolbar>
    </Bar>
  );
}
