import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';

import { useTheme } from '../../services/theme/ThemeProvider';
import { changeTheme, theme as themeSelector } from '../App/app.reducer';
import { useAppDispatch, useAppSelector } from '../../services/store/store';

// TODO: Build list dynamically (with translation)
const themesList = [
  {
    name: 'White',
    value: 'base',
  },
  {
    name: 'Dark',
    value: 'dark',
  },
  {
    name: 'Blue',
    value: 'blue',
  },
];

const ThemeSwitcher: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const selectedTheme = useAppSelector(themeSelector);
  const { theme } = useTheme();

  const onChange = (val: string) => {
    dispatch(changeTheme(val));
  };

  return (
    <Listbox value={selectedTheme} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative inline-block text-left">
            <Listbox.Button className={`p-1 ${theme.header.buttonsBg} rounded-full focus:outline-none`}>
              <Icon icon="ic:baseline-brush" className={`object-cover w-8 h-8 rounded-full p-1 ${theme.header.text}`} />
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options
                static
                className="absolute z-50 transform -translate-x-2/4 min-w-max py-1 mt-1 overflow-auto text-base bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {themesList.map((option) => (
                  <Listbox.Option
                    key={option.name}
                    className={({ active }) =>
                      `${active ? 'text-blue-700 bg-blue-100' : 'text-gray-400'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`${selected ? 'font-medium text-blue-900' : 'font-normal'} block truncate`}>{option.name}</span>
                        {selected && (
                          <span
                            className={`${active ? 'text-blue-700' : 'text-gray-400'}
                                absolute inset-y-0 left-0 flex items-center pl-3
                              ${selected ? 'font-medium text-blue-900' : ''}`}
                          >
                            <Icon icon="ic:round-check-circle" className="w-5 h-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default ThemeSwitcher;
