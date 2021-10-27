import React, { Fragment, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Transition } from '@headlessui/react';

import useWindowEvent from '../../utils/useWindowEvent';

interface DropdownProps {
  buttonClassname?: string;
  buttonText: string;
  buttonTextClassname?: string;
  buttonIcon?: string;
  buttonIconClassname?: string;
  children: React.ReactNode;
  className?: string;
  containerStyle?: string;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  children,
  buttonClassname = 'btn-base mr-5 border border-gray-300 bg-white hover:bg-gray-200 text-blue-500',
  buttonIconClassname = 'w-6 h-6 mr-2',
  buttonTextClassname = 'truncate',
  buttonIcon,
  buttonText,
  className,
  containerStyle = 'bg-white',
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useWindowEvent('mousedown', (event) => {
    const target = event.target as HTMLElement;
    if (ref.current && !ref.current.contains(target)) {
      setIsShowing(false);
    }
  });

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button type="button" className={buttonClassname} onClick={() => setIsShowing(() => !isShowing)}>
        {buttonIcon !== undefined && <Icon icon={buttonIcon} className={buttonIconClassname} />}
        <span className={buttonTextClassname}>{buttonText}</span>
      </button>

      <Transition
        as={Fragment}
        show={isShowing}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className={`absolute z-50 right-0 w-56 mt-2 origin-top-right rounded-lg shadow-lg focus:outline-none ${containerStyle}`}>{children}</div>
      </Transition>
    </div>
  );
};

export default Dropdown;
