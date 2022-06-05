import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import UndrawSecureLogin from '../../../components/Illustrations/UndrawSecureLogin';
import Favicon from '../../../components/Illustrations/Favicon';
import useForm from '../../../services/hooks/useForm';

interface Auth {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const Account: React.FC<{ submit: (username: string, email: string, password: string) => void }> = ({ submit }) => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(true);
  const { onSubmit, onChange, data, errors } = useForm<Auth>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validations: {
      username: {
        allowEmpty: {
          value: false,
          message: 'The username cannot be empty',
        },
      },
      email: {
        pattern: {
          value: '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$',
          message: 'Email address is invalid',
        },
      },
      password: {
        allowEmpty: {
          value: false,
          message: 'The password cannot be empty',
        },
        custom: {
          isValid: (value) => value.length > 9,
          message: 'The password needs to be at least 6 characters long.',
        },
      },
      passwordRepeat: {
        custom: {
          isValid: (value): boolean => value === data.password,
          message: 'Passwords must be identical',
        },
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const res = await onSubmit(e);
    if (res) {
      submit(data.username, data.email, data.password);
      navigate('/signup/settings');
    }
  };

  return (
    <form className="card-base flex flex-col items-center p-10 h-4/5 w-4/5 xl:w-3/5 overflow-auto" onSubmit={handleSubmit}>
      <div className="mb-5 flex-none">
        <Favicon width="60" height="60" />
      </div>

      <span className="text-xl mb-5 flex-none">Account informations</span>

      <div className="flex flex-row grow w-full justify-evenly md:space-x-20">
        <div className="hidden sm:block">
          <UndrawSecureLogin width="auto" height="auto" />
        </div>
        <div className="flex flex-col space-y-4 basis-full sm:basis-1/2 md:basis-11/12 lg:basis-6/12">
          <div className="form-control">
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className={`input input-bordered ${errors.username && 'input-error'}`}
              value={data.username}
              onChange={onChange('username')}
            />
            <label htmlFor="username" className={`label p-0 pt-1 ${errors.username ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.username}</span>
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email address</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@email.com"
              className={`input input-bordered ${errors.email && 'input-error'}`}
              value={data.email}
              onChange={onChange('email')}
            />
            <label htmlFor="email" className={`label p-0 pt-1 ${errors.email ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.email}</span>
            </label>
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={`${passwordShown ? 'password' : 'text'}`}
                placeholder="Password"
                className={`input input-bordered ${errors.password && 'input-error'} w-full`}
                value={data.password}
                onChange={onChange('password')}
              />
              <button
                type="button"
                className="btn btn-ghost btn-sm m-2 absolute inset-y-0 right-0 flex items-center p-0"
                onClick={() => setPasswordShown(!passwordShown)}
              >
                {!passwordShown && <Icon icon="mdi:eye-off-outline" className="w-5 h-5 mx-2" />}
                {passwordShown && <Icon icon="mdi:eye-outline" className="w-5 h-5 mx-2" />}
              </button>
            </div>
            <label htmlFor="password" className={`label p-0 pt-1 ${errors.password ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.password}</span>
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="passwordRepeat" className="label">
              <span className="label-text">Repeat password</span>
            </label>
            <input
              id="passwordRepeat"
              name="passwordRepeat"
              type={`${passwordShown ? 'password' : 'text'}`}
              placeholder="Repeat password"
              className={`input input-bordered ${errors.passwordRepeat && 'input-error'}`}
              value={data.passwordRepeat}
              onChange={onChange('passwordRepeat')}
            />
            <label htmlFor="password" className={`label p-0 pt-1 ${errors.passwordRepeat ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">{errors.passwordRepeat}</span>
            </label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-sm self-end flex-none mt-5">
        Next step
      </button>
    </form>
  );
};

export default Account;
