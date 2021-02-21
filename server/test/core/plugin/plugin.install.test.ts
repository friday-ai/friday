import { expect } from 'chai';
import Plugin from '../../../src/core/plugin';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';
import Docker from '../../../src/core/docker';

describe('Plugin.update', () => {
  const event = new Event();
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('e2cz8cc-60a7-4c40-87d2-b25048b1aa04', docker, state);

  it('should install a plugin', async () => {
    const installedPlugin = await plugin.install({
      name: 'Sample-plugin',
      version: 'v1',
      repoTag: 'alpine:latest',
    });

    const containerObj = await docker.getContainer(installedPlugin.dockerId!);
    const containerInfos = await containerObj.inspect();

    expect(containerInfos.Config.Image).to.equal('alpine');
    expect(installedPlugin).to.contains.keys(
      ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    );
  });
});
