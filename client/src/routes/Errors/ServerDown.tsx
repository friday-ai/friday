import React from 'react';
import UndrawServerDown from '../../components/Illustrations/UndrawServerDown';

const ServerDown: React.FC = () => {
  return (
    <div className="geo-background centered-container">
      <UndrawServerDown className="self-center" width="500" height="550" />
      <h1 className="mt-3 text-4xl font-bold text-center text-primary">Your server is feeling a little down</h1>
      <span className="mt-3 text-lg text-center">Please restart your machine and try again in a few moments</span>
    </div>
  );
};

export default ServerDown;
