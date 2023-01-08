import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Layout from '../Layout/Layout';

import Login from '../../routes/Login';
import Devices from '../../routes/Devices';
import Dashboard from '../../routes/Dashboard';
import Scenes from '../../routes/Scenes';
import Satellites from '../../routes/Satellites';
import NotFound from '../../routes/Errors/NotFound';
import Signup from '../../routes/Signup/Signup';

import RequireAuth from '../../services/auth/RequireAuth';
import { changeView, serverOffline } from './app.reducer';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import useSharedApp from '../../services/App';
import getRouteName from '../../utils/routes';
import ServerDown from '../../routes/Errors/ServerDown';
import PluginConfiguration from '../../routes/Plugin/Configuration';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const app = useSharedApp();

  useEffect(() => {
    const name = getRouteName(location.pathname);
    dispatch(changeView(name));
    document.title = `Friday | ${name}`;
  }, [location, dispatch]);

  return useAppSelector(serverOffline) || app.userCount === -1 ? (
    <ServerDown />
  ) : (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={app.userCount !== 0 ? <Login /> : <Navigate to="/signup" replace />} />
      <Route path="/signup/*" element={app.userCount === 0 ? <Signup /> : <Navigate to="/dashboard" replace />} />
      <Route element={<RequireAuth />}>
        <Route path="dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<Devices />} />
          <Route path="scenes" element={<Scenes />} />
          <Route path="satellites">
            <Route index element={<Satellites />} />
            <Route path="plugin/configuration/:name/:id" element={<PluginConfiguration />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
