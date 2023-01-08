import React from 'react';

interface TooltipProps {
  children: React.ReactElement;
  msg: string;
  condition?: boolean;
  placement?: '' | 'tooltip-bottom' | 'tooltip-left' | 'tooltip-right';
  type?: '' | 'tooltip-primary' | 'tooltip-secondary' | 'tooltip-accent' | 'tooltip-info' | 'tooltip-success' | 'tooltip-warning' | 'tooltip-error';
}

function Tooltip({ children, msg, condition, placement, type }: TooltipProps) {
  return (
    <div data-tip={msg} className={`tooltip ${type} ${placement} ${!condition && 'tooltip-hidden'} items-start`}>
      {children}
    </div>
  );
}

Tooltip.defaultProps = {
  condition: true,
  placement: '',
  type: '',
};

export default Tooltip;
