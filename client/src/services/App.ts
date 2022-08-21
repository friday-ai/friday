import { useEffect, useMemo, useState } from 'react';
import { useBetween } from 'use-between';
import DemoClient from './api/DemoClient';
import HttpClient from './api/HttpClient';
import { init } from './api/routes';
import Auth from './auth/auth';
import { SessionType } from '../utils/interfaces';

const isDemo = import.meta.env.VITE_DEMO_MODE;

const useApp = () => {
  const [userCount, setUserCount] = useState(0);
  const [session, setSession] = useState<SessionType>((JSON.parse(localStorage.getItem('session') || '{}') as SessionType) || {});

  const auth = useMemo(() => new Auth(session, setSession), [session]);
  const api = useMemo(() => (isDemo ? new DemoClient() : new HttpClient(auth)), [auth]);
  const routes = useMemo(() => init(api), [api]);

  useEffect(() => {
    routes.users
      .getCount()
      .then((users) => setUserCount(users))
      .catch(() => setUserCount(-1));

    auth.checkSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    session,
    login: auth.login,
    logout: auth.logout,
    hasSession: auth.hasSession,
    signup: auth.signup,
    userCount,
    ...routes,
  };
};

const useSharedApp = () => useBetween(useApp);

export default useSharedApp;
