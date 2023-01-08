import React from 'react';

interface PluginHeaderProps {
  logo: string;
  badges?: { title: string; value: string }[];
  action?: { text: string };
  cb?: () => void;
}

const PluginHeader: React.FC<PluginHeaderProps> = ({ logo, badges, action, cb }) => {
  return (
    <div className="flex flex-row gap-3">
      <img src={logo} alt="" className="h-full w-[30%]" />
      <div className="flex flex-col gap-3 justify-center">
        {badges &&
          badges.map((badge: { title: string; value: string }) => (
            <span key={`${badge.title}+${badge.value}`}>
              {badge.title}: <span className="text-secondary/80">{badge.value}</span>
            </span>
          ))}
        {action && (
          <div>
            <button type="button" className="btn btn-sm btn-outline" onClick={cb}>
              {action.text}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

PluginHeader.defaultProps = {
  badges: undefined,
  action: undefined,
  cb: () => null,
};

export default PluginHeader;
