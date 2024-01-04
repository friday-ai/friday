import React from 'react';
import uaParser from 'useragent-parser-js';

import DeleteIcon from '@mui/icons-material/Delete';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import TabletAndroidOutlinedIcon from '@mui/icons-material/TabletAndroidOutlined';

import { SessionAttributes } from '@friday-ai/shared';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSession } from '../../../../services/api/useSession';
import { formatDistance } from '../../../../utils/data';

export default function SessionItem({ session }: { session: SessionAttributes }) {
  const { t } = useTranslation();
  const { revokeSession } = useSession();

  let icon = <ReportProblemOutlinedIcon />;
  let label: string = '';

  if (session.userAgent === '') {
    label = 'Error';
  } else {
    const userAgent = uaParser.parse(session.userAgent);
    label = `${userAgent.browser} - ${userAgent.platform} - ${userAgent.os}`;

    if (userAgent.isTablet) {
      icon = <TabletAndroidOutlinedIcon />;
    } else if (userAgent.isMobile) {
      icon = <PhoneAndroidOutlinedIcon />;
    } else if (userAgent.isDesktop) {
      icon = <DesktopWindowsOutlinedIcon />;
    } else {
      icon = <ReportProblemOutlinedIcon />;
    }
  }

  const hanldeRevokeSession = async () => {
    await revokeSession.mutateAsync(session.id);
  };

  return (
    <ListItem
      sx={{ width: { xs: 300, sm: 500, md: 700 } }}
      secondaryAction={
        <Tooltip title={t('settings.sessions.revoke')}>
          <IconButton edge="end" aria-label={t('settings.sessions.revoke')} onClick={hanldeRevokeSession}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ noWrap: true }}
        primary={label}
        secondaryTypographyProps={{ noWrap: true }}
        secondary={`${t('settings.sessions.connected')} ${formatDistance(session.createdAt)}`}
      />
    </ListItem>
  );
}
