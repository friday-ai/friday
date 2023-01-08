import React from 'react';

interface SwitchProps {
  id: string;
  label: string;
  checked: boolean;
  cb: (state: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ id, label, checked, cb }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    cb(event.target.checked);
  };

  return (
    <div className="form-control">
      <label htmlFor={id} className="cursor-pointer p-0 label pb-2">
        <span className="label-text text-base">{label}</span>
        <input id={id} name={label} type="checkbox" className="toggle toggle-primary" checked={checked} onChange={onChange} />
      </label>
    </div>
  );
};

export default Switch;
