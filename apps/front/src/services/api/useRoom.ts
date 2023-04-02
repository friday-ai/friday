import { RoomAttributes, RoomCreationAttributes } from '@friday-ai/shared';
import { useMutation } from 'react-query';

import useApp from '../app/useApp';

const useRoom = () => {
  const { request } = useApp();
  const createRoom = useMutation((room: RoomCreationAttributes) => request<RoomAttributes>('post', '/api/v1/room', {}, room));
  const deleteRoom = useMutation((id: string) => request<boolean>('delete', '/api/v1/room/:id', { id }));

  return {
    createRoom,
    deleteRoom,
  };
};

export default useRoom;
