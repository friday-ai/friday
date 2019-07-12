import { Room } from '../../../src/core/friday';

describe('room.update', () => {
  const room = new Room();

  it('should update a room', async () => {
    const updatedRoom = await room.update(    {
      id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      name: 'Room update'
    });

    expect(updatedRoom.name).toEqual('Room update');
  });

  it('should not found room to update', async () => {

    await room.update({
      id: '8b513ecf-2c2d-4cc7-aefc-0ac8eba85827'
    })
      .catch((err) => {
        expect(`${err}`).toContain('Room not found');
      });

  });

});
