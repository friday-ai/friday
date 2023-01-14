import { assert } from 'chai';
import { DatabaseValidationError } from '../../../src/utils/decorators/error';
import Plugin from '../../../src/core/plugin/plugin';

let plugin: Plugin;

describe('Plugin.create', () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
  });

  it('should create a plugin', async () => {
    const pluginToCreate = {
      dockerId: 'fbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14b5',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: new Date(),
    };

    const createdPlugin = await plugin.create(pluginToCreate);

    assert.deepInclude(createdPlugin, pluginToCreate);
  });

  it('should not create same plugin on same satellite', async () => {
    const pluginToCreate = {
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bf',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: new Date(),
    };

    const firstPluginCreated = await plugin.create(pluginToCreate);

    assert.deepInclude(firstPluginCreated, pluginToCreate);

    const createdSecondPlugin = plugin.create(pluginToCreate);

    await assert.isRejected(createdSecondPlugin, DatabaseValidationError);
  });

  it('should create same plugin on different satellite', async () => {
    const firstPluginToCreate = {
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bz',
      name: 'Fake plugin2',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: new Date(),
    };

    const firstPluginCreated = await plugin.create(firstPluginToCreate);

    assert.deepInclude(firstPluginCreated, firstPluginToCreate);

    const secondPluginToCreate = {
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bc',
      name: 'Fake plugin2',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
      lastHeartbeat: new Date(),
    };

    const secondPluginCreated = await plugin.create(secondPluginToCreate);

    assert.deepInclude(secondPluginCreated, secondPluginToCreate);
  });

  it('should not create a plugin with an empty url', async () => {
    const promise = plugin.create({
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bb',
      name: 'Fake plugin',
      version: '1.0.0',
      url: '',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: new Date(),
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a plugin with a empty satellite id', async () => {
    const promise = plugin.create({
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bm',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '',
      lastHeartbeat: new Date(),
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a plugin with a wrong satellite id', async () => {
    const promise = plugin.create({
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bm',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '232309e8-54d3-4bcb-8549-cf09251e2940',
      lastHeartbeat: new Date(),
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a plugin with a empty name', async () => {
    const promise = plugin.create({
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bp',
      name: '',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: new Date(),
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
