import { UserAttributes } from '@friday-ai/shared';
import { useQuery } from 'react-query';

import useApp from '../app/useApp';

export const useGetUserCount = () => {
  const { request } = useApp();
  return useQuery('getUserCount', () => request<number>('get', '/api/v1/user/count'));
};

export const usePatchUser = () => {
  const { request } = useApp();
  return useQuery('patchUser', () => request<UserAttributes>('patch', '/api/v1/user/:id'));
};
