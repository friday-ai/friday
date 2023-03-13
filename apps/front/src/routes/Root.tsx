import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AnimationLayout from '../components/App/AnimationLayout';
import RequireAuth from '../components/Auth/RequireAuth';
import LoaderLayout from '../components/Loader/LoaderLayout';

import { useGetUserCount } from '../services/api/useUser';
import useSharedApp from '../services/app/useApp';

import Account from './Dashboard/Account';
import Dashboard from './Dashboard/Dashboard';
import Devices from './Dashboard/Devices';
import Satellites from './Dashboard/Satellites';
import Settings from './Dashboard/Settings';
import NotFound from './Errors/NotFound';
import ServerDown from './Errors/ServerDown';
import Login from './Login/Login';

export default function Root() {
  const { isLoading, isError, isSuccess, data } = useGetUserCount();
  const { initExistingSession } = useSharedApp();

  useEffect(() => {
    initExistingSession();
  }, [initExistingSession]);

  return (
    <>
      {isLoading && (
        <AnimationLayout>
          <LoaderLayout />
        </AnimationLayout>
      )}
      {isError && (
        <AnimationLayout>
          <ServerDown />
        </AnimationLayout>
      )}
      {isSuccess && (
        <Routes>
          {/* Signup route not exist if one or more user has already registered */}
          {data === 0 && <Route path="/signup" element={<div>signup</div>} />}

          {/* If one or more user has already registered, redirect him to dashboard */}
          {/* Else redirect him to signup route */}
          <Route path="/" element={data !== 0 ? <Navigate to="/dashboard/devices" replace /> : <Navigate to="/signup" replace />} />

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
    </>
  );
}
