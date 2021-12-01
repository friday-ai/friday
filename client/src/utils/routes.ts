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
];

const getRouteName = (path: string): string => {
  const routeFound = routes.find((route) => route.path === path);
  const name = routeFound ? routeFound.name : 'Dashboard';
  return name;
};

export default getRouteName;
