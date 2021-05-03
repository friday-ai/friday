import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { MdBrush, MdCheckCircle } from 'react-icons/all';

import { useTheme } from '../services/theme/themeProvider';
import { changeTheme, theme as themeSelector } from './App/app.reducer';
import { useAppDispatch, useAppSelector } from '../services/store/store';

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
          <div className="relative mt-1">
            <Listbox.Button className={`p-1 ${theme.header.buttonsBg} rounded-full focus:outline-none`}>
              <MdBrush className={`object-cover w-8 h-8 rounded-full p-1 ${theme.header.text}`} />
            </Listbox.Button>
            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                        {selected ? (
                          <span
                            className={`${active ? 'text-blue-700' : 'text-gray-400'}
                                absolute inset-y-0 left-0 flex items-center pl-3
                              ${selected ? 'font-medium text-blue-900' : ''}`}
                          >
                            <MdCheckCircle className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
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

// eslint-disable-next-line no-lone-blocks
{
  /**
   return (
   <div>
   <button type="button" className={`p-1 ${theme.header.buttonsBg} rounded-full focus:outline-none`} onClick={() => setVisible(!visible)}>
   <MdBrush className={`object-cover w-8 h-8 rounded-full p-1 ${theme.header.text}`} />
   </button>

   <div
   className={`absolute mt-4 z-50 transform bg-white rounded-xl shadow-2xl -translate-x-3/4 min-w-max flex flex-col`}
   hidden={visible}
   >
   <span className="text-gray-400 px-5 pt-2 text-md">Theme</span>
   <div className="flex flex-col p-3">
   <RadioButton selected={selectedTheme} onChange={onChange} text="White" value="base" />
   <RadioButton selected={selectedTheme} onChange={onChange} text="Dark" value="dark" />
   <RadioButton selected={selectedTheme} onChange={onChange} text="Blue" value="blue" />
   </div>
   </div>
   </div>
   );
   */
}
