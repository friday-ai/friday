import { HouseAttributes, HouseCreationAttributes } from '@friday-ai/shared';
import { useMutation } from 'react-query';

import useApp from '../app/useApp';

const useHouse = () => {
  const { request } = useApp();
  const createHouse = useMutation((house: HouseCreationAttributes) => request<HouseAttributes>('post', '/api/v1/house', {}, house));
  const deleteHouse = useMutation((id: string) => request<boolean>('delete', '/api/v1/house/:id', { id }));

  return {
    createHouse,
    deleteHouse,
  };
};

export default useHouse;
