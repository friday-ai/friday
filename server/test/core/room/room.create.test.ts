import { expect, assert } from 'chai';
import Room from '../../../src/core/room/room';
import { DatabaseValidationError, DatabaseUniqueConstraintError } from '../../../src/utils/decorators/error';

describe('Room.create', () => {
  const room = new Room();

  it('should create a room', async () => {
    const createdRoom = await room.create({
      name: 'A room test',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    });

    expect(createdRoom).to.have.property('id');
    expect(createdRoom).to.have.property('name');
    expect(createdRoom).to.have.property('houseId');
  });

  it('should not create a room with an existing name', async () => {
    const promise = room.create({
      name: 'Bedroom',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create a room with an empty name', async () => {
    const promise = room.create({
      name: '',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a room  with an empty house', async () => {
    const promise = room.create({
      name: 'A room test',
      houseId: '',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
