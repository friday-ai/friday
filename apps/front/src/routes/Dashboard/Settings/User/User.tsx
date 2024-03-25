import { useEffect, useState } from 'react';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import { AvailableLanguages, UserAttributes, UserCreationAttributes, UserRole } from '@friday-ai/shared';
import { useTranslation } from 'react-i18next';
import LoaderSuspense from '../../../../components/Loader/LoaderSuspense';
import { useGetUsers } from '../../../../services/api/useUser';
import UserCard from './UserCard';
import UserDetails from './UserDetails';

export default function User() {
  const { t } = useTranslation();
  const { isFetching, isFetchedAfterMount, data: users } = useGetUsers();
  const [selectedUser, setSelectedUser] = useState<UserAttributes | UserCreationAttributes>();
  const [newUser, setNewUser] = useState(false);

  const addUser = () => {
    setNewUser(true);
    setSelectedUser({ userName: 'New User', email: 'newuser@friday.com', password: '', language: AvailableLanguages.EN, role: UserRole.HABITANT });
  };

  const handleSelectUser = (id: string) => {
    const [selected] = users!.filter((u) => u.id === id);
    setSelectedUser(selected);
  };

  useEffect(() => {
    if (users && !selectedUser) {
      setSelectedUser(users[0]);
    }

    if (users && !selectedUser && newUser) {
      setSelectedUser(users[users.length - 1]);
      setNewUser(false);
    }

    // Check if is selected user was deleted, in case select the first user of list
    if (users && selectedUser && 'id' in selectedUser && users.filter((h) => h.id === selectedUser.id).length === 0) {
      setSelectedUser(users[0]);
    }
  }, [users]);

  return (
    <LoaderSuspense isFetching={isFetching && !isFetchedAfterMount}>
      <Stack spacing={2} direction={{ xs: 'column', lg: 'row' }} divider={<Divider orientation="vertical" flexItem />} justifyContent="center">
        <Stack spacing={2} maxWidth={{ lg: 550 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight="bold">
              {t('settings.user.title')}
            </Typography>
            <Tooltip title={t('settings.user.add')}>
              <IconButton aria-label="add user" onClick={addUser}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack spacing={2} direction={{ xs: 'row', lg: 'column' }} overflow={'auto'} justifyContent={{ xs: 'unset', md: 'center' }}>
            {users &&
              selectedUser &&
              users.map((user) => (
                <UserCard key={user.id} user={user} selected={'id' in selectedUser && selectedUser.id === user.id} selectUser={handleSelectUser} />
              ))}
          </Stack>

          {newUser && selectedUser && <UserCard key="newHouse" user={selectedUser} selected selectUser={handleSelectUser} />}
        </Stack>

        {selectedUser && <UserDetails user={selectedUser} selectUser={handleSelectUser} />}
      </Stack>
    </LoaderSuspense>
  );
}
