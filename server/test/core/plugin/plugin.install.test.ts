/* eslint-disable func-names */
import { assert, expect } from 'chai';
import Dockerode, { Container } from 'dockerode';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Plugin from '../../../src/core/plugin/plugin';

let plugin: Plugin;
let container: Container;

describe('Plugin.install', () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
    // Override object for tests
    global.FRIDAY.docker.dockerode = new Dockerode();
  });

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
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    });

    container = await global.FRIDAY.docker.getContainer(installedPlugin.dockerId!);
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
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
