import { SatelliteAttributes, SatelliteCreationAttributes } from '@friday-ai/shared';
import { useMutation, useQuery } from 'react-query';

import useApp from '../app/useApp';

const useSatellite = () => {
  const { request } = useApp();
  const createSatellite = useMutation((satellite: SatelliteCreationAttributes) =>
    request<SatelliteAttributes>('post', '/api/v1/satellite', {}, satellite)
  );
  const deleteSatellite = useMutation((id: string) => request<boolean>('delete', '/api/v1/satellite/:id', { id }));
  const stopAllPlugins = useMutation((id: string) => request<{ success: boolean }>('patch', `/api/v1/satellite/stop/plugins/${id}`, {}));
  const restartAllPlugins = useMutation((id: string) => request<{ success: boolean }>('patch', `/api/v1/satellite/restart/plugins/${id}`, {}));

  return {
    createSatellite,
    deleteSatellite,
    stopAllPlugins,
    restartAllPlugins,
  };
};

export const useGetSatellites = () => {
  const { request } = useApp();
  return useQuery('getSatellites', () => request<SatelliteAttributes[]>('get', '/api/v1/satellite', { scope: 'full' }));
};

export const useGetSatelliteById = (id: string) => {
  const { request } = useApp();
  return useQuery('getSatelliteById', () => request<SatelliteAttributes>('get', `api/v1/satellite/${id}`, { scope: 'full' }));
};

export default useSatellite;
