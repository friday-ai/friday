import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Drawer from '../Drawer/Drawer';
import Header from '../Header/Header';

const Layout: React.FC = () => {
  return (
    <div className="h-full flex bg-base-200">
      <Drawer />
      <div className="flex flex-col flex-1 h-full overflow-auto">
        <Header />
        <main className="flex-1 max-h-full overflow-auto">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" containerStyle={{ top: '75px', right: '30px' }} />
    </div>
  );
};

export default Layout;
