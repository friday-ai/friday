import React from 'react';
import { Icon } from '@iconify/react';

import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { drawerToggled, toggleDrawer, currentView } from '../App/app.reducer';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { useApp } from '../../services/AppProvider';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(drawerToggled);
  const view = useAppSelector(currentView);
  const navigate = useNavigate();
  const app = useApp();

  const logout = () => {
    app.logout();
    navigate('/login');
  };

  return (
    <div className="navbar border-b border-base-300 bg-base-100">
      <div className="navbar-start">
        <button aria-label="Toggle drawer" type="button" className="p-2 rounded-md focus:outline-none" onClick={() => dispatch(toggleDrawer())}>
          <Icon
            icon="ic:baseline-keyboard-double-arrow-right"
            className={`w-8 h-8 text-primary ${isSidebarOpen && 'transform transition-transform -rotate-180'}`}
          />
        </button>
      </div>

      <div className="navbar-center px-2 mx-2 text-primary max-w-32 sm:max-w-none">
        <span className="truncate">{view}</span>
      </div>

      <div className="navbar-end space-x-2">
        <ThemeSwitcher />
        <div title="User" className="dropdown dropdown-end">
          <button aria-label="User menu" type="button" tabIndex={0} className="avatar btn btn-ghost btn-circle bg-base-300">
            <div className="w-10 h-10 mask mask-circle">
              <img src="https://pickaface.net/gallery/avatar/unr_ironman_170308_2112_9ldw5b.png" alt="John Pepperwood" />
            </div>
          </button>
          <div className="dropdown-base text-base-content border border-base-300">
            <ul className="menu compact p-3">
              <li>
                <Link to="/settings/user/profile" className="space-x-2">
                  <Icon icon="ic:baseline-person" className="w-6 h-6" />
                  <span>Profile</span>
                </Link>
              </li>
              <div className="divider divider-sm mx-3" />
              <li>
                <button aria-label="Logout" type="button" className="space-x-2" onClick={logout}>
                  <Icon icon="ic:baseline-logout" className="w-6 h-6" />
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
