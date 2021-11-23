import React from 'react';
import { Link } from 'react-router-dom';
import UndrawUnauthorized from '../../components/Illustrations/UndrawUnauthorized';

const Unauthorized: React.FC = () => {
  return (
    <div className="geo-background centered-container">
      <UndrawUnauthorized className="self-center" width="500" height="550" />
      <h1 className="mt-3 text-4xl font-bold text-center text-primary">Missing permissions</h1>
      <span className="mt-3 text-lg text-center">Do not worry though, there is always a way to go back homepage.</span>
      <Link to="/" className="btn btn-primary mt-2">
        back to homepage
      </Link>
    </div>
  );
};

export default Unauthorized;
