import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import FridayRouter from '../FridayRouter/FridayRouter';
import NotFound from '../../routes/Errors/NotFound';

import { getRoutes } from '../../utils/routes';
import Header from '../Header/Header';
import Drawer from '../Drawer/Drawer';

import { ApiProvider } from '../../services/api/ApiProvider';

const App: React.FC = () => {
  return (
    <ApiProvider>
      <BrowserRouter>
        <div className="flex h-screen overflow-auto bg-base-200">
          <Drawer />
          <div className="flex flex-col flex-1 h-full overflow-auto">
            <Header />
            <main className="flex-1 max-h-full overflow-auto">
              <Routes>
                {getRoutes().map((route) => {
                  return FridayRouter({ key: route.key, component: route.component, path: route.path, roles: route.roles });
                })}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
      <Toaster position="top-right" containerStyle={{ top: '75px', right: '30px' }} />
    </ApiProvider>
  );
};

export default App;
