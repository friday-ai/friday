import React from 'react';

interface CheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ label, value, checked, onCheckedChange }: CheckboxProps) {
  return (
    <div className="form-control">
      <label htmlFor={`${label}+${value}+${Math.random()}`} className="cursor-pointer label">
        <input
          id={`${label}+${value}+${Math.random()}`}
          name={label}
          type="checkbox"
          className="checkbox checkbox-primary"
          value={value}
          checked={checked}
          onChange={onCheckedChange}
        />
        <span className="label-text text-base ml-2">{label}</span>
      </label>
    </div>
  );
}

export default Checkbox;
