import { matchPath, useLocation } from "react-router-dom";

const useSelectedRoute = (routes: string[]) => {
  const { pathname } = useLocation();
  const match = routes.find((route) => {
    // If pattern start with '*'
    // do manually check
    if (route.startsWith("*")) {
      const r = route.replaceAll("*", "");
      return pathname.includes(r) ? route : undefined;
    }
    return matchPath(route, pathname);
  });

  return match === undefined ? false : routes.indexOf(match);
};

export default useSelectedRoute;
