import Room from '../../../src/core/room';
import 'jest-extended';

describe('room.getById', () => {
  const room = new Room();

  it('should return a room', async () => {

    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc');

    expect(roomReturned).toEqual({
      id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      name: 'Bedroom',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
    });

  });

  it('should return a room with full scope', async () => {

    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'full');

    expect(roomReturned).toHaveProperty('id');
    expect(roomReturned).toHaveProperty('name');
    expect(roomReturned).toHaveProperty('houseId');

    expect(roomReturned.house).toBeObject();
    expect(roomReturned.house).toHaveProperty('id');
    expect(roomReturned.house).toHaveProperty('name');
    expect(roomReturned.house).toHaveProperty('latitude');
    expect(roomReturned.house).toHaveProperty('longitude');

    // TODO: The state cannot must be null
    if (roomReturned.state !== null) {
      expect(roomReturned.state).toBeObject();
      expect(roomReturned.state).toHaveProperty('id');
      expect(roomReturned.state).toHaveProperty('owner');
      expect(roomReturned.state).toHaveProperty('ownerType');
      expect(roomReturned.state).toHaveProperty('value');
    }

    if (roomReturned.devices !== null) {
      expect(roomReturned.devices).toBeArray();
      roomReturned.devices!.forEach(d => {
        expect(d).toHaveProperty('id');
        expect(d).toHaveProperty('name');
        expect(d).toHaveProperty('type');
        expect(d).toHaveProperty('subType');
        expect(d).toHaveProperty('variable');
        expect(d).toHaveProperty('unit');
        expect(d).toHaveProperty('value');
      });
    }

    if (roomReturned.satellites !== null) {
      expect(roomReturned.satellites).toBeArray();
      roomReturned.satellites!.forEach(s => {
        expect(s).toHaveProperty('id');
        expect(s).toHaveProperty('name');
        expect(s).toHaveProperty('roomId');
      });
    }

  });

  it('should return a room with house', async () => {

    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'withHouse');

    expect(roomReturned).toHaveProperty('id');
    expect(roomReturned).toHaveProperty('name');
    expect(roomReturned).toHaveProperty('houseId');

    expect(roomReturned.house).toBeObject();
    expect(roomReturned.house).toHaveProperty('id');
    expect(roomReturned.house).toHaveProperty('name');
    expect(roomReturned.house).toHaveProperty('latitude');
    expect(roomReturned.house).toHaveProperty('longitude');

  });

  it('should return a room with state', async () => {

    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'withState');

    expect(roomReturned).toHaveProperty('id');
    expect(roomReturned).toHaveProperty('name');
    expect(roomReturned).toHaveProperty('houseId');

    expect(roomReturned.state).toBeObject();
    expect(roomReturned.state).toHaveProperty('id');
    expect(roomReturned.state).toHaveProperty('owner');
    expect(roomReturned.state).toHaveProperty('ownerType');
    expect(roomReturned.state).toHaveProperty('value');

  });

  it('should return a room with devices', async () => {

    const roomReturned = await room.getById('c97ba085-ba97-4a30-bdd3-b7a62f6514dc', 'withDevices');

    expect(roomReturned).toHaveProperty('id');
    expect(roomReturned).toHaveProperty('name');
    expect(roomReturned).toHaveProperty('houseId');

    expect(roomReturned.devices).toBeArray();
    roomReturned.devices!.forEach(d => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('name');
      expect(d).toHaveProperty('type');
      expect(d).toHaveProperty('subType');
      expect(d).toHaveProperty('variable');
      expect(d).toHaveProperty('unit');
      expect(d).toHaveProperty('value');
    });

  });

  it('should return a room with satellites', async () => {

    const roomReturned = await room.getById('007d89b5-452e-4b4c-83a2-e6526e09dbf3', 'withSatellites');

    expect(roomReturned).toHaveProperty('id');
    expect(roomReturned).toHaveProperty('name');
    expect(roomReturned).toHaveProperty('houseId');

    expect(roomReturned.satellites).toBeArray();
    roomReturned.satellites!.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('roomId');
    });

  });

});
