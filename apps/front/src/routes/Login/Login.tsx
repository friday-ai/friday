import HelpOutline from '@mui/icons-material/HelpOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ReactLogo } from '../../assets/favicon.svg';

import useSharedApp from '../../services/app/useApp';

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useSharedApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Error codes: 0 = no error, 1 = user not found, 2 = incorrect password
  const [error, setError] = useState(0);

  const submit = async () => {
    setError(0);
    try {
      const res = await login(email, password);
      if (res) {
        navigate('/dashboard/devices', { replace: true });
      }
    } catch (err) {
      if (err.response.status === 404) {
        setError(1);
      } else if (err.response.status === 403) {
        setError(2);
      }
    }
  };

  return (
    <Box display="grid" justifyItems="center" justifyContent="center" alignItems="center" alignContent="center" minHeight="100%">
      <Box mb={4}>
        <ReactLogo width="70px" display="block" fill={theme.palette.primary.main} />
      </Box>

      <Paper sx={{ padding: '2rem', width: 335, '@media (min-width: 600px)': { width: 352 } }}>
        <Stack spacing={4}>
          <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main} alignSelf="center">
            Sign In to your account
          </Typography>

          <TextField
            error={error === 1}
            id="email"
            label="Email address"
            type="email"
            helperText={error === 1 ? 'User nor found' : ''}
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
          />

          <div>
            <TextField
              error={error === 2}
              label="Password"
              id="password"
              helperText={error === 2 ? 'Incorrect password' : ''}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                onKeyPress: (event) => {
                  const { key } = event;
                  if (key === 'Enter') {
                    submit();
                  }
                },
              }}
            />

            <Tooltip title="Contact the administrator to reset your password" arrow>
              <Typography variant="caption" color={theme.palette.text.primary}>
                Forgot your password ?
              </Typography>
            </Tooltip>
          </div>

          <Button variant="contained" onClick={submit}>
            Sign In
          </Button>
        </Stack>
      </Paper>

      <Box
        mt={4}
        p={1}
        sx={{ width: 335, '@media (min-width: 600px)': { width: 352 }, height: 48, ...theme.borders }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body1" mr={1} color={theme.palette.text.primary}>
          Don&apos;t have an account ?
        </Typography>
        <Tooltip title="Contact the administrator to create an account for you" arrow>
          <HelpOutline />
        </Tooltip>
      </Box>
    </Box>
  );
}
