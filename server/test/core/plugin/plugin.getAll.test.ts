import { expect, assert } from 'chai';
import Plugin from '../../../src/core/plugin';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';
import Docker from '../../../src/core/docker';

describe('Plugin.getAll', () => {
  const event = new Event();
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('e2cz8cc-60a7-4c40-87d2-b25048b1aa04', docker, state);

  it('should return all plugins', async () => {
    const plugins = await plugin.getAll();

    expect(plugins).to.be.an('array');
    assert.deepEqual(plugins, [{
      id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      name: 'Zwave',
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14b5',
      version: '1.2.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: new Date('2020-04-08T22:00:00.000Z'),
    },
    {
      id: '88b48273-15e6-4729-9199-0682677475f4',
      dockerId: 'cceb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14b5',
      name: 'Xiaomi',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
      lastHeartbeat: new Date('1992-05-07T22:00:00.000Z'),
    },
    {
      id: '3a6b4974-6159-4792-a327-c3656f8bb9af',
      dockerId: 'dceb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14b5',
      name: 'Philips Hue',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: new Date('2001-01-24T23:00:00.000Z'),
    },
    ]);
  });

  it('should return all plugins with full scope', async () => {
    const plugins = await plugin.getAll({ scope: 'full' });

    expect(plugins).to.be.an('array');
    plugins.forEach((p) => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');
      expect(p).to.have.property('lastHeartbeat');

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
        p.devices!.forEach((d) => {
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
        p.variables!.forEach((v) => {
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
    plugins.forEach((p) => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');
      expect(p).to.have.property('lastHeartbeat');

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
    plugins.forEach((p) => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');
      expect(p).to.have.property('lastHeartbeat');

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
    plugins.forEach((p) => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');
      expect(p).to.have.property('lastHeartbeat');

      if (p.devices !== null) {
        expect(p.devices).to.be.an('array');
        p.devices!.forEach((d) => {
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
    plugins.forEach((p) => {
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('version');
      expect(p).to.have.property('url');
      expect(p).to.have.property('enabled');
      expect(p).to.have.property('satelliteId');
      expect(p).to.have.property('lastHeartbeat');

      if (p.variables !== null) {
        expect(p.variables).to.be.an('array');
        p.variables!.forEach((v) => {
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
