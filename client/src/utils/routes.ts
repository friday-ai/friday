const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Devices',
    path: '/dashboard/devices',
  },
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Scenes',
    path: '/dashboard/scenes',
  },
  {
    name: 'Satellites and Plugins',
    path: '/dashboard/satellites',
  },
  {
    name: 'Settings',
    path: '/dashboard/settings',
  },
  {
    name: 'Signup',
    path: '/signup',
  },
  {
    name: 'Signup',
    path: '/signup/user',
  },
  {
    name: 'Signup',
    path: '/signup/house',
  },
  {
    name: 'Signup',
    path: '/signup/settings',
  },
  {
    name: 'Signup',
    path: '/signup/final',
  },
];

const getRouteName = (path: string): string => {
  const routeFound = routes.find((route) => route.path === path);
  const name = routeFound ? routeFound.name : 'Dashboard';
  return name;
};

export default getRouteName;
