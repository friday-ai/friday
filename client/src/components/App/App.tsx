import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import FridayRouter from '../FridayRouter';
import NotFound from '../../routes/Errors/NotFound';

import { getPath, getRoutes } from '../../utils/routes';
import Header from '../Header';
import Drawer from '../Drawer/Drawer';

import history from '../../services/history';

const prod = import.meta.env.PROD;

const App: React.FunctionComponent = () => {
  return (
    <Router history={history}>
      <div className="flex h-screen overflow-y-hidden">
        <Drawer />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Header />
          <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
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
  );
};

export default App;
