import { expect, assert } from 'chai';
import Room from '../../../src/core/room';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('Room.update', () => {
  const room = new Room();

  it('should update a room', async () => {
    const updatedRoom = await room.update('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', {
      id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      name: 'Room update'
    });

    expect(updatedRoom.name).to.equal('Room update');
  });

  it('should not found room to update', async () => {
    const promise = room.update('8b513ecf-2c2d-4cc7-aefc-0ac8eba85827', {
      id: '8b513ecf-2c2d-4cc7-aefc-0ac8eba85827'
    });

    await assert.isRejected(promise, NotFoundError);
  });

});
