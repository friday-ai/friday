import { useLocation } from 'react-router-dom';

const regex = /(?<=dashboard\/)[^/]+/;

const useCurrentPath = () => {
  const { pathname } = useLocation();
  const path = regex.exec(pathname);
  return path ? path[0] : '';
};

export default useCurrentPath;
