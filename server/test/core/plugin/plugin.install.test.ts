import { expect } from 'chai';
import Plugin from '../../../src/core/plugin';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';
import Docker from '../../../src/core/docker';

describe('Plugin.install', () => {
  const event = new Event();
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', docker, state);

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
