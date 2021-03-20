/* eslint-disable func-names */
import { assert, expect } from 'chai';
import { Container } from 'dockerode';
import Plugin from '../../../src/core/plugin';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';
import Docker from '../../../src/core/docker';
import { NotFoundError } from '../../../src/utils/errors/coreError';

let container: Container;

describe('Plugin.install', () => {
  const event = new Event();
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', docker, state);

  after(async function () {
    this.timeout(15000);
    await container.remove();
  });

  it('should install a plugin', async function () {
    this.timeout(15000);
    const installedPlugin = await plugin.install({
      name: 'Sample-plugin',
      version: 'v1',
      repoTag: 'alpine:latest',
    });

    container = await docker.getContainer(installedPlugin.dockerId!);
    const containerInfos = await container.inspect();

    expect(containerInfos.Config.Image).to.equal('alpine:latest');
    expect(installedPlugin).to.contains.keys(
      ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    );
  });

  it('should not install a plugin', async function () {
    this.timeout(15000);
    const promise = plugin.install({
      name: 'Sample-plugin',
      version: 'v1',
      repoTag: 'fake-plugin:friday',
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
