import { ChangeEvent, FormEvent, useState } from 'react';

interface Validation<T> {
  required?: {
    value: boolean;
    message?: string;
  };
  allowEmpty?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: T) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T> = {
  [key in keyof T]: Validation<T[key]>;
};

const useForm = <T>(options?: { validations?: Validations<T>; initialValues?: Partial<T>; onSubmit?: () => void }) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const onChange =
    <S>(key: keyof T, sanitizeFn?: (value: string) => S) =>
    (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
      setData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };

  const onUpdate = (key: keyof T, value: T[typeof key]) => {
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const setCustomErrors = (key: keyof T, value: string) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement> | null): Promise<boolean> => {
    e?.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<T> = {};

      const keys = Object.keys(validations) as Array<keyof T>;
      keys.forEach((key) => {
        const value = data[key];

        const validation = validations[key];

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (typeof value === 'string' && pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const allowEmpty = validation?.allowEmpty;
        if (allowEmpty?.value === false) {
          if ((typeof value === 'string' || Array.isArray(value)) && value.length === 0) {
            valid = false;
            newErrors[key] = allowEmpty.message;
          }
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      });

      if (!valid) {
        setErrors(newErrors);
        return valid;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }

    return true;
  };

  return {
    data,
    onChange,
    onUpdate,
    onSubmit,
    errors,
    setCustomErrors,
  };
};

export default useForm;
