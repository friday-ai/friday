import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { hasRoles, isAuth } from '../../services/api/auth';
import Unauthorized from '../../routes/Errors/Unauthorized';
import { getPath } from '../../utils/routes';

type RouteProps = {
  key: string;
  component: React.FC;
  roles: Array<string>;
  path: string;
};

// TODO: set location base 'login' and redirect to dashboard
// TODO: rewrite router with react-router v6 standart ?

const FridayRouter = ({ key, component: Component, roles, path }: RouteProps): JSX.Element => {
  const view = () => {
    if (!isAuth() && path !== '/login') {
      return <Navigate replace to={getPath('Login')} />;
    }

    if (!hasRoles(roles)) {
      return <Unauthorized />;
    }
    return <Component />;
  };

  return <Route key={key} path={path} element={view()} />;
};

export default FridayRouter;
