import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  cb: (event: React.ChangeEvent<HTMLInputElement>, state: boolean) => void;
  textStyle: string;
  checkboxStyle: string;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({ id, label, checked, cb, textStyle, checkboxStyle }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    cb(event, event.target.checked);
  };

  return (
    <label htmlFor={id} className="flex items-center space-x-2 mr-2">
      <input
        id={id}
        name={label}
        type="checkbox"
        checked={checked}
        className={`form-tick h-5 w-5 rounded-md checked:border-transparent focus:ring-transparent ${checkboxStyle}`}
        onChange={onChange}
      />
      <span className={textStyle}>{label}</span>
    </label>
  );
};

export default Checkbox;
