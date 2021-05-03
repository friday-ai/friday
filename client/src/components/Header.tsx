import React from 'react';
import { HiChevronDoubleRight } from 'react-icons/all';

import { useAppDispatch, useAppSelector } from '../services/store/store';
import { drawerToggled, toggleDrawer } from './App/app.reducer';
import { useTheme } from '../services/theme/themeProvider';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(drawerToggled);
  const { theme } = useTheme();

  return (
    <header className={`flex-shrink-0 border-b ${theme.header.background} ${theme.header.border}`}>
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-3">
          <button type="button" className="p-2 rounded-md focus:outline-none" onClick={() => dispatch(toggleDrawer())}>
            <HiChevronDoubleRight className={`w-6 h-6  ${theme.header.text} ${isSidebarOpen ? 'transform transition-transform -rotate-180' : ''}`} />
          </button>
        </div>
        <div className={`flex items-center space-x-3 ${theme.header.text}`}>
          <span>Dashboard</span>
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
