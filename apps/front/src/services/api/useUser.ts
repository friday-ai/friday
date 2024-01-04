import { UserAttributes, UserCreationAttributes, UserUpdateAttributes } from '@friday-ai/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useApp from '../app/useApp';

const useUser = () => {
  const { request } = useApp();
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: (user: UserCreationAttributes) => request<UserAttributes>('post', '/api/v1/user', {}, user),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['getUsers'] });
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, user }: { id: string; user: UserUpdateAttributes }) => request<UserAttributes>('patch', `/api/v1/user/${id}`, {}, user),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['getUsers'] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => request<boolean>('delete', `/api/v1/user/${id}`),
    onSuccess: (_res, id) => {
      queryClient.setQueryData(['getUsers'], (prevUsers: UserAttributes[]) => prevUsers.filter((u) => u.id !== id));
    },
  });

  return {
    createUser,
    updateUser,
    deleteUser,
  };
};

export const useGetUserCount = () => {
  const { request } = useApp();
  return useQuery({ queryKey: ['getUserCount'], queryFn: () => request<number>('get', '/api/v1/user/count') });
};

export const useGetUsers = () => {
  const { request } = useApp();
  return useQuery({ queryKey: ['getUsers'], queryFn: () => request<UserAttributes[]>('get', '/api/v1/user') });
};

export default useUser;
