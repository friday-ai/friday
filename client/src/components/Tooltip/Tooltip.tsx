import React from 'react';
import { useTheme } from '../../services/theme/ThemeProvider';

interface TooltipProps {
  children: React.ReactElement;
  msg: string;
  condition?: boolean;
  placement?: 'top' | 'bottom';
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({ children, msg, condition, placement }) => {
  const { theme } = useTheme();
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      {condition && (
        <div className={`absolute flex flex-col items-center hidden group-hover:flex ${placement !== 'bottom' ? 'bottom-0 mb-8' : 'top-0 mt-8'}`}>
          {placement === 'bottom' && <div className={`w-3 h-3 -mb-2 rotate-45 ${theme.tooltip.arrow}`} />}
          <span
            className={`relative text-center z-10 p-2 text-sm leading-none whitespace-no-wrap rounded-lg shadow-lg ${theme.tooltip.style}
            ${msg.length > 20 ? 'w-48' : 'w-32'}`}
          >
            {msg}
          </span>
          {placement === 'top' && <div className={`w-3 h-3 -mt-2 rotate-45 ${theme.tooltip.arrow}`} />}
        </div>
      )}
    </div>
  );
};

Tooltip.defaultProps = {
  condition: true,
  placement: 'bottom',
};

export default Tooltip;
