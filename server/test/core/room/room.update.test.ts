import Room from '../../../src/core/room';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('room.update', () => {
  const room = new Room();

  it('should update a room', async () => {
    const updatedRoom = await room.update('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', {
      id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      name: 'Room update'
    });

    expect(updatedRoom.name).toEqual('Room update');
  });

  it('should not found room to update', async () => {
    expect.assertions(1);

    await room.update('8b513ecf-2c2d-4cc7-aefc-0ac8eba85827', {
      id: '8b513ecf-2c2d-4cc7-aefc-0ac8eba85827'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

});
