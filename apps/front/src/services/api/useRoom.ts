import { RoomAttributes, RoomCreationAttributes } from '@friday-ai/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useApp from '../app/useApp';

const useRoom = () => {
  const { request } = useApp();
  const queryClient = useQueryClient();

  const createRoom = useMutation({
    mutationFn: (room: RoomCreationAttributes) => request<RoomAttributes>('post', '/api/v1/room', {}, room),
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: ['getHouses'] });
    },
  });

  const deleteRoom = useMutation({ mutationFn: (id: string) => request<boolean>('delete', '/api/v1/room/:id', { id }) });

  return {
    createRoom,
    deleteRoom,
  };
};

export default useRoom;
