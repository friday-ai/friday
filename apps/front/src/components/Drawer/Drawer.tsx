import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { drawerToggled, toggleDrawer } from '../App/app.reducer';
import useWindowEvent from '../../services/hooks/useWindowEvent';
import Logo from '../Illustrations/Logo';
import Favicon from '../Illustrations/Favicon';
import getRouteName from '../../utils/routes';

function Drawer() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(drawerToggled);
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useWindowEvent('mousedown', (event) => {
    const target = event.target as HTMLElement;
    if (ref.current && !ref.current.contains(target) && isSidebarOpen) {
      dispatch(toggleDrawer());
    }
  });

  return (
    <aside
      ref={ref}
      className={`bg-base-100 fixed inset-y-0 z-50 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden
      transition-all transform border-r border-base-300 shadow-lg lg:z-auto lg:static lg:shadow-none ${
        !isSidebarOpen && '-translate-x-full lg:translate-x-0 lg:w-20'
      }`}
    >
      <div className="flex justify-center flex-shrink-0 p-2">
        <Logo className={`p-2 ${!isSidebarOpen && 'hidden'}`} width="170" height="44" />
        <Favicon className={`p-2 ${isSidebarOpen && 'hidden'}`} width="44" height="44" />
        <button aria-label="Close drawer" type="button" className="p-2 rounded-md lg:hidden" onClick={() => dispatch(toggleDrawer())}>
          <Icon icon="ic:baseline-close" className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 flex-grow overflow-hidden hover:overflow-y-auto">
        <ul className="menu p-2 overflow-hidden">
          <li className="mb-3">
            <Link
              to="/"
              aria-label="dashboard"
              onClick={() => isSidebarOpen && dispatch(toggleDrawer())}
              className={`space-x-2 ${!isSidebarOpen && 'justify-center'} ${getRouteName(location.pathname) === 'Dashboard' && 'active'}`}
            >
              <Icon icon="ic:baseline-dashboard" className="w-6 h-6" />
              <span className={`${!isSidebarOpen && 'lg:hidden'}`}>Dashboard</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="devices"
              aria-label="devices"
              onClick={() => isSidebarOpen && dispatch(toggleDrawer())}
              className={`space-x-2 ${!isSidebarOpen && 'justify-center'} ${getRouteName(location.pathname) === 'Devices' && 'active'}`}
            >
              <Icon icon="ic:outline-lightbulb" className="w-6 h-6" />
              <span className={`${!isSidebarOpen && 'lg:hidden'}`}>Devices</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="scenes"
              aria-label="scenes"
              onClick={() => isSidebarOpen && dispatch(toggleDrawer())}
              className={`space-x-2 ${!isSidebarOpen && 'justify-center'} ${getRouteName(location.pathname) === 'Scenes' && 'active'}`}
            >
              <Icon icon="typcn:flow-children" className="w-6 h-6" />
              <span className={`${!isSidebarOpen && 'lg:hidden'}`}>Scenes</span>
            </Link>
          </li>
          <li className="mb-3 active">
            <Link
              to="satellites"
              aria-label="satellites"
              onClick={() => isSidebarOpen && dispatch(toggleDrawer())}
              className={`space-x-2 ${!isSidebarOpen && 'justify-center'}
              ${getRouteName(location.pathname) === 'Satellites and Plugins' && 'active'}
                ${getRouteName(location.pathname) === 'Plugin Configuration' && 'active'}
              `}
            >
              <Icon icon="codicon:extensions" className="w-6 h-6" />
              <span className={`${!isSidebarOpen && 'lg:hidden'}`}>Plugins</span>
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="flex-shrink-0 overflow-hidden hover:overflow-y-auto">
        <ul className="menu p-2 overflow-hidden">
          <li className="mb-3">
            <a
              href="https://friday-ai.gitbook.io/friday/"
              aria-label="documentation"
              target="_blank"
              rel="noreferrer"
              className={`space-x-2 ${!isSidebarOpen && 'justify-center'}`}
            >
              <Icon icon="ic:baseline-help-outline" className="w-6 h-6" />
              <span className={`${!isSidebarOpen && 'lg:hidden'}`}>Help</span>
            </a>
          </li>
          <li>
            <Link
              to="settings"
              aria-label="settings"
              onClick={() => isSidebarOpen && dispatch(toggleDrawer())}
              className={`space-x-2 ${!isSidebarOpen && 'justify-center'} ${getRouteName(location.pathname) === 'Settings' && 'active'}`}
            >
              <Icon icon="ic:baseline-settings" className="w-6 h-6" />
              <span className={`${!isSidebarOpen && 'lg:hidden'}`}>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Drawer;
