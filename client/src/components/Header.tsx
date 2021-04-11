import React from 'react';
import { HiChevronDoubleRight } from 'react-icons/all';

import { useAppDispatch, useAppSelector } from '../services/store/store';
import { drawerToggled, toggleDrawer } from './App/app.reducer';

const Header: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(drawerToggled);

  return (
    <header className="flex-shrink-0 border-b bg-white">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-3">
          <button type="button" className="p-2 rounded-md focus:outline-none" onClick={() => dispatch(toggleDrawer())}>
            <HiChevronDoubleRight className={`w-6 h-6 text-blue-500 ${isSidebarOpen ? 'transform transition-transform -rotate-180' : ''}`}/>
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <span>Dashboard</span>
        </div>
        <div className="relative flex items-center space-x-3">
          <div className="relative">
            <button type="button" className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring">
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
