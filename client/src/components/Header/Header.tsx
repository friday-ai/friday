import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { drawerToggled, toggleDrawer, currentView, changeView } from '../App/app.reducer';
import { useTheme } from '../../services/theme/ThemeProvider';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { getName } from '../../utils/routes';

const Header: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(drawerToggled);
  const view = useAppSelector(currentView);
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    dispatch(changeView(getName(location.pathname)));
  }, [dispatch, location]);

  return (
    <header className={`flex-shrink-0 border-b ${theme.header.background} ${theme.header.border}`}>
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-3">
          <button type="button" className="p-2 rounded-md focus:outline-none" onClick={() => dispatch(toggleDrawer())}>
            <Icon
              icon="ic:baseline-keyboard-double-arrow-right"
              className={`w-8 h-8  ${theme.header.text} ${isSidebarOpen ? 'transform transition-transform -rotate-180' : ''}`}
            />
          </button>
        </div>
        <div className={`flex items-center space-x-3 ${theme.header.text}`}>
          <span>{view}</span>
        </div>
        <div className="relative flex items-center space-x-3">
          <ThemeSwitcher />
          <div className="relative ml-2">
            <button type="button" className={`p-1 ${theme.header.buttonsBg} rounded-full focus:outline-none `}>
              <img
                className="object-cover w-8 h-8 rounded-full"
                src="https://pickaface.net/gallery/avatar/unr_ironman_170308_2112_9ldw5b.png"
                alt="Ahmed Kamel"
              />
            </button>

            {/* <div className='absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping' />
              <div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3" /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
