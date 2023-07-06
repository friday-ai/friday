import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';

import AnimationLayout from '../components/App/AnimationLayout';
import RequireAuth from '../components/Auth/RequireAuth';

import { useGetUserCount } from '../services/api/useUser';
import useSharedApp from '../services/app/useApp';

import LoaderSuspense from '../components/Loader/LoaderSuspense';
import Account from './Dashboard/Account';
import Dashboard from './Dashboard/Dashboard';
import Devices from './Dashboard/Devices';
import Satellites from './Dashboard/Satellites/Satellites';
import Settings from './Dashboard/Settings';
import NotFound from './Errors/NotFound';
import ServerDown from './Errors/ServerDown';
import Login from './Login/Login';
import Signup from './Signup/Signup';

import { defaultSnackbar, errorSnackbar, infoSnackbar, successSnackbar, warningSnackbar } from '../components/Snackbar/Snackbar';

export default function Root() {
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, data } = useGetUserCount();
  const { initExistingSession, hasSession } = useSharedApp();

  const [loadingSession, setLoadingSession] = useState(false);

  useEffect(() => {
    if (isSuccess && data !== 0 && !hasSession) {
      setLoadingSession(true);
      initExistingSession().then((res) => {
        if (!res) {
          navigate('/login');
        }
        setLoadingSession(false);
      });
    }
  }, [isSuccess, data, initExistingSession, hasSession, navigate]);

  return (
    <LoaderSuspense isFetching={isLoading || loadingSession}>
      <>
        {isError && !loadingSession && (
          <AnimationLayout>
            <ServerDown />
          </AnimationLayout>
        )}
        {isSuccess && !loadingSession && (
          <Routes>
            {/* Signup route not exist if one or more user has already registered */}
            {data === 0 && <Route path="/signup" element={<Signup />} />}

            {/* If one or more user has already registered, redirect him to dashboard */}
            {/* Else redirect him to signup route */}
            <Route path="/" element={data !== 0 ? <Navigate to="/dashboard/devices" replace /> : <Navigate to="/signup" replace />} />

            <Route
              path="/server-down"
              element={
                <AnimationLayout>
                  <ServerDown />
                </AnimationLayout>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path="dashboard" element={<Dashboard />}>
                <Route index path="devices" element={<Devices />} />
                <Route path="account" element={<Account />} />
                <Route path="satellites" element={<Satellites />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
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
    </LoaderSuspense>
  );
}
