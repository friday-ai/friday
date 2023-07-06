import React from 'react';

import Details from './Details';

import { useGetSatellites } from '../../../services/api/useSatellite';

export default function Satellites() {
  const { isSuccess, data } = useGetSatellites();

  if (!isSuccess) {
    return null;
  }

  return <Details satellite={data[0]} />;
}
