import { Room } from '../../../src/core/friday';
import 'jest-extended';

describe('room.getAll', () => {
  const room = new Room();

  it('should return all rooms', async () => {

    const rooms = await room.getAll();

    expect(rooms).toEqual([
      {
        id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        name: 'Bedroom',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
      },
      {
        id: '6d619c11-5ff8-4489-93cf-348cf28c335b',
        name: 'Living room',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
      },
      {
        id: '406cd39b-eb55-433a-a36e-408c10869f58',
        name: 'Kitchen',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
      },
      {
        id: '007d89b5-452e-4b4c-83a2-e6526e09dbf3',
        name: 'Dining room',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
      }
    ]);

  });

  it('should return all rooms with full scope', async () => {

    const rooms = await room.getAll({ scope: 'full' });

    expect(rooms).toBeArray();
    rooms.forEach(r => {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('name');
      expect(r).toHaveProperty('houseId');

      expect(r.house).toBeObject();
      expect(r.house).toHaveProperty('id');
      expect(r.house).toHaveProperty('name');
      expect(r.house).toHaveProperty('latitude');
      expect(r.house).toHaveProperty('longitude');

      // TODO: The state cannot must be null
      if (r.state !== null) {
        expect(r.state).toBeObject();
        expect(r.state).toHaveProperty('id');
        expect(r.state).toHaveProperty('owner');
        expect(r.state).toHaveProperty('ownerType');
        expect(r.state).toHaveProperty('value');
      }

      if (r.devices !== null) {
        expect(r.devices).toBeArray();
        r.devices!.forEach(d => {
          expect(d).toHaveProperty('id');
          expect(d).toHaveProperty('name');
          expect(d).toHaveProperty('type');
          expect(d).toHaveProperty('subType');
          expect(d).toHaveProperty('variable');
          expect(d).toHaveProperty('unit');
          expect(d).toHaveProperty('value');
        });
      }

      if (r.satellites !== null) {
        expect(r.satellites).toBeArray();
        r.satellites!.forEach(s => {
          expect(s).toHaveProperty('id');
          expect(s).toHaveProperty('name');
          expect(s).toHaveProperty('roomId');
        });
      }

    });

  });

  it('should return all rooms with house', async () => {

    const rooms = await room.getAll({ scope: 'withHouse' });

    expect(rooms).toBeArray();
    rooms.forEach(r => {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('name');
      expect(r).toHaveProperty('houseId');

      expect(r.house).toHaveProperty('id');
      expect(r.house).toHaveProperty('name');
      expect(r.house).toHaveProperty('latitude');
      expect(r.house).toHaveProperty('longitude');

    });

  });

  it('should return all rooms with state', async () => {

    const rooms = await room.getAll({ scope: 'withState' });

    expect(rooms).toBeArray();
    rooms.forEach(r => {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('name');
      expect(r).toHaveProperty('houseId');

      // TODO: The state cannot must be null
      if (r.state !== null) {
        expect(r.state).toBeObject();
        expect(r.state).toHaveProperty('id');
        expect(r.state).toHaveProperty('owner');
        expect(r.state).toHaveProperty('ownerType');
        expect(r.state).toHaveProperty('value');
      }
    });

  });

  it('should return all rooms with devices', async () => {

    const rooms = await room.getAll({ scope: 'withDevices' });

    expect(rooms).toBeArray();
    rooms.forEach(r => {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('name');
      expect(r).toHaveProperty('houseId');

      if (r.devices !== null) {
        expect(r.devices).toBeArray();
        r.devices!.forEach(d => {
          expect(d).toHaveProperty('id');
          expect(d).toHaveProperty('name');
          expect(d).toHaveProperty('type');
          expect(d).toHaveProperty('subType');
          expect(d).toHaveProperty('variable');
          expect(d).toHaveProperty('unit');
          expect(d).toHaveProperty('value');
        });
      }

    });

  });

  it('should return all rooms with satellites', async () => {

    const rooms = await room.getAll({ scope: 'withSatellites' });

    expect(rooms).toBeArray();
    rooms.forEach(r => {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('name');
      expect(r).toHaveProperty('houseId');

      if (r.satellites !== null) {
        expect(r.satellites).toBeArray();
        r.satellites!.forEach(s => {
          expect(s).toHaveProperty('id');
          expect(s).toHaveProperty('name');
          expect(s).toHaveProperty('roomId');
        });
      }

    });

  });

});
