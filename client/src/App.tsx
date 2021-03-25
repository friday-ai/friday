import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import FridayRouter from './components/FridayRouter';
import NotFound from './views/NotFound';

import { getPath, getRoutes } from './utils/routes';

const prod = import.meta.env.PROD;

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <div className="h-full">
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
      </div>
    </Router>
  );
};

export default App;
