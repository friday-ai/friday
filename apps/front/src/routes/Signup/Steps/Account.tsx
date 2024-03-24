import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MobileStepper from '@mui/material/MobileStepper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { debounce } from '@mui/material/utils';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SignupProps } from '../Signup';

import useApp from '../../../services/app/useApp';

const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

/** Error codes:
/* 0 = no error
/* 1 = username empty
/* 2 = email empty
/* 3 = email invalid
/* 4 = password empty
/* 5 = password too short
/* 6 = passwords do not match
*/

export default function Account({ activeStep, setActiveStep }: SignupProps) {
  const theme = useTheme();
  const app = useApp();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(0);
  const [stepCompleted, setStepCompleted] = useState(false);

  const checkUsername = useMemo(
    () =>
      debounce((change: string) => {
        // The username cannot be empty.
        if (change === '' || change.replace(/ /g, '') === '') {
          setError(1);
          setStepCompleted(false);
          return;
        }

        setError(0);
      }, 500),
    [],
  );

  const checkEmail = useMemo(
    () =>
      debounce((change: string) => {
        // The email cannot be empty.
        if (change === '' || change.replace(/ /g, '') === '') {
          setError(2);
          setStepCompleted(false);
          return;
        }

        // The email must be valid.
        if (!regex.test(change)) {
          setError(3);
          setStepCompleted(false);
          return;
        }

        setError(0);
      }, 500),
    [],
  );

  const checkPassword = useMemo(
    () =>
      debounce((change: string) => {
        // The password cannot be empty.
        if (change === '' || change.replace(/ /g, '') === '') {
          setError(4);
          setStepCompleted(false);
          return;
        }

        // The password needs to be at least 10 characters long.
        if (change.length < 9) {
          setError(5);
          setStepCompleted(false);
          return;
        }

        setError(0);
      }, 500),
    [],
  );

  const checkPasswordMatch = useMemo(
    () =>
      debounce((pass: string, confirm: string) => {
        // The passwords do not match.
        if (pass !== confirm) {
          setError(6);
          setStepCompleted(false);
          return;
        }

        setError(0);
        setStepCompleted(true);
      }, 500),
    [],
  );

  const sendUser = async () => {
    const res = await app.signUp(username, email, password);

    if (res) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main}>
          {t('signup.account.title')}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color={theme.palette.text.disabled}>
          {t('signup.account.description')}
        </Typography>
      </Box>

      <TextField
        error={error === 1}
        id="username"
        label={t('signup.account.username')}
        type="text"
        value={username}
        helperText={error === 1 ? t('signup.account.usernameEmpty') : ''}
        onChange={(event) => {
          setUsername(event.target.value);
          checkUsername(event.target.value);
        }}
      />

      <TextField
        error={error === 2 || error === 3}
        id="email"
        label={t('signup.account.email')}
        type="email"
        value={email}
        helperText={(error === 2 && t('signup.account.emailEmpty')) || (error === 3 && t('signup.account.emailNotValid')) || ''}
        onChange={(event) => {
          setEmail(event.target.value);
          checkEmail(event.target.value);
        }}
      />

      <Stack direction="row" spacing={1}>
        <TextField
          error={error === 4 || error === 5}
          label={t('signup.account.password')}
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          helperText={(error === 4 && t('signup.account.passwordEmpty')) || (error === 5 && t('signup.account.passwordTooShort')) || ''}
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
          label={t('signup.account.confirmPassword')}
          id="passwordConfirm"
          type={showPassword ? 'text' : 'password'}
          value={passwordConfirm}
          helperText={error === 6 ? t('signup.account.passwordNotMatch') : ''}
          onChange={(event) => {
            setPasswordConfirm(event.target.value);
            checkPasswordMatch(password, event.target.value);
          }}
        />
      </Stack>

      <MobileStepper
        variant="dots"
        steps={6}
        position="static"
        activeStep={activeStep}
        backButton={
          <Button variant="contained" size="small" onClick={() => setActiveStep(activeStep - 1)}>
            {t('signup.general.back')}
          </Button>
        }
        nextButton={
          <Button variant="contained" size="small" onClick={() => sendUser()} disabled={!stepCompleted}>
            {t('signup.general.next')}
          </Button>
        }
      />
    </>
  );
}
