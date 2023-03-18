import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import ExtensionIcon from '@mui/icons-material/ExtensionOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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

        <Link href="/dashboard/devices" sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}>
          <ReactLogo width="1.5em" display="block" fill={theme.palette.primary.main} />
        </Link>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'flex' }, marginY: 2 }} />

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
          <ToggleButtonGroup exclusive value={currentPath} onChange={handleNavigation} aria-label="pages">
            <ToggleButton value="devices" aria-label="devices">
              <DashboardIcon fontSize="small" />
              <Typography ml={0.5} textAlign="center">
                {t('dashboard.appBar.dashboard')}
              </Typography>
            </ToggleButton>

            <ToggleButton value="satellites" aria-label="satellites">
              <ExtensionIcon fontSize="small" />
              <Typography ml={0.5} textAlign="center">
                {t('dashboard.appBar.satellites')}
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Link href="/dashboard/devices" sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, flexGrow: 1 }}>
          <ReactLogo width="1.8em" display="block" fill={theme.palette.primary.main} />
        </Link>

        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
