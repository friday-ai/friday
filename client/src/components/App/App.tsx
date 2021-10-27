import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import './app.css';

import FridayRouter from '../FridayRouter/FridayRouter';
import NotFound from '../../routes/Errors/NotFound';

import { getPath, getRoutes } from '../../utils/routes';
import Header from '../Header/Header';
import Drawer from '../Drawer/Drawer';

import history from '../../services/history';
import { ThemeProvider } from '../../services/theme/themeProvider';
import { useAppSelector } from '../../services/store/store';
import { theme } from './app.reducer';

const prod = import.meta.env.PROD;

const App: React.FunctionComponent = () => {
  const selectedTheme = useAppSelector(theme);
  return (
    <ThemeProvider value={selectedTheme}>
      <Router history={history}>
        <div className="flex h-screen overflow-auto">
          <Drawer />
          <div className="flex flex-col flex-1 h-full overflow-auto">
            <Header />
            <main className="flex-1 max-h-full overflow-auto">
              <Switch>
                <Route // TODO: This is during development stage
                  exact
                  path="/"
                  render={() => {
                    return prod === true ? <Redirect to={getPath('underconstruction')} /> : <Redirect to={getPath('dashboard')} />;
                  }}
                />

                {getRoutes().map((route) => {
                  return <FridayRouter path={route.path} key={route.key} component={route.component} roles={route.roles} />;
                })}
                <Route path="*" component={NotFound} />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
