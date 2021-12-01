import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Favicon from '../assets/favicon_black.svg';

import Tooltip from '../components/Generic/Tooltip';
import { useApp } from '../services/AppProvider';

const Login: React.FC = () => {
  const app = useApp();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset error
    setError('');

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: { value: string };
      password: { value: string };
    };

    app.login(
      formElements.email.value,
      formElements.password.value,
      () => {
        navigate('/dashboard', { replace: true });
      },
      (err: string) => {
        setError(err);
      }
    );
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <img className="mx-auto" src={Favicon} alt="Friday icon" width="50" height="50" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">Sign in to your account</h2>
      <form className="w-11/12 sm:w-4/6 md:w-3/6 lg:w-1/3 xl:w-1/5 space-y-6 px-10 py-8 bg-base-100 rounded-btn shadow-lg" onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="form-control">
            <label htmlFor="email-address" className="label">
              <span className="label-text">Email address</span>
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              required
              onChange={() => setError('')}
              className={`input input-bordered ${error === '404' && 'input-error'}`}
            />
            <label htmlFor="email-address" className={`label p-0 pt-1 ${error === '404' ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">Invalid email address</span>
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
              <Tooltip msg="Contact the administrator to reset your password">
                <span className="label-text-alt text-info">Forgot your password ?</span>
              </Tooltip>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              required
              onChange={() => setError('')}
              className={`input input-bordered ${error === '403' && 'input-error'}`}
            />
            <label htmlFor="password" className={`label p-0 pt-1 ${error === '403' ? 'visible' : 'invisible'}`}>
              <span className="label-text-alt text-error">Invalid password</span>
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-block btn-primary flex justify-center relative">
          Sign in
        </button>
      </form>
      <span className="w-11/12 sm:w-4/6 md:w-3/6 lg:w-1/3 xl:w-1/5 text-center py-3 space-x-2 flex justify-center border border-base-300 rounded-btn">
        <span>Don&#39;t have an account ?</span>
        <Tooltip msg="Contact the administrator to create an account for you">
          <Icon icon="ic:baseline-help-outline" className="w-6 h-6 text-info" />
        </Tooltip>
      </span>
    </div>
  );
};

export default Login;
