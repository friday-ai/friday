/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { v4 } from 'uuid';

import Login from '../routes/Login';
import Dashboard from '../routes/Dashboard';
import NotFound from '../routes/Errors/NotFound';
import UnderConstruction from '../routes/Errors/UnderConstruction';
import Scenes from '../routes/Scenes';

const routes = [
  {
    key: v4(),
    name: 'Login',
    path: '/login',
    component: Login,
    roles: [],
  },
  {
    key: v4(),
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    roles: ['ROLE_USER'],
  },
  {
    key: v4(),
    name: 'Scenes',
    path: '/scenes',
    component: Scenes,
    roles: [],
  },
  {
    key: v4(),
    name: '404',
    path: '/404',
    component: NotFound,
    roles: [],
  },
  {
    key: v4(),
    name: 'Underconstruction',
    path: '/underconstruction',
    component: UnderConstruction,
    roles: [],
  },
];

type Route = {
  key: string;
  name: string;
  path: string;
  component: React.FunctionComponent;
  roles: string[];
  routes?: Route[];
};

const compile = (parentRoute: Route, subRoutes: Route[]): Route[] => {
  return subRoutes.flatMap((subRoute) => {
    const newRoute: Route = {
      key: subRoute.key,
      name: subRoute.name,
      path: parentRoute.path + subRoute.path,
      component: subRoute.component,
      roles: (parentRoute.roles || []).concat(subRoute.roles || []),
    };
    return subRoute.routes ? [...compile(newRoute, subRoute.routes)] : newRoute;
  });
};

const getRoutes = (): Route[] => {
  const parentRoute = {
    key: '',
    name: '',
    path: '',
    component: NotFound,
    roles: [],
  };
  const flatRoutes = compile(parentRoute, routes);
  return flatRoutes;
};

const getPath = (name: string, params = {}): string => {
  const routeFound = getRoutes().find((route) => route.name === name);
  let path = routeFound ? routeFound.path : '/';
  if (path && params) {
    Object.entries(params).forEach(([key, value]: [string, any]) => {
      path = path ? path.replace(`:${key}`, value) : '';
    });
  }
  return path;
};

const getName = (path: string): string => {
  const routeFound = getRoutes().find((route) => route.path === path);
  const name = routeFound ? routeFound.name : 'Dashboard';
  return name;
};

export { getRoutes, getPath, getName };
