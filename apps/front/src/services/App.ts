import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBetween } from 'use-between';
import DemoClient from './api/DemoClient';
import HttpClient from './api/HttpClient';
import { init } from './api/routes';
import Auth from './auth/auth';
import { SessionType } from '../utils/interfaces';
import Websockets from './websockets/websockets';
import Emitter from './emitter/emitter';

const isDemo = import.meta.env.VITE_DEMO_MODE;
const emitter = new Emitter();

const useApp = () => {
  const [userCount, setUserCount] = useState(0);
  const [session, setSession] = useState<SessionType>((JSON.parse(localStorage.getItem('session') || '{}') as SessionType) || {});

  const ws = useMemo(() => new Websockets(session, setSession, emitter), [session]);

  const updateSession = useCallback(
    (s: SessionType) => {
      localStorage.setItem('session', JSON.stringify(s));
      setSession(s);
      ws.connect(s);
    },
    [ws]
  );

  const auth = useMemo(() => new Auth(session, updateSession), [session, updateSession]);
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
    ws,
    session,
    login: auth.login,
    logout: auth.logout,
    hasSession: auth.hasSession,
    signup: auth.signup,
    emitter,
    userCount,
    ...routes,
  };
};

const useSharedApp = () => useBetween(useApp);

export default useSharedApp;
