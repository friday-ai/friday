import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MuiMenu from '@mui/material/Menu';
import { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import React, { useState } from 'react';

interface MenuProps {
  id: string;
  title: string;
  ariaLabel: string;
  ariaControls: string;
  label?: string;
  buttonType?: 'button' | 'icon';
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
  sx?: SxProps<Theme> | undefined;
  icon: React.ReactNode;
  children: React.ReactNode[] | React.ReactNode;
}

export default function Menu({ id, title, ariaLabel, ariaControls, label, buttonType, color, sx, icon, children }: MenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={title}>
        <>
          {buttonType === 'button' && (
            <Button
              onClick={handleOpen}
              aria-controls={ariaControls}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : 'false'}
              aria-label={ariaLabel}
              color={color}
              sx={sx}
              startIcon={icon}
            >
              {label}
            </Button>
          )}
          {buttonType === 'icon' && (
            <IconButton
              onClick={handleOpen}
              aria-controls={ariaControls}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : 'false'}
              aria-label={ariaLabel}
              color={color}
              sx={sx}
            >
              {icon}
            </IconButton>
          )}
        </>
      </Tooltip>
      <MuiMenu id={id} anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
        {children}
      </MuiMenu>
    </>
  );
}

Menu.defaultProps = {
  label: '',
  buttonType: 'button',
  color: 'primary',
  sx: {},
};
