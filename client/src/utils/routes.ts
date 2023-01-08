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
    name: 'Plugin',
    path: '/dashboard/satellites/plugin/configuration/*',
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
  let name = routeFound?.name || '';

  if (name === '') {
    routes.forEach((route) => {
      if (route.path.includes('*')) {
        const p = route.path.replace('/*', '');
        if (path.includes(p)) {
          name = route.name;
        }
      }
    });
  }

  return name;
};

export default getRouteName;
