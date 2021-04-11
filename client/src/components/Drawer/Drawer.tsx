import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClose, MdDashboard, MdHelpOutline, MdLightbulbOutline, MdSettings } from 'react-icons/md';
import { TiFlowChildren, VscExtensions } from 'react-icons/all';
import logoBlack from '../../assets/logo_black.svg';
import faviconBlack from '../../assets/favicon_black.svg';
import './style.css';

import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { drawerToggled, toggleDrawer } from '../App/app.reducer';

const Drawer: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(drawerToggled);
  const location = useLocation();

  return (
    <aside
      className={`bg-white fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden
      transition-all transform border-r shadow-lg lg:z-auto lg:static lg:shadow-none ${
        !isSidebarOpen ? '-translate-x-full lg:translate-x-0 lg:w-20' : ''
      }`}
    >
      <div className="flex justify-center flex-shrink-0 p-2">
        <img className={`p-2 ${!isSidebarOpen ? 'hidden' : ''}`} src={logoBlack} alt="page not found" width={144} height={34} />
        <img className={`p-2 ${isSidebarOpen ? 'hidden' : ''}`} src={faviconBlack} alt="page not found" width={44} height={44} />
        <button type="button" className="p-2 rounded-md lg:hidden" onClick={() => dispatch(toggleDrawer())}>
          <MdClose className="w-6 h-6 text-blue-500" />
        </button>
      </div>

      <nav className="flex-1 flex-grow overflow-hidden hover:overflow-y-auto text-gray-400">
        <ul className="p-2 overflow-hidden">
          <li className="mb-3">
            <Link
              to="/dashboard"
              className={`flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-100 ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/dashboard') ? 'active' : ''
              }`}
            >
              <MdDashboard className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Dashboard</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/devices"
              className={`flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-100 ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/devices') ? 'active' : ''
              }`}
            >
              <MdLightbulbOutline className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Devices</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/scenes"
              className={`flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-100 ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/scenes') ? 'active' : ''
              }`}
            >
              <TiFlowChildren className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Scenes</span>
            </Link>
          </li>
          <li className="mb-3 active">
            <Link
              to="/plugins"
              className={`flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-100 ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/plugins') ? 'active' : ''
              }`}
            >
              <VscExtensions className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Plugins</span>
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="flex-shrink-0 overflow-hidden hover:overflow-y-auto text-gray-400">
        <ul className="p-2 overflow-hidden">
          <li className="mb-3">
            <a
              href="https://friday-ai.gitbook.io/friday/"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-100 ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <MdHelpOutline className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Help</span>
            </a>
          </li>
          <li>
            <Link
              to="/settings"
              className={`flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-100 ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/settings') ? 'active' : ''
              }`}
            >
              <MdSettings className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Drawer;
