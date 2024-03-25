import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';

import useSharedApp from '../services/app/useApp';

import LoaderSuspense from '../components/Loader/LoaderSuspense';
import { defaultSnackbar, errorSnackbar, infoSnackbar, successSnackbar, warningSnackbar } from '../components/Snackbar/Snackbar';
import useError from '../utils/useError';

export default function Root() {
  const { init } = useSharedApp();
  const { pathname } = useLocation();
  const { handleError } = useError();
  const navigate = useNavigate();

  const [isLoadingSession, setLoadingSession] = useState(true);
  useEffect(() => {
    // If the user tries to access the opening pages, let's do nothing
    if (/login|signup/.test(pathname)) {
      setLoadingSession(false);
      return;
    }

    init()
      .then((res) => {
        // It response is typeof number, then there is no session in local storage
        if (typeof res === 'number') {
          // Redirect user to appropriate route
          if (res !== 0) {
            navigate('/login');
          } else {
            navigate('/signup');
          }
        } else if (pathname === '/') {
          // But else, and, if the pathname is empty, redirect user to dashbaord
          navigate('/dashboard');
        }

        setLoadingSession(false);
      })
      .catch((error) => {
        // Throw error to redirect user to ErrorBoundary component
        throw error;
      });

    window.onerror = handleError;
  }, []);

  return (
    <>
      <LoaderSuspense isFetching={isLoadingSession}>
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
