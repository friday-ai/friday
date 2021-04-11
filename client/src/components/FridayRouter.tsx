import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { hasRoles, isAuth } from '../services/security';
import Unauthorized from '../routes/Errors/Unauthorized';
import { getPath } from '../utils/routes';

type RouteProps = {
  component: React.FunctionComponent;
  roles: Array<string>;
  path: string;
};

const FridayRouter: React.FunctionComponent<RouteProps> = ({ component: Component, roles, path }) => {
  const view = () => {
    if (!isAuth() && path !== '/login') {
      return <Redirect to={getPath('login')} />;
    }

    if (!hasRoles(roles)) {
      return <Unauthorized />;
    }
    return <Component />;
  };

  return <Route exact path={path} render={view} />;
};

export default FridayRouter;
