import React from 'react';

interface SwitchProps {
  id: string;
  label: string;
  checked: boolean;
  cb: (state: boolean) => void;
  textStyle: string;
  switchStyle: string;
}

const Switch: React.FunctionComponent<SwitchProps> = ({ id, label, checked, cb, textStyle, switchStyle }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    cb(event.target.checked);
  };

  return (
    <label htmlFor={id} className="relative flex justify-between items-center group mb-3">
      <span className={textStyle}>{label}</span>
      <input
        id={id}
        name={label}
        type="checkbox"
        className="switch focus:outline-none focus:ring-transparent focus:ring-offset-transparent absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`w-11 h-6 flex items-center flex-shrink-0 ml-4 p-1 rounded-full duration-300 ease-in-out after:w-4 after:h-4 after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5 group-hover:after:translate-x-1 ${switchStyle}`}
      />
    </label>
  );
};

export default Switch;
