import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { SessionType, UserType } from '../../utils/interfaces';

interface AuthHookType {
  logout: () => Promise<void>;
  getHeaders: () => { authorization?: string };
  session: SessionType;
  hasSession: () => boolean;
  login: (email: string, password: string, onSuccess: VoidFunction, onError: (error: string) => void) => Promise<void>;
  refreshToken: () => Promise<void>;
  signup: (user: UserType) => Promise<void>;
}

const useAuth = (): AuthHookType => {
  const localSession = (JSON.parse(localStorage.getItem('session') || '{}') as SessionType) || {};
  const [session, setSession] = React.useState<SessionType>(localSession);

  const hasSession = (): boolean => {
    return !!session.accessToken;
  };

  const getHeaders = () => {
    if (!hasSession()) {
      return {};
    }
    return { authorization: `Bearer ${session?.accessToken}` };
  };

  const login = async (email: string, password: string, onSuccess: VoidFunction, onError: (error: string) => void) => {
    try {
      const { data } = await axios.post<SessionType>('http://localhost:3000/api/v1/user/login', { email, password });
      setSession(data);
      localStorage.setItem('session', JSON.stringify(data));
      onSuccess();
    } catch (e: unknown) {
      const error = e as AxiosError;

      if (error?.response?.status === 404) {
        onError('404');
        return;
      }

      if (error?.response?.status === 403) {
        onError('403');
        return;
      }
      throw e;
    }
  };

  const logout = async () => {
    localStorage.removeItem('session');
    setSession({});
    await axios.patch<SessionType>('http://localhost:3000/api/v1/session/revoke/:id', {
      params: { id: session.user?.id, sessionId: session.id },
      headers: getHeaders(),
    });
  };

  const refreshToken = async () => {
    const { data } = await axios.post<SessionType>('http://localhost:3000/api/v1/session/access_token', {
      params: { refreshToken: session?.refreshToken },
    });

    setSession((prevState) => ({
      ...prevState,
      refreshToken: data.refreshToken,
    }));
  };

  const signup = async (user: UserType) => {
    const { data } = await axios.post<SessionType>('http://localhost:3000/api/v1/user/signup', user);
    setSession(data);
    localStorage.setItem('session', JSON.stringify(data));
  };

  const value = { session, hasSession, getHeaders, login, logout, refreshToken, signup };
  return value;
};

const RequireAuth: React.FC = () => {
  const auth = useAuth();
  const location = useLocation();

  const isAuth = auth.hasSession();

  if (!isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export { useAuth, RequireAuth };
export type { AuthHookType };
