import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';

interface CheckboxType {
  label: string;
  value: string;
  checked: boolean;
}

interface CheckboxGroupProps {
  checkboxes: CheckboxType[];
  onChange: (values: string[]) => void;
  hasCheckAll?: boolean;
  canUncheckAll?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ checkboxes, onChange, hasCheckAll, canUncheckAll }) => {
  const [values, setValues] = useState(checkboxes);

  useEffect(() => {
    const result = values.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
    onChange(result);
  }, [onChange, values]);

  const onCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    // If user uncheck this box and cannot it be done, return without any changes
    if (!canUncheckAll && !event.target.checked) return;

    const list = [...values];
    list.forEach((checkbox) => {
      checkbox.checked = event.target.checked;
    });

    setValues(list);
  };

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const list = [...values];
    list.forEach((checkbox) => {
      if (checkbox.value === event.target.value) checkbox.checked = event.target.checked;
    });

    // If user has uncheck all box and cannot it be done, put all on checked
    if (!canUncheckAll && list.every((value) => !value.checked)) {
      list.forEach((checkbox) => {
        checkbox.checked = true;
      });
    }

    setValues(list);
  };

  return (
    <>
      {hasCheckAll && <Checkbox label="All" value="all" checked={values.every((value) => value.checked)} onCheckedChange={onCheckAll} />}
      {values.map((checkbox) => (
        <Checkbox key={JSON.stringify(checkbox)} value={checkbox.value} label={checkbox.label} checked={checkbox.checked} onCheckedChange={onCheck} />
      ))}
    </>
  );
};

CheckboxGroup.defaultProps = {
  hasCheckAll: false,
  canUncheckAll: true,
};

export default CheckboxGroup;
