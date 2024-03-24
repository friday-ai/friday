import { Navigate, useLocation } from 'react-router-dom';

import LoaderSuspense from '../../../components/Loader/LoaderSuspense';

import { useGetSatellites } from '../../../services/api/useSatellite';

export default function Satellites() {
  const location = useLocation();
  const { isLoading, isSuccess, data } = useGetSatellites();

  if (!isSuccess || data === undefined || data[0] === undefined) {
    return null;
  }

  return (
    <LoaderSuspense isFetching={isLoading}>
      <>
        <Navigate to={`${data[0].id}`} state={{ from: location }} />
      </>
    </LoaderSuspense>
  );
}
