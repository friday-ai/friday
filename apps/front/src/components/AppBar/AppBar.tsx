import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import MenuIcon from '@mui/icons-material/Menu';
import SatelliteAltRoundedIcon from '@mui/icons-material/SatelliteAltRounded';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ReactLogo } from '../../assets/svg/favicon.svg';

import IconMenu from '../Menu/IconMenu';
import AccountMenu from './AccountMenu';

import useCurrentPath from '../../utils/useCurrentPath';

const pages = ['devices', 'satellites'];

export default function App() {
  const theme = useTheme();
  const navigate = useNavigate();
  const initialPath = useCurrentPath();
  const { t } = useTranslation();

  const [currentPath, setCurrentPath] = useState(initialPath);

  const handleNavigation = (_: unknown, page: string | null) => {
    if (page) {
      setCurrentPath(page.toLowerCase());
      navigate(page.toLowerCase());
    }
  };

  const handleTabNavigation = (_: unknown, tab: number) => {
    const page = pages[tab];
    setCurrentPath(page.toLowerCase());
    navigate(page.toLowerCase());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 3 }}>
          <IconMenu id="pages-menu" title="Pages menu" ariaLabel="pages menu" ariaControls="pages-menu-appbar" icon={<MenuIcon />}>
            <MenuItem onClick={() => handleNavigation(null, 'devices')}>
              <Typography textAlign="center">{t('dashboard.appBar.dashboard')}</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleNavigation(null, 'satellites')}>
              <Typography textAlign="center">{t('dashboard.appBar.satellites')}</Typography>
            </MenuItem>
          </IconMenu>
        </Box>

        <Link href="/dashboard/devices" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mr: 3 }}>
          <ReactLogo width="1.8em" display="block" fill={theme.palette.primary.main} />
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
          <Tabs
            value={pages.indexOf(currentPath)}
            onChange={handleTabNavigation}
            aria-label="main tabs navigation"
            sx={{ minHeight: 64, '&.MuiTabs-root > div': { display: 'flex' } }}
          >
            <Tab id="devices" aria-controls="devices" label={t('dashboard.appBar.dashboard')} icon={<DashboardRoundedIcon />} iconPosition="start" />
            <Tab
              id="satellites"
              aria-controls="satellites"
              label={t('dashboard.appBar.satellites')}
              icon={<SatelliteAltRoundedIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <Link href="/dashboard/devices" sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, flexGrow: 1 }}>
          <ReactLogo width="1.8em" display="block" fill={theme.palette.primary.main} />
        </Link>

        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
