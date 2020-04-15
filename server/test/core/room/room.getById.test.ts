import { expect, assert } from 'chai';
import Room from '../../../src/core/room';

describe('Room.getById', () => {
  const room = new Room();

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

    expect(roomReturned).to.have.property('id');
    expect(roomReturned).to.have.property('name');
    expect(roomReturned).to.have.property('houseId');

    expect(roomReturned.house).to.be.an('object');
    expect(roomReturned.house).to.have.property('id');
    expect(roomReturned.house).to.have.property('name');
    expect(roomReturned.house).to.have.property('latitude');
    expect(roomReturned.house).to.have.property('longitude');

    // TODO: The state cannot must be null
    if (roomReturned.state !== null) {
      expect(roomReturned.state).to.be.an('object');
      expect(roomReturned.state).to.have.property('id');
      expect(roomReturned.state).to.have.property('owner');
      expect(roomReturned.state).to.have.property('ownerType');
      expect(roomReturned.state).to.have.property('value');
    }

    if (roomReturned.devices !== null) {
      expect(roomReturned.devices).to.be.an('array');
      roomReturned.devices!.forEach((d) => {
        expect(d).to.have.property('id');
        expect(d).to.have.property('name');
        expect(d).to.have.property('type');
        expect(d).to.have.property('subType');
        expect(d).to.have.property('variable');
        expect(d).to.have.property('unit');
        expect(d).to.have.property('value');
      });
    }

    if (roomReturned.satellites !== null) {
      expect(roomReturned.satellites).to.be.an('array');
      roomReturned.satellites!.forEach((s) => {
        expect(s).to.have.property('id');
        expect(s).to.have.property('name');
        expect(s).to.have.property('roomId');
      });
    }
  });

  it('should return a room with house', async () => {
    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'withHouse');

    expect(roomReturned).to.have.property('id');
    expect(roomReturned).to.have.property('name');
    expect(roomReturned).to.have.property('houseId');

    expect(roomReturned.house).to.be.an('object');
    expect(roomReturned.house).to.have.property('id');
    expect(roomReturned.house).to.have.property('name');
    expect(roomReturned.house).to.have.property('latitude');
    expect(roomReturned.house).to.have.property('longitude');
  });

  it('should return a room with state', async () => {
    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'withState');

    expect(roomReturned).to.have.property('id');
    expect(roomReturned).to.have.property('name');
    expect(roomReturned).to.have.property('houseId');

    expect(roomReturned.state).to.be.an('object');
    expect(roomReturned.state).to.have.property('id');
    expect(roomReturned.state).to.have.property('owner');
    expect(roomReturned.state).to.have.property('ownerType');
    expect(roomReturned.state).to.have.property('value');
  });

  it('should return a room with devices', async () => {
    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'withDevices');

    expect(roomReturned).to.have.property('id');
    expect(roomReturned).to.have.property('name');
    expect(roomReturned).to.have.property('houseId');

    expect(roomReturned.devices).to.be.an('array');
    roomReturned.devices!.forEach((d) => {
      expect(d).to.have.property('id');
      expect(d).to.have.property('name');
      expect(d).to.have.property('type');
      expect(d).to.have.property('subType');
      expect(d).to.have.property('variable');
      expect(d).to.have.property('unit');
      expect(d).to.have.property('value');
    });
  });

  it('should return a room with satellites', async () => {
    const roomReturned = await room.getById('007d89b5-452e-4b4c-83a2-e6526e09dbf3', 'withSatellites');

    expect(roomReturned).to.have.property('id');
    expect(roomReturned).to.have.property('name');
    expect(roomReturned).to.have.property('houseId');

    expect(roomReturned.satellites).to.be.an('array');
    roomReturned.satellites!.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('name');
      expect(s).to.have.property('roomId');
    });
  });
});
