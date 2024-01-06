import React from 'react';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Avatar, Card, CardHeader, IconButton, Stack, Tooltip } from '@mui/material';

import NiceModal from '@ebay/nice-modal-react';
import { UserAttributes, UserCreationAttributes, UserRole } from '@friday-ai/shared';
import { useTranslation } from 'react-i18next';
import Confirm from '../../../../components/Modal/Confirm';
import useUser from '../../../../services/api/useUser';

interface UserCardProps {
  user: UserAttributes | UserCreationAttributes;
  selected: boolean;
  selectUser: (id: string) => void;
}

export default function UserCard({ user, selected, selectUser }: UserCardProps) {
  const { t } = useTranslation();
  const { deleteUser } = useUser();

  const handleDeleteUser = async () => {
    if ('id' in user) {
      NiceModal.show(Confirm, {
        title: t('settings.user.areYouSure'),
        content: `${t('settings.user.deleteMessage')} <b>${user.userName}</b>.`,
        onClose: async (confirm) => {
          if (confirm) {
            await deleteUser.mutateAsync(user.id);
          }
        },
      });
    }
  };

  return (
    <Card variant={selected ? 'selected' : 'outlined'} sx={{ minWidth: { xs: 250, md: 320, lg: 400 } }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <PersonOutlineOutlinedIcon />
          </Avatar>
        }
        title={user.userName}
        subheader={`${user.role}`}
        titleTypographyProps={{ noWrap: true, width: { xs: 60, sm: 90, md: 120, lg: 200 } }}
        subheaderTypographyProps={{ noWrap: true, width: { xs: 60, sm: 90, md: 120, lg: 200 } }}
        action={
          <Stack direction="row">
            <Tooltip title={t('settings.user.select')}>
              <IconButton aria-label="select user" onClick={() => selectUser('id' in user ? user.id : 'newUser')}>
                <EditNoteOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('settings.user.delete')}>
              <span>
                <IconButton aria-label="delete user" onClick={handleDeleteUser} disabled={user.role === UserRole.SUPERADMIN}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        }
      />
    </Card>
  );
}
