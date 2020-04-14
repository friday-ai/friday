import { expect, assert } from 'chai';
import Room from '../../../src/core/room';

describe('Room.getAll', () => {
  const room = new Room();

  it('should return all rooms', async () => {

    const rooms = await room.getAll();

    expect(rooms).to.be.an('array');
    assert.deepEqual(rooms, [{
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

    expect(rooms).to.be.an('array');
    rooms.forEach(r => {
      expect(r).to.have.property('id');
      expect(r).to.have.property('name');
      expect(r).to.have.property('houseId');

      expect(r.house).to.be.an('object');
      expect(r.house).to.have.property('id');
      expect(r.house).to.have.property('name');
      expect(r.house).to.have.property('latitude');
      expect(r.house).to.have.property('longitude');

      // TODO: The state cannot must be null
      if (r.state !== null) {
        expect(r.state).to.be.an('object');
        expect(r.state).to.have.property('id');
        expect(r.state).to.have.property('owner');
        expect(r.state).to.have.property('ownerType');
        expect(r.state).to.have.property('value');
      }

      if (r.devices !== null) {
        expect(r.devices).to.be.an('array');
        r.devices!.forEach(d => {
          expect(d).to.have.property('id');
          expect(d).to.have.property('name');
          expect(d).to.have.property('type');
          expect(d).to.have.property('subType');
          expect(d).to.have.property('variable');
          expect(d).to.have.property('unit');
          expect(d).to.have.property('value');
        });
      }

      if (r.satellites !== null) {
        expect(r.satellites).to.be.an('array');
        r.satellites!.forEach(s => {
          expect(s).to.have.property('id');
          expect(s).to.have.property('name');
          expect(s).to.have.property('roomId');
        });
      }

    });

  });

  it('should return all rooms with house', async () => {

    const rooms = await room.getAll({ scope: 'withHouse' });

    expect(rooms).to.be.an('array');
    rooms.forEach(r => {
      expect(r).to.have.property('id');
      expect(r).to.have.property('name');
      expect(r).to.have.property('houseId');

      expect(r.house).to.have.property('id');
      expect(r.house).to.have.property('name');
      expect(r.house).to.have.property('latitude');
      expect(r.house).to.have.property('longitude');

    });

  });

  it('should return all rooms with state', async () => {

    const rooms = await room.getAll({ scope: 'withState' });

    expect(rooms).to.be.an('array');
    rooms.forEach(r => {
      expect(r).to.have.property('id');
      expect(r).to.have.property('name');
      expect(r).to.have.property('houseId');

      // TODO: The state cannot must be null
      if (r.state !== null) {
        expect(r.state).to.be.an('object');
        expect(r.state).to.have.property('id');
        expect(r.state).to.have.property('owner');
        expect(r.state).to.have.property('ownerType');
        expect(r.state).to.have.property('value');
      }
    });

  });

  it('should return all rooms with devices', async () => {

    const rooms = await room.getAll({ scope: 'withDevices' });

    expect(rooms).to.be.an('array');
    rooms.forEach(r => {
      expect(r).to.have.property('id');
      expect(r).to.have.property('name');
      expect(r).to.have.property('houseId');

      if (r.devices !== null) {
        expect(r.devices).to.be.an('array');
        r.devices!.forEach(d => {
          expect(d).to.have.property('id');
          expect(d).to.have.property('name');
          expect(d).to.have.property('type');
          expect(d).to.have.property('subType');
          expect(d).to.have.property('variable');
          expect(d).to.have.property('unit');
          expect(d).to.have.property('value');
        });
      }

    });

  });

  it('should return all rooms with satellites', async () => {

    const rooms = await room.getAll({ scope: 'withSatellites' });

    expect(rooms).to.be.an('array');
    rooms.forEach(r => {
      expect(r).to.have.property('id');
      expect(r).to.have.property('name');
      expect(r).to.have.property('houseId');

      if (r.satellites !== null) {
        expect(r.satellites).to.be.an('array');
        r.satellites!.forEach(s => {
          expect(s).to.have.property('id');
          expect(s).to.have.property('name');
          expect(s).to.have.property('roomId');
        });
      }

    });

  });

});
