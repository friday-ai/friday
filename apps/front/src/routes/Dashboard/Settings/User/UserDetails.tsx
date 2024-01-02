import React, { useEffect, useState } from 'react';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { debounce } from '@mui/material/utils';

import { AvailableLanguages, UserAttributes, UserCreationAttributes, UserRole } from '@friday-ai/shared';
import { enqueueSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import useUser from '../../../../services/api/useUser';

const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

interface UserDetailsProps {
  user: UserAttributes | UserCreationAttributes;
  selectUser: (id: string) => void;
}

/** Error codes:
/* 0 = no error
/* 1 = username empty
/* 2 = email empty
/* 3 = email invalid
/* 4 = password empty
/* 5 = password too short
/* 6 = passwords do not match
*/
export default function UserDetails({ user, selectUser }: UserDetailsProps) {
  const { t, i18n } = useTranslation();
  const { createUser, updateUser } = useUser();

  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [role, setRole] = useState(user.role);
  const [language, setLanguage] = useState(user.language);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(0);

  const userMustBeSaved =
    userName !== user.userName ||
    (email !== user.email && email !== '') ||
    (password !== '' && passwordConfirm !== '') ||
    role !== user.role ||
    language !== user.language;

  const checkUsername = debounce((change: string) => {
    // The username cannot be empty.
    if (change === '' || change.replace(/ /g, '') === '') {
      setError(1);
      return;
    }

    setError(0);
  }, 500);

  const checkEmail = debounce((change: string) => {
    // The email cannot be empty.
    if (change === '' || change.replace(/ /g, '') === '') {
      setError(2);
      return;
    }

    // The email must be valid.
    if (!regex.test(change)) {
      setError(3);
      return;
    }

    setError(0);
  }, 500);

  const checkPassword = debounce((change: string) => {
    // The password cannot be empty.
    if (change === '' || change.replace(/ /g, '') === '') {
      setError(4);
      return;
    }

    // The password needs to be at least 10 characters long.
    if (change.length < 9) {
      setError(5);
      return;
    }

    setError(0);
  }, 500);

  const checkPasswordMatch = debounce((pass: string, confirm: string) => {
    // The passwords do not match.
    if (pass !== confirm) {
      setError(6);
      return;
    }

    setError(0);
  }, 500);

  const handleLanguage = (value: string) => {
    setLanguage(value as AvailableLanguages);
    localStorage.setItem('i18nextLng', value || 'en');
    i18n.changeLanguage(value || 'en');
  };

  const handleSave = async () => {
    let userId = 'id' in user ? user.id : '';

    if ('id' in user) {
      if (password !== '') {
        await updateUser.mutateAsync({
          id: userId,
          user: { userName, email, password, role, language },
        });
      } else {
        await updateUser.mutateAsync({
          id: userId,
          user: { userName, email, role, language },
        });
      }
    } else {
      const res = await createUser.mutateAsync({ userName, email, password, language, role });

      userId = res.id;
    }

    // Ensure user still selected
    selectUser(userId);
    enqueueSnackbar(t('settings.user.saved'), { variant: 'success' });
  };

  /** This is necessary because it is the parent component which
   * holds the initial data and which decides which user to modify,
   * so this component is unfortunately rendered twice at startup
   */
  useEffect(() => {
    setUserName(user.userName);
    setEmail(user.email);
    setRole(user.role);
    setLanguage(user.language);

    // If id isn't present in user object, this mean
    // is a new user, so set imidetaly an error
    if (!('id' in user)) {
      setError(4);
    }
  }, [user]);

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight="bold">
          {t('settings.user.edit')}
        </Typography>
        <Button variant={'outlined'} startIcon={<SaveOutlinedIcon />} onClick={handleSave} disabled={!userMustBeSaved || error !== 0}>
          {t('settings.user.save')}
        </Button>
      </Stack>
      <Paper sx={{ padding: '2rem' }}>
        <Stack spacing={3}>
          <Box display={'flex'} justifyContent={'center'}>
            <Avatar sx={{ width: 112, height: 112 }}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: 48 }} />
            </Avatar>
          </Box>
          <TextField
            error={error === 1}
            id="username"
            label={t('settings.user.username')}
            type="text"
            value={userName}
            helperText={error === 1 ? t('settings.user.usernameEmpty') : ''}
            onChange={(event) => {
              setUserName(event.target.value);
              checkUsername(event.target.value);
            }}
          />

          <TextField
            error={error === 2 || error === 3}
            id="email"
            label={t('settings.user.email')}
            type="email"
            value={email}
            helperText={(error === 2 && t('settings.user.emailEmpty')) || (error === 3 && t('settings.user.emailNotValid')) || ''}
            onChange={(event) => {
              setEmail(event.target.value);
              checkEmail(event.target.value);
            }}
          />

          <Stack direction="row" spacing={1}>
            <TextField
              error={error === 4 || error === 5}
              label={t('settings.user.password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              helperText={(error === 4 && t('settings.user.passwordEmpty')) || (error === 5 && t('settings.user.passwordTooShort')) || ''}
              onChange={(event) => {
                setPassword(event.target.value);
                checkPassword(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              error={error === 6}
              label={t('settings.user.confirmPassword')}
              id="passwordConfirm"
              type={showPassword ? 'text' : 'password'}
              value={passwordConfirm}
              helperText={error === 6 ? t('settings.user.passwordNotMatch') : ''}
              onChange={(event) => {
                setPasswordConfirm(event.target.value);
                checkPasswordMatch(password, event.target.value);
              }}
            />
          </Stack>

          <FormControl fullWidth>
            <InputLabel id="role">{t('settings.user.role')}</InputLabel>
            <Select
              labelId="role"
              id="role-select"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value as UserRole)}
              disabled={user.role === UserRole.SUPERADMIN}
            >
              <MenuItem value="superadmin">{t('settings.user.superadmin')}</MenuItem>
              <MenuItem value="admin">{t('settings.user.admin')}</MenuItem>
              <MenuItem value="habitant">{t('settings.user.habitant')}</MenuItem>
              <MenuItem value="guest">{t('settings.user.guest')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="language">{t('settings.user.language')}</InputLabel>
            <Select labelId="language" id="language-select" value={language} onChange={(e) => handleLanguage(e.target.value)} label="Language">
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="pt">Portuguese</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>
    </Stack>
  );
}
