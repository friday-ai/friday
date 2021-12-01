import React from 'react';
import { useAuth } from './auth/AuthProvider';
import { init, RoutesType } from './api/routes';
import { SessionType } from '../utils/interfaces';
import HttpClient from './api/HttpClient';

interface AppContextType extends RoutesType {
  session: SessionType | null;
  login: (email: string, password: string, onSuccess: VoidFunction, onError: (error: string) => void) => void;
  logout: VoidFunction;
  hasSession: () => boolean;
}

const AppContext = React.createContext<AppContextType>(undefined!);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  const api = new HttpClient(auth);

  const routes = init(api);
  const value = { session: auth.session, login: auth.login, logout: auth.logout, hasSession: auth.hasSession, ...routes };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useApp = () => {
  return React.useContext(AppContext);
};

export default AppProvider;
export { useApp };
