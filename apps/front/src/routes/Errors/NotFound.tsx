import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="">
      <h1 className="">Sorry we couldn&apos;t find this page.</h1>
      <span className="">But dont worry, you can find plenty of other things on homepage.</span>
      <Link to="/dashboard/devices" className="">
        back to homepage
      </Link>
    </div>
  );
}
