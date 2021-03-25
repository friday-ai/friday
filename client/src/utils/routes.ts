import React from 'react';
import { v4 } from 'uuid';

import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import NotFound from '../views/NotFound';
import UnderConstruction from '../views/UnderConstruction';

const routes = [
  {
    key: v4(),
    name: 'login',
    path: '/login',
    component: Login,
    roles: [],
  },
  {
    key: v4(),
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    roles: ['ROLE_USER'],
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
    name: 'underconstruction',
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

export { getRoutes, getPath };
