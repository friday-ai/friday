import React from 'react';
import { Link } from 'react-router-dom';
import pageNotFound from '../../assets/undraw_page_not_found.svg';

const NotFound: React.FunctionComponent = () => {
  return (
    <div className="geo-background centered-container">
      <img className="self-center" src={pageNotFound} alt="page not found" width={500} height={500} />
      <h1 className="mt-5 text-4xl font-bold text-center">Sorry we couldn&apos;t find this page.</h1>
      <span className="mt-5 text-lg text-gray-400 text-center">But dont worry, you can find plenty of other things on homepage.</span>
      <Link
        to="/"
        className="btn-blue"
      >
        back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
