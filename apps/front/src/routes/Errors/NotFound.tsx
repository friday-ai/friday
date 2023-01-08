import React from 'react';
import { Link } from 'react-router-dom';
import UndrawNotFound from '../../components/Illustrations/UndrawNotFound';

function NotFound() {
  return (
    <div className="geo-background centered-container">
      <UndrawNotFound className="self-center" width="500" height="300" />
      <h1 className="mt-3 text-4xl font-bold text-center text-primary">Sorry we couldn&apos;t find this page.</h1>
      <span className="mt-3 text-lg text-center">But dont worry, you can find plenty of other things on homepage.</span>
      <Link to="/dashboard" className="btn btn-primary mt-2">
        back to homepage
      </Link>
    </div>
  );
}

export default NotFound;
