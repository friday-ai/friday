import React from 'react';
import pageNotFound from '../assets/undraw_page_not_found.svg';

const NotFound: React.FunctionComponent = () => {
  return (
    <div className="background flex flex-col content-center justify-center items-center h-full ">
      <img className="self-center" src={pageNotFound} alt="page not found" width={500} height={500} />
      <h1 className="mt-5 text-4xl font-bold">Sorry we couldn&apos;t find this page.</h1>
      <span className="mt-5 text-lg text-gray-400">But dont worry, you can find plenty of other things on homepage.</span>
      <a
        href="/"
        className="mt-5 px-4 py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
      >
        back to homepage
      </a>
    </div>
  );
};

export default NotFound;
