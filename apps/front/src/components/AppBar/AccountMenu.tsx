import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Menu from '../Menu/Menu';

import useSharedApp from '../../services/app/useApp';

export default function AccountMenu() {
  const { logout } = useSharedApp();
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Menu
        id="account-menu"
        title={t('dashboard.appBar.userMenu.title')}
        ariaLabel="account of current user"
        ariaControls="account-menu-appbar"
        buttonType="icon"
        icon={<Avatar alt="John peperwood" src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" />}
      >
        <MenuItem component={Link} to="/dashboard/settings/users">
          <Avatar
            alt="John peperwood"
            src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
            sx={{ width: 24, height: 24, marginRight: '.8rem' }}
          />
          {t('dashboard.appBar.userMenu.profile')}
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
        <MenuItem component={Link} to="/dashboard/settings/system">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          {t('dashboard.appBar.userMenu.settings')}
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          {t('dashboard.appBar.userMenu.logout')}
        </MenuItem>
      </Menu>
    </Box>
  );
}
