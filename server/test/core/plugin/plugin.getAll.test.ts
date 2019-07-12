import { Plugin } from '../../../src/core/friday';
import 'jest-extended';

describe('plugin.getAll', () => {
  const plugin = new Plugin();

  it('should return all plugins', async () => {

    const plugins = await plugin.getAll();

    expect(plugins).toEqual([
      {
        id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
        name: 'Zwave',
        version: '1.2.0',
        url: 'fake url',
        enabled: true,
        satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
      },
      {
        id: '88b48273-15e6-4729-9199-0682677475f4',
        name: 'Xiaomi',
        version: '1.0.0',
        url: 'fake url',
        enabled: true,
        satelliteId: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1'
      },
      {
        id: '3a6b4974-6159-4792-a327-c3656f8bb9af',
        name: 'Philips Hue',
        version: '1.5.0',
        url: 'fake url',
        enabled: true,
        satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
      }
    ]);

  });

  it('should return all plugins with full scope', async () => {

    const plugins = await plugin.getAll({ scope: 'full' });

    expect(plugins).toBeArray();
    plugins.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('version');
      expect(p).toHaveProperty('url');
      expect(p).toHaveProperty('enabled');
      expect(p).toHaveProperty('satelliteId');

      // TODO: The state cannot must be null
      if (p.state !== null) {
        expect(p.state).toBeObject();
        expect(p.state).toHaveProperty('id');
        expect(p.state).toHaveProperty('owner');
        expect(p.state).toHaveProperty('ownerType');
        expect(p.state).toHaveProperty('value');
      }

      if (p.satellite !== null) {
        expect(p.satellite).toBeObject();
        expect(p.satellite).toHaveProperty('id');
        expect(p.satellite).toHaveProperty('name');
        expect(p.satellite).toHaveProperty('roomId');
      }

      if (p.devices !== null) {
        expect(p.devices).toBeArray();
        p.devices!.forEach(d => {
          expect(d).toBeObject();
          expect(d).toHaveProperty('id');
          expect(d).toHaveProperty('name');
          expect(d).toHaveProperty('type');
          expect(d).toHaveProperty('subType');
          expect(d).toHaveProperty('variable');
          expect(d).toHaveProperty('unit');
          expect(d).toHaveProperty('value');
        });
      }

      if (p.variables !== null) {
        expect(p.variables).toBeArray();
        p.variables!.forEach(v => {
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

  it('should return all plugins with satellites', async () => {

    const plugins = await plugin.getAll({ scope: 'withSatellite' });

    expect(plugins).toBeArray();
    plugins.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('version');
      expect(p).toHaveProperty('url');
      expect(p).toHaveProperty('enabled');
      expect(p).toHaveProperty('satelliteId');

      if (p.satellite !== null) {
        expect(p.satellite).toBeObject();
        expect(p.satellite).toHaveProperty('id');
        expect(p.satellite).toHaveProperty('name');
        expect(p.satellite).toHaveProperty('roomId');
      }

    });

  });

  it('should return all plugins with state', async () => {

    const plugins = await plugin.getAll({ scope: 'withState' });

    expect(plugins).toBeArray();
    plugins.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('version');
      expect(p).toHaveProperty('url');
      expect(p).toHaveProperty('enabled');
      expect(p).toHaveProperty('satelliteId');

      // TODO: The state cannot must be null
      if (p.state !== null) {
        expect(p.state).toBeObject();
        expect(p.state).toHaveProperty('id');
        expect(p.state).toHaveProperty('owner');
        expect(p.state).toHaveProperty('ownerType');
        expect(p.state).toHaveProperty('value');
      }
    });

  });

  it('should return all plugins with devices', async () => {

    const plugins = await plugin.getAll({ scope: 'withDevices' });

    expect(plugins).toBeArray();
    plugins.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('version');
      expect(p).toHaveProperty('url');
      expect(p).toHaveProperty('enabled');
      expect(p).toHaveProperty('satelliteId');

      if (p.devices !== null) {
        expect(p.devices).toBeArray();
        p.devices!.forEach(d => {
          expect(d).toBeObject();
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

  it('should return all plugins with variables', async () => {

    const plugins = await plugin.getAll({ scope: 'withVariables' });

    expect(plugins).toBeArray();
    plugins.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('version');
      expect(p).toHaveProperty('url');
      expect(p).toHaveProperty('enabled');
      expect(p).toHaveProperty('satelliteId');

      if (p.variables !== null) {
        expect(p.variables).toBeArray();
        p.variables!.forEach(v => {
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

});
