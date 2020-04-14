import { expect, assert } from 'chai';
import Plugin from '../../../src/core/plugin';

describe('Plugin.getAll', () => {
  const plugin = new Plugin();

  it('should return all plugins', async () => {

    const plugins = await plugin.getAll();

    expect(plugins).to.be.an('array');
    assert.deepEqual(plugins, [{
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

    expect(plugins).to.be.an('array');
    plugins.forEach(p => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');

      // TODO: The state cannot must be null
      if (p.state !== null) {
        expect(p.state).to.be.an('object');
        expect(p.state).to.have.property('id');
        expect(p.state).to.have.property('owner');
        expect(p.state).to.have.property('ownerType');
        expect(p.state).to.have.property('value');
      }

      if (p.satellite !== null) {
        expect(p.satellite).to.be.an('object');
        expect(p.satellite).to.have.property('id');
        expect(p.satellite).to.have.property('name');
        expect(p.satellite).to.have.property('roomId');
      }

      if (p.devices !== null) {
        expect(p.devices).to.be.an('array');
        p.devices!.forEach(d => {
          expect(d).to.be.an('object');
          expect(d).to.have.property('id');
          expect(d).to.have.property('name');
          expect(d).to.have.property('type');
          expect(d).to.have.property('subType');
          expect(d).to.have.property('variable');
          expect(d).to.have.property('unit');
          expect(d).to.have.property('value');
        });
      }

      if (p.variables !== null) {
        expect(p.variables).to.be.an('array');
        p.variables!.forEach(v => {
          expect(v).to.be.an('object');
          expect(v).to.have.property('id');
          expect(v).to.have.property('key');
          expect(v).to.have.property('value');
          expect(v).to.have.property('owner');
          expect(v).to.have.property('ownerType');
        });
      }

    });

  });

  it('should return all plugins with satellites', async () => {

    const plugins = await plugin.getAll({ scope: 'withSatellite' });

    expect(plugins).to.be.an('array');
    plugins.forEach(p => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');

      if (p.satellite !== null) {
        expect(p.satellite).to.be.an('object');
        expect(p.satellite).to.have.property('id');
        expect(p.satellite).to.have.property('name');
        expect(p.satellite).to.have.property('roomId');
      }

    });

  });

  it('should return all plugins with state', async () => {

    const plugins = await plugin.getAll({ scope: 'withState' });

    expect(plugins).to.be.an('array');
    plugins.forEach(p => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');

      // TODO: The state cannot must be null
      if (p.state !== null) {
        expect(p.state).to.be.an('object');
        expect(p.state).to.have.property('id');
        expect(p.state).to.have.property('owner');
        expect(p.state).to.have.property('ownerType');
        expect(p.state).to.have.property('value');
      }
    });

  });

  it('should return all plugins with devices', async () => {

    const plugins = await plugin.getAll({ scope: 'withDevices' });

    expect(plugins).to.be.an('array');
    plugins.forEach(p => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');

      if (p.devices !== null) {
        expect(p.devices).to.be.an('array');
        p.devices!.forEach(d => {
          expect(d).to.be.an('object');
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

  it('should return all plugins with variables', async () => {

    const plugins = await plugin.getAll({ scope: 'withVariables' });

    expect(plugins).to.be.an('array');
    plugins.forEach(p => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');

      if (p.variables !== null) {
        expect(p.variables).to.be.an('array');
        p.variables!.forEach(v => {
          expect(v).to.be.an('object');
          expect(v).to.have.property('id');
          expect(v).to.have.property('key');
          expect(v).to.have.property('value');
          expect(v).to.have.property('owner');
          expect(v).to.have.property('ownerType');
        });
      }

    });

  });

});
