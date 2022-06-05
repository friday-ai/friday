import React, { useMemo } from 'react';
import { useAuth } from './auth/AuthProvider';
import { init, RoutesType } from './api/routes';
import { SessionType, UserType } from '../utils/interfaces';
import HttpClient from './api/HttpClient';
import DemoClient from './api/DemoClient';

const isDemo = import.meta.env.VITE_DEMO_MODE;

interface AppContextType extends RoutesType {
  session: SessionType | null;
  login: (email: string, password: string, onSuccess: VoidFunction, onError: (error: string) => void) => void;
  logout: VoidFunction;
  hasSession: () => boolean;
  signup: (user: UserType) => Promise<void>;
}

const AppContext = React.createContext<AppContextType>(undefined!);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  const api = useMemo(() => (isDemo ? new DemoClient() : new HttpClient(auth)), [auth]);

  const routes = useMemo(() => init(api), [api]);

  const value = useMemo(
    () => ({ session: auth.session, login: auth.login, logout: auth.logout, hasSession: auth.hasSession, signup: auth.signup, ...routes }),
    [auth, routes]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useApp = () => {
  return React.useContext(AppContext);
};

export default AppProvider;
export { useApp };
