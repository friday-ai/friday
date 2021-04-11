import React from 'react';
import underConstruction from '../../assets/undraw_under_construction.svg';

const UnderConstruction: React.FunctionComponent = () => {
  return (
    <div className="geo-background centered-container">
      <img className="self-center" src={underConstruction} alt="under construction" width={500} height={500} />
      <h1 className="mt-5 text-4xl font-bold text-center">Coming soon</h1>
      <span className="mt-5 text-lg text-gray-400 text-center">All contributors of project are currently working hard to build this page.</span>
    </div>
  );
};

export default UnderConstruction;
