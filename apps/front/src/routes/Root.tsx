import React, { useEffect, useState } from 'react';
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';

import { useGetUserCount } from '../services/api/useUser';
import useSharedApp from '../services/app/useApp';

import LoaderSuspense from '../components/Loader/LoaderSuspense';
import { defaultSnackbar, errorSnackbar, infoSnackbar, successSnackbar, warningSnackbar } from '../components/Snackbar/Snackbar';

export default function Root() {
  const { isLoading, isSuccess, data, isError, error } = useGetUserCount();
  const { initExistingSession, hasSession } = useSharedApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoadingSession, setLoadingSession] = useState(false);

  useEffect(() => {
    if (isSuccess && data !== 0 && !hasSession) {
      setLoadingSession(true);
      initExistingSession().then((res) => {
        if (!res) {
          redirect('/login');
        }
        setLoadingSession(false);
      });
    } else if (isSuccess && data === 0) {
      redirect('signup');
    } else if (isSuccess && pathname === '/dashboard') {
      navigate('dashboard');
    }

    // Throw error to redirect user to ErrorBoundary component
    if (isError) {
      throw error;
    }
  }, [isSuccess, data, initExistingSession, hasSession, isError, error]);

  return (
    <>
      <LoaderSuspense isFetching={isLoading || isLoadingSession}>
        <Outlet></Outlet>
      </LoaderSuspense>
      <SnackbarProvider
        Components={{
          default: defaultSnackbar,
          success: successSnackbar,
          warning: warningSnackbar,
          error: errorSnackbar,
          info: infoSnackbar,
        }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        maxSnack={6}
      />
    </>
  );
}
