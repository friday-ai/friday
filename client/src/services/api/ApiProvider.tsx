import React, { useContext } from 'react';
import { init, RoutesType } from './routes';
import apiInstance from './apiInstance';

const routes = init(apiInstance);

const ApiContext = React.createContext<RoutesType>(routes);

export const ApiProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  return <ApiContext.Provider value={routes}>{children}</ApiContext.Provider>;
};

export const useApi = (): RoutesType => {
  const context = useContext(ApiContext);
  return context;
};
