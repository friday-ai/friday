import Satellite from '../../../src/core/satellite';
import 'jest-extended';

describe('satellite.getAll', () => {
  const satellite = new Satellite();

  it('should return all satellites', async () => {

    const satellites = await satellite.getAll();
    expect(satellites).toEqual([
      {
        id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
        name: 'Main satellite',
        roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
      },
      {
        id: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
        name: 'Satellite 2',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc'
      }
    ]);

  });

  it('should return all satellites with full scope', async () => {

    const satellites = await satellite.getAll({ scope: 'full' });

    expect(satellites).toBeArray();

    satellites.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('roomId');
      expect(s).toHaveProperty('room');
      expect(s).toHaveProperty('state');
      expect(s).toHaveProperty('variables');
      expect(s).toHaveProperty('plugins');

      expect(s.room).toBeObject();
      expect(s.room).toHaveProperty('id');
      expect(s.room).toHaveProperty('name');
      expect(s.room).toHaveProperty('houseId');

      // TODO: The state cannot must be null
      if (s.state !== null) {
        expect(s.state).toBeObject();
        expect(s.state).toHaveProperty('id');
        expect(s.state).toHaveProperty('owner');
        expect(s.state).toHaveProperty('ownerType');
        expect(s.state).toHaveProperty('value');
      }

      if (s.variables !== null) {
        expect(s.variables).toBeArray();
        s.variables!.forEach(v => {
          expect(v).toBeObject();
          expect(v).toHaveProperty('id');
          expect(v).toHaveProperty('key');
          expect(v).toHaveProperty('value');
          expect(v).toHaveProperty('owner');
          expect(v).toHaveProperty('ownerType');
        });
      }

      if (s.plugins !== null) {
        expect(s.plugins).toBeArray();
        s.plugins!.forEach(p => {
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

  it('should return all satellites with room', async () => {

    const satellites = await satellite.getAll({ scope: 'withRoom' });

    expect(satellites).toBeArray();

    satellites.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('roomId');
      expect(s).toHaveProperty('room');

      expect(s.room).toBeObject();
      expect(s.room).toHaveProperty('id');
      expect(s.room).toHaveProperty('name');
      expect(s.room).toHaveProperty('houseId');

    });

  });

  it('should return all satellites with state', async () => {

    const satellites = await satellite.getAll({ scope: 'withState' });

    expect(satellites).toBeArray();

    satellites.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('roomId');
      expect(s).toHaveProperty('state');

      // TODO: The state cannot must be null
      if (s.state !== null) {
        expect(s.state).toBeObject();
        expect(s.state).toHaveProperty('id');
        expect(s.state).toHaveProperty('owner');
        expect(s.state).toHaveProperty('ownerType');
        expect(s.state).toHaveProperty('value');
      }
    });

  });

  it('should return all satellites with variables', async () => {

    const satellites = await satellite.getAll({ scope: 'withVariables' });

    expect(satellites).toBeArray();

    satellites.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('roomId');
      expect(s).toHaveProperty('variables');

      if (s.variables !== null) {
        expect(s.variables).toBeArray();
        s.variables!.forEach(v => {
          expect(v).toBeObject();
          expect(v).toHaveProperty('id');
          expect(v).toHaveProperty('key');
          expect(v).toHaveProperty('value');
          expect(v).toHaveProperty('owner');
          expect(v).toHaveProperty('ownerType');
        });
      }

    });

  });

  it('should return all satellites with plugins', async () => {

    const satellites = await satellite.getAll({ scope: 'withPlugins' });

    expect(satellites).toBeArray();

    satellites.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('roomId');
      expect(s).toHaveProperty('plugins');

      if (s.plugins !== null) {
        expect(s.plugins).toBeArray();
        s.plugins!.forEach(p => {
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

});
