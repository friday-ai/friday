import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconMenu from '../Menu/IconMenu';

import useSharedApp from '../../services/app/useApp';

export default function AccountMenu() {
  const navigate = useNavigate();
  const { logout } = useSharedApp();

  const handleNavigation = (_: unknown, page: string | null) => {
    if (page) {
      navigate(page.toLowerCase());
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconMenu
        id="account-menu"
        title="Account menu"
        ariaLabel="account of current user"
        ariaControls="account-menu-appbar"
        icon={<Avatar alt="John peperwood" src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" />}
      >
        <MenuItem onClick={() => handleNavigation(null, 'account')}>
          <Avatar
            alt="John peperwood"
            src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
            sx={{ width: 24, height: 24, marginRight: '.8rem' }}
          />
          My account
        </MenuItem>
        <Divider />
        {/*
      <MenuItem onClick={handleOpenUserMenu}>
        <ListItemIcon>
          <PersonAddIcon fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      */}
        <MenuItem onClick={() => handleNavigation(null, 'settings')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </IconMenu>
    </Box>
  );
}
