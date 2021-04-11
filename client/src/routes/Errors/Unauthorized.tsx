import React from 'react';
import { Link } from 'react-router-dom';
import unauthorized from '../../assets/undraw_unauthorized.svg';

const Unauthorized: React.FunctionComponent = () => {
  return (
    <div className="geo-background centered-container">
      <img className="self-center" src={unauthorized} alt="unauthorized" width={500} height={500} />
      <h1 className="mt-5 text-4xl font-bold text-center">Missing permissions</h1>
      <span className="mt-5 text-lg text-gray-400 text-center">Do not worry though, there is always a way to go back homepage.</span>
      <Link
        to="/"
        className="btn-blue"
      >
        back to homepage
      </Link>
    </div>
  );
};

export default Unauthorized;
