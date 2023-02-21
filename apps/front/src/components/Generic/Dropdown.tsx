import React from 'react';
import { Icon } from '@iconify/react';

interface DropdownProps {
  title: string;
  className?: string;
  btnText: string;
  btnStyle?: string;
  icon: string | '';
  iconStyle?: string;
  containerStyle?: string;
  placement?: 'dropdown-right' | 'dropdown-left' | 'dropdown-top' | 'dropdown-end';
  children: React.ReactNode;
}

function Dropdown({ title, className, btnText, btnStyle, icon, iconStyle, containerStyle, placement, children }: DropdownProps) {
  return (
    <div title={title} className={`dropdown ${placement} ${className}`}>
      <button type="button" tabIndex={0} className={btnStyle}>
        <span className={`${icon !== '' && 'hidden md:block'}`}>{btnText}</span>
        {icon !== '' && <Icon icon={icon} className={iconStyle} />}
      </button>
      <div className={`dropdown-base text-base-content border border-base-300 ${containerStyle}`}>{children}</div>
    </div>
  );
}

Dropdown.defaultProps = {
  className: '',
  btnStyle: '',
  iconStyle: 'w-5 h-5 md:ml-2',
  containerStyle: '',
  placement: 'dropdown-end',
};

export default Dropdown;
