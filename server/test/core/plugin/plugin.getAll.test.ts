import { expect } from 'chai';
import Plugin from '../../../src/core/plugin';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';
import Docker from '../../../src/core/docker';

describe('Plugin.getAll', () => {
  const event = Event;
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('e2cz8cc-60a7-4c40-87d2-b25048b1aa04', docker, state);

  it('should return all plugins', async () => {
    const plugins = await plugin.getAll();

    expect(plugins).to.be.an('array');
    plugins.forEach((p) => {
      expect(p).to.contains.keys(
        ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
      );
    });
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
