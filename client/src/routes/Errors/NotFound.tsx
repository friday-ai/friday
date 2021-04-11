import React from 'react';
import { Link } from 'react-router-dom';
import pageNotFound from '../../assets/undraw_page_not_found.svg';

const NotFound: React.FunctionComponent = () => {
  return (
    <div className="background flex flex-col content-center justify-center items-center h-full">
      <img className="self-center" src={pageNotFound} alt="page not found" width={500} height={500} />
      <h1 className="mt-5 text-4xl font-bold">Sorry we couldn&apos;t find this page.</h1>
      <span className="mt-5 text-lg text-gray-400">But dont worry, you can find plenty of other things on homepage.</span>
      <Link
        to="/"
        className="mt-5 px-4 py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-500 active:bg-blue-500 hover:bg-opacity-80"
      >
        back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
