import React, { useEffect, useState } from 'react';

import AnimationLayout from '../App/AnimationLayout';
import LoaderLayout from './LoaderLayout';

interface Props {
  isFetching: boolean;
  children: React.ReactElement;
}

export default function LoaderSuspense({ isFetching, children }: Props) {
  const [minimumLoadingTimeExpired, setMinimumLoadingTimeExpired] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMinimumLoadingTimeExpired(true);
    }, 1000);
  }, []);

  if (!minimumLoadingTimeExpired && isFetching) {
    return <div />;
  }

  if (minimumLoadingTimeExpired && isFetching) {
    return (
      <AnimationLayout>
        <LoaderLayout />
      </AnimationLayout>
    );
  }

  return children;
}
