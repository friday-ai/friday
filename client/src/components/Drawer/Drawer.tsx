import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClose, MdDashboard, MdHelpOutline, MdLightbulbOutline, MdSettings } from 'react-icons/md';
import { TiFlowChildren, VscExtensions } from 'react-icons/all';
import logoBlack from '../../assets/logo_black.svg';
import logoWhite from '../../assets/logo_white.svg';
import faviconWhite from '../../assets/favicon_white.svg';
import faviconBlack from '../../assets/favicon_black.svg';

import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { drawerToggled, toggleDrawer } from '../App/app.reducer';
import { useTheme } from '../../services/theme/themeProvider';

const Drawer: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(drawerToggled);
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <aside
      className={`${theme.sidebar.background} ${
        theme.sidebar.border
      } fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden
      transition-all transform border-r shadow-lg lg:z-auto lg:static lg:shadow-none ${
        !isSidebarOpen ? '-translate-x-full lg:translate-x-0 lg:w-20' : ''
      }`}
    >
      <div className="flex justify-center flex-shrink-0 p-2">
        <img
          className={`p-2 ${!isSidebarOpen ? 'hidden' : ''}`}
          src={theme.app.logo === 'white' ? logoWhite : logoBlack}
          alt="page not found"
          width={144}
          height={34}
        />
        <img
          className={`p-2 ${isSidebarOpen ? 'hidden' : ''}`}
          src={theme.app.favicon === 'white' ? faviconWhite : faviconBlack}
          alt="page not found"
          width={44}
          height={44}
        />
        <button type="button" className="p-2 rounded-md lg:hidden" onClick={() => dispatch(toggleDrawer())}>
          <MdClose className={`w-6 h-6 ${theme.sidebar.closeButton}`} />
        </button>
      </div>

      <nav className={`flex-1 flex-grow overflow-hidden hover:overflow-y-auto ${theme.sidebar.text}`}>
        <ul className="p-2 overflow-hidden">
          <li className="mb-3">
            <Link
              to="/dashboard"
              className={`flex items-center p-2 space-x-2 rounded-lg ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/dashboard') ? theme.sidebar.elementActive : theme.sidebar.elementInactive
              }`}
            >
              <MdDashboard className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Dashboard</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/devices"
              className={`flex items-center p-2 space-x-2 rounded-lg ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/devices') ? theme.sidebar.elementActive : theme.sidebar.elementInactive
              }`}
            >
              <MdLightbulbOutline className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Devices</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/scenes"
              className={`flex items-center p-2 space-x-2 rounded-lg ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/scenes') ? theme.sidebar.elementActive : theme.sidebar.elementInactive
              }`}
            >
              <TiFlowChildren className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Scenes</span>
            </Link>
          </li>
          <li className="mb-3 active">
            <Link
              to="/plugins"
              className={`flex items-center p-2 space-x-2 rounded-lg ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/plugins') ? theme.sidebar.elementActive : theme.sidebar.elementInactive
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
              className={`flex items-center p-2 space-x-2 rounded-lg ${!isSidebarOpen ? 'justify-center' : ''} ${theme.sidebar.elementInactive}`}
            >
              <MdHelpOutline className="w-6 h-6" />
              <span className={`${!isSidebarOpen ? 'lg:hidden' : ''}`}>Help</span>
            </a>
          </li>
          <li>
            <Link
              to="/settings"
              className={`flex items-center p-2 space-x-2 rounded-lg ${!isSidebarOpen ? 'justify-center' : ''} ${
                location.pathname.includes('/settings') ? theme.sidebar.elementActive : theme.sidebar.elementInactive
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
