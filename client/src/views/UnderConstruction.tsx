import React from 'react';
import underConstruction from '../assets/undraw_under_construction.svg';

const UnderConstruction = (): React.ReactElement => {
  return (
    <div className="background flex flex-col content-center justify-center items-center h-full ">
      <img className="self-center" src={underConstruction} alt="under construction" width={500} height={500} />
      <h1 className="mt-5 text-4xl font-bold">Coming soon</h1>
      <span className="mt-5 text-lg text-gray-400">All contributors of project are currently working hard to build this page.</span>
    </div>
  );
};

export default UnderConstruction;
