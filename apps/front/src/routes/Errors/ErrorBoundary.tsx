import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { AxiosError } from 'axios';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { ReactComponent as NotFoundSVG } from '../../assets/svg/no_data.svg';
import NotFound from './NotFound';
import ServerDown from './ServerDown';

export default function ErrorBoundary() {
  const theme = useTheme();
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
    errorMessage = error.statusText;
  } else if (error instanceof AxiosError) {
    if (error.code === 'ERR_NETWORK') {
      return <ServerDown />;
    }
    if (error.response!.status === 401) {
      window.location.href = '/login';
    }
    errorMessage = error.message;
  } else if (error instanceof Error) {
    if (error.message === 'Connection timeout') {
      return <ServerDown />;
    }

    errorMessage = error.message;
  } else if (typeof error === 'string') {
    const msg = error.replace('Uncaught Error: ', '');

    if (msg === 'Connection timeout') {
      return <ServerDown />;
    }

    if (msg === 'Auth failed') {
      window.location.href = '/login';
    }

    errorMessage = msg;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100%" alignItems="center" justifyContent="center" padding={2}>
      <div style={{ width: 'fit-content', height: 'fit-content', marginBottom: '2rem' }}>
        <NotFoundSVG width="inerhit" height="inerhit" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} />
      </div>
      <Typography textAlign="center" variant="h4" fontWeight={700}>
        Oops!
      </Typography>
      <Typography textAlign="center" variant="subtitle1" color={theme.palette.text.secondary}>
        An error has occured !
      </Typography>
      <Typography textAlign="center" variant="subtitle1" color={theme.palette.text.secondary}>
        Error: {errorMessage}
      </Typography>
    </Box>
  );
}
