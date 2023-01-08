import { assert, expect } from 'chai';
import Room from '../../../src/core/room/room';

let room: Room;

describe('Room.listAll', () => {
  before(async () => {
    room = global.FRIDAY.room;
  });

  it('should return all rooms', async () => {
    const rooms = await room.listAll();

    expect(rooms).to.be.an('array');
    assert.deepEqual(rooms, [{
      id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      name: 'Bedroom',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    },
    {
      id: '6d619c11-5ff8-4489-93cf-348cf28c335b',
      name: 'Living room',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    },
    {
      id: '406cd39b-eb55-433a-a36e-408c10869f58',
      name: 'Kitchen',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    },
    {
      id: '007d89b5-452e-4b4c-83a2-e6526e09dbf3',
      name: 'Dining room',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    },
    ]);
  });

  it('should return all rooms with full scope', async () => {
    const rooms = await room.listAll({ scope: 'full' });

    expect(rooms).to.be.an('array');
    rooms.forEach((r) => {
      expect(r).to.contains.keys(
        ['id', 'name', 'houseId'],
      );

      expect(r.state).to.be.an('object');
      expect(r.state).to.contains.keys(
        ['id', 'owner', 'ownerType', 'value'],
      );

      expect(r.satellites).to.be.an('array');
      r.satellites!.forEach((s) => {
        expect(s).to.contains.keys(
          ['id', 'name', 'roomId'],
        );
      });

      expect(r.devices).to.be.an('array');
      r.devices!.forEach((d) => {
        expect(d).to.contains.keys(
          ['id', 'defaultName', 'defaultManufacturer', 'defaultModel', 'name', 'type', 'manufacturer', 'model', 'pluginSelector', 'viaDevice', 'roomId', 'pluginId'],
        );
      });
    });
  });

  it('should return all rooms with house', async () => {
    const rooms = await room.listAll({ scope: 'withHouse' });

    expect(rooms).to.be.an('array');
    rooms.forEach((r) => {
      expect(r).to.contains.keys(
        ['id', 'name', 'houseId'],
      );

      expect(r.house).to.be.an('object');
      expect(r.house).to.contains.keys(
        ['id', 'name', 'latitude', 'longitude'],
      );
    });
  });

  it('should return all rooms with state', async () => {
    const rooms = await room.listAll({ scope: 'withState' });

    expect(rooms).to.be.an('array');
    rooms.forEach((r) => {
      expect(r).to.contains.keys(
        ['id', 'name', 'houseId'],
      );

      expect(r.state).to.be.an('object');
      expect(r.state).to.contains.keys(
        ['id', 'owner', 'ownerType', 'value'],
      );
    });
  });

  it('should return all rooms with devices', async () => {
    const rooms = await room.listAll({ scope: 'withDevices' });

    expect(rooms).to.be.an('array');
    rooms.forEach((r) => {
      expect(r).to.contains.keys(
        ['id', 'name', 'houseId'],
      );

      expect(r.devices).to.be.an('array');
      r.devices!.forEach((d) => {
        expect(d).to.contains.keys(
          ['id', 'defaultName', 'defaultManufacturer', 'defaultModel', 'name', 'type', 'manufacturer', 'model', 'pluginSelector', 'viaDevice', 'roomId', 'pluginId'],
        );
      });
    });
  });

  it('should return all rooms with satellites', async () => {
    const rooms = await room.listAll({ scope: 'withSatellites' });

    expect(rooms).to.be.an('array');
    rooms.forEach((r) => {
      expect(r).to.contains.keys(
        ['id', 'name', 'houseId'],
      );

      expect(r.satellites).to.be.an('array');
      r.satellites!.forEach((s) => {
        expect(s).to.contains.keys(
          ['id', 'name', 'roomId'],
        );
      });
    });
  });
});
