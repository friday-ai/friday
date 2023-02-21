import React from 'react';

interface RadioProps {
  label: string;
  name: string;
  alt?: string;
  isSelected: boolean;
  value: string;
  onChange: (value: string) => void;
}

function Radio({ label, name, alt, isSelected, value, onChange }: RadioProps) {
  return (
    <div className="form-control">
      <label htmlFor={`${label}+${value}+${name}`} className="cursor-pointer label justify-start gap-3">
        <input
          id={`${label}+${value}+${name}`}
          name={name}
          type="radio"
          className="radio"
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
        />
        <span className="label-text text-base ml-2 flex flex-col">
          {label}
          {alt !== '' && <span className="label-text-alt">{alt}</span>}
        </span>
      </label>
    </div>
  );
}

Radio.defaultProps = {
  alt: '',
};

interface RadioType {
  label: string;
  alt?: string;
  value: string;
}

interface RadioGroupProps {
  radios: RadioType[];
  name: string;
  selected: string;
  onChange: (values: string) => void;
}

function RadioGroup({ radios, name, selected, onChange }: RadioGroupProps) {
  return (
    <>
      {radios.map((radio) => (
        <Radio
          key={JSON.stringify(radio)}
          label={radio.label}
          alt={radio.alt}
          name={name}
          isSelected={selected === radio.value}
          value={radio.value}
          onChange={onChange}
        />
      ))}
    </>
  );
}

export { RadioGroup, Radio };
