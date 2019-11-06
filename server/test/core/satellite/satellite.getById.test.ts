import Satellite from '../../../src/core/satellite';
import 'jest-extended';

describe('satellite.getById', () => {
  const satellite = new Satellite();

  it('should return a satellite', async () => {

    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');
    expect(satelliteRturned).toEqual(
      {
        id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
        name: 'Main satellite',
        roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
      }
    );

  });

  it('should return a satellite with full scope', async () => {

    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'full');

    expect(satelliteRturned).toBeObject();

    expect(satelliteRturned).toHaveProperty('id');
    expect(satelliteRturned).toHaveProperty('name');
    expect(satelliteRturned).toHaveProperty('roomId');
    expect(satelliteRturned).toHaveProperty('room');
    expect(satelliteRturned).toHaveProperty('state');
    expect(satelliteRturned).toHaveProperty('variables');
    expect(satelliteRturned).toHaveProperty('plugins');

    expect(satelliteRturned.room).toBeObject();
    expect(satelliteRturned.room).toHaveProperty('id');
    expect(satelliteRturned.room).toHaveProperty('name');
    expect(satelliteRturned.room).toHaveProperty('houseId');

    // TODO: The state cannot must be null
    if (satelliteRturned.state !== null) {
      expect(satelliteRturned.state).toBeObject();
      expect(satelliteRturned.state).toHaveProperty('id');
      expect(satelliteRturned.state).toHaveProperty('owner');
      expect(satelliteRturned.state).toHaveProperty('ownerType');
      expect(satelliteRturned.state).toHaveProperty('value');
    }

    if (satelliteRturned.variables !== null) {
      expect(satelliteRturned.variables).toBeArray();
      satelliteRturned.variables!.forEach(v => {
        expect(v).toBeObject();
        expect(v).toHaveProperty('id');
        expect(v).toHaveProperty('key');
        expect(v).toHaveProperty('value');
        expect(v).toHaveProperty('owner');
        expect(v).toHaveProperty('ownerType');
      });
    }

    if (satelliteRturned.plugins !== null) {
      expect(satelliteRturned.plugins).toBeArray();
      satelliteRturned.plugins!.forEach(p => {
        expect(p).toBeObject();
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('name');
        expect(p).toHaveProperty('version');
        expect(p).toHaveProperty('url');
        expect(p).toHaveProperty('enabled');
        expect(p).toHaveProperty('satelliteId');
      });
    }

  });

  it('should return a satellite with room', async () => {

    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withRoom');


    expect(satelliteRturned).toBeObject();

    expect(satelliteRturned).toHaveProperty('id');
    expect(satelliteRturned).toHaveProperty('name');
    expect(satelliteRturned).toHaveProperty('roomId');
    expect(satelliteRturned).toHaveProperty('room');

    expect(satelliteRturned.room).toBeObject();
    expect(satelliteRturned.room).toHaveProperty('id');
    expect(satelliteRturned.room).toHaveProperty('name');
    expect(satelliteRturned.room).toHaveProperty('houseId');


  });

  it('should return a satellite with state', async () => {

    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withState');


    expect(satelliteRturned).toBeObject();

    expect(satelliteRturned).toHaveProperty('id');
    expect(satelliteRturned).toHaveProperty('name');
    expect(satelliteRturned).toHaveProperty('roomId');
    expect(satelliteRturned).toHaveProperty('state');

    // TODO: The state cannot must be null
    if (satelliteRturned.state !== null) {
      expect(satelliteRturned.state).toBeObject();
      expect(satelliteRturned.state).toHaveProperty('id');
      expect(satelliteRturned.state).toHaveProperty('owner');
      expect(satelliteRturned.state).toHaveProperty('ownerType');
      expect(satelliteRturned.state).toHaveProperty('value');
    }

  });

  it('should return a satellite with variables', async () => {

    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withVariables');


    expect(satelliteRturned).toBeObject();

    expect(satelliteRturned).toHaveProperty('id');
    expect(satelliteRturned).toHaveProperty('name');
    expect(satelliteRturned).toHaveProperty('roomId');
    expect(satelliteRturned).toHaveProperty('variables');


    if (satelliteRturned.variables !== null) {
      expect(satelliteRturned.variables).toBeArray();
      satelliteRturned.variables!.forEach(v => {
        expect(v).toBeObject();
        expect(v).toHaveProperty('id');
        expect(v).toHaveProperty('key');
        expect(v).toHaveProperty('value');
        expect(v).toHaveProperty('owner');
        expect(v).toHaveProperty('ownerType');
      });
    }

  });

  it('should return a satellite with plugins', async () => {

    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withPlugins');

    expect(satelliteRturned).toBeObject();

    expect(satelliteRturned).toHaveProperty('id');
    expect(satelliteRturned).toHaveProperty('name');
    expect(satelliteRturned).toHaveProperty('roomId');
    expect(satelliteRturned).toHaveProperty('plugins');

    if (satelliteRturned.plugins !== null) {
      expect(satelliteRturned.plugins).toBeArray();
      satelliteRturned.plugins!.forEach(p => {
        expect(p).toBeObject();
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('name');
        expect(p).toHaveProperty('version');
        expect(p).toHaveProperty('url');
        expect(p).toHaveProperty('enabled');
        expect(p).toHaveProperty('satelliteId');
      });
    }

  });

});
