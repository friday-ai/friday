import React from 'react';
import { Link } from 'react-router-dom';
import unauthorized from '../../assets/undraw_unauthorized.svg';

const Unauthorized: React.FunctionComponent = () => {
  return (
    <div className="background flex flex-col content-center justify-center items-center h-full ">
      <img className="self-center" src={unauthorized} alt="unauthorized" width={500} height={500} />
      <h1 className="mt-5 text-4xl font-bold">Missing permissions</h1>
      <span className="mt-5 text-lg text-gray-400">Do not worry though, there is always a way to go back homepage.</span>
      <Link
        to="/"
        className="mt-5 px-4 py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
      >
        back to homepage
      </Link>
    </div>
  );
};

export default Unauthorized;
