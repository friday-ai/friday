import React from 'react';

import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import Devices from './Dashboard/Devices';
import SatellitesDetails from './Dashboard/Satellites/Details';
import PluginInstall from './Dashboard/Satellites/Plugins/Install';
import Satellites from './Dashboard/Satellites/Satellites';
import House from './Dashboard/Settings/House/House';
import Session from './Dashboard/Settings/Session/Session';
import Settings from './Dashboard/Settings/Settings';
import System from './Dashboard/Settings/System';
import User from './Dashboard/Settings/User/User';
import ErrorBoundary from './Errors/ErrorBoundary';
import Login from './Login/Login';
import Root from './Root';
import Signup from './Signup/Signup';

type RemixRouter = ReturnType<typeof createBrowserRouter>;

const router: RemixRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorBoundary />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Devices />} />

        <Route path="satellites">
          <Route index element={<Satellites />} />
          <Route path=":id">
            <Route index element={<SatellitesDetails />} />
            <Route path="plugins/install" element={<PluginInstall />} />
          </Route>
        </Route>

        <Route path="settings" element={<Settings />}>
          <Route index path="system" element={<System />} />
          <Route path="houses" element={<House />} />
          <Route path="users" element={<User />}></Route>
          <Route path="sessions" element={<Session />}></Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;
