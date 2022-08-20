import { assert, expect } from 'chai';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Room from '../../../src/core/room/room';

let room: Room;

describe('Room.getById', () => {
  before(async () => {
    room = global.FRIDAY.room;
  });

  it('should return a room', async () => {
    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc');

    expect(roomReturned).to.be.an('object');
    assert.deepEqual(roomReturned, {
      id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      name: 'Bedroom',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    });
  });

  it('should return a room with full scope', async () => {
    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'full');

    expect(roomReturned).to.be.an('object');
    expect(roomReturned).to.contains.keys(
      ['id', 'name', 'houseId'],
    );

    expect(roomReturned.house).to.be.an('object');
    expect(roomReturned.house).to.contains.keys(
      ['id', 'name', 'latitude', 'longitude'],
    );

    expect(roomReturned.state).to.be.an('object');
    expect(roomReturned.state).to.contains.keys(
      ['id', 'owner', 'ownerType', 'value'],
    );

    expect(roomReturned.satellites).to.be.an('array');
    roomReturned.satellites!.forEach((s) => {
      expect(s).to.contains.keys(
        ['id', 'name', 'roomId'],
      );
    });

    expect(roomReturned.devices).to.be.an('array');
    roomReturned.devices!.forEach((d) => {
      expect(d).to.contains.keys(
        ['id', 'defaultName', 'defaultManufacturer', 'defaultModel', 'name', 'type', 'manufacturer', 'model', 'pluginSelector', 'viaDevice', 'roomId', 'pluginId'],
      );
    });
  });

  it('should return a room with house', async () => {
    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'withHouse');

    expect(roomReturned).to.be.an('object');
    expect(roomReturned).to.contains.keys(
      ['id', 'name', 'houseId'],
    );

    expect(roomReturned.house).to.be.an('object');
    expect(roomReturned.house).to.contains.keys(
      ['id', 'name', 'latitude', 'longitude'],
    );
  });

  it('should return a room with state', async () => {
    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'withState');

    expect(roomReturned).to.be.an('object');
    expect(roomReturned).to.contains.keys(
      ['id', 'name', 'houseId'],
    );

    expect(roomReturned.state).to.be.an('object');
    expect(roomReturned.state).to.contains.keys(
      ['id', 'owner', 'ownerType', 'value'],
    );
  });

  it('should return a room with devices', async () => {
    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'withDevices');

    expect(roomReturned).to.be.an('object');
    expect(roomReturned).to.contains.keys(
      ['id', 'name', 'houseId'],
    );

    expect(roomReturned.devices).to.be.an('array');
    roomReturned.devices!.forEach((d) => {
      expect(d).to.contains.keys(
        ['id', 'defaultName', 'defaultManufacturer', 'defaultModel', 'name', 'type', 'manufacturer', 'model', 'pluginSelector', 'viaDevice', 'roomId', 'pluginId'],
      );
    });
  });

  it('should return a room with satellites', async () => {
    const roomReturned = await room.getById('007d89b5-452e-4b4c-83a2-e6526e09dbf3', 'withSatellites');

    expect(roomReturned).to.be.an('object');
    expect(roomReturned).to.contains.keys(
      ['id', 'name', 'houseId'],
    );

    expect(roomReturned.satellites).to.be.an('array');
    roomReturned.satellites!.forEach((s) => {
      expect(s).to.contains.keys(
        ['id', 'name', 'roomId'],
      );
    });
  });

  it('should not found a room', async () => {
    const promise = room.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
