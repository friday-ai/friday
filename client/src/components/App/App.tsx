import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Layout from '../Layout/Layout';

import Login from '../../routes/Login';
import Devices from '../../routes/Devices';
import Dashboard from '../../routes/Dashboard';
import Scenes from '../../routes/Scenes';
import Satellites from '../../routes/Satellites';
import NotFound from '../../routes/Errors/NotFound';

import { RequireAuth } from '../../services/auth/AuthProvider';
import { changeView } from './app.reducer';
import { useAppDispatch } from '../../services/store/store';
import { useApp } from '../../services/AppProvider';
import getRouteName from '../../utils/routes';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const app = useApp();

  useEffect(() => {
    if (app.hasSession()) {
      navigate('/dashboard');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const name = getRouteName(location.pathname);
    dispatch(changeView(name));
    document.title = `Friday | ${name}`;
  }, [location, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="devices" element={<Devices />} />
            <Route path="scenes" element={<Scenes />} />
            <Route path="satellites" element={<Satellites />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
