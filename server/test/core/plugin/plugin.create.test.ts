import { assert, expect } from 'chai';
import Plugin from '../../../src/core/plugin';
import { DatabaseValidationError } from '../../../src/utils/errors/coreError';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';
import Docker from '../../../src/core/docker';
import { AvailableState } from '../../../src/utils/constants';

describe('Plugin.create', () => {
  const event = new Event();
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('e2cz8cc-60a7-4c40-87d2-b25048b1aa04', docker, state);

  it('should create a plugin', async () => {
    const createdPlugin = await plugin.create({
      id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
      dockerId: 'fbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14b5',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    }, AvailableState.PLUGIN_INSTALLED);

    expect(createdPlugin).to.have.property('id');
    expect(createdPlugin).to.have.property('name');
    expect(createdPlugin).to.have.property('version');
    expect(createdPlugin).to.have.property('url');
    expect(createdPlugin).to.have.property('satelliteId');
  });

  it('should not create same plugin on same satellite', async () => {
    const createdFirstPlugin = await plugin.create({
      id: 'e5b238a3-ca9a-471b-b742-ad3e5a61aef4',
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bf',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    }, AvailableState.PLUGIN_INSTALLED);

    expect(createdFirstPlugin).to.have.property('id');
    expect(createdFirstPlugin).to.have.property('name');
    expect(createdFirstPlugin).to.have.property('version');
    expect(createdFirstPlugin).to.have.property('url');
    expect(createdFirstPlugin).to.have.property('satelliteId');

    const createdSecondPlugin = plugin.create({
      id: 'e08074b2-2af7-4379-b1a6-c7d3c2ca90c2',
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bq',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    }, AvailableState.PLUGIN_INSTALLED);

    await assert.isRejected(createdSecondPlugin, DatabaseValidationError);
  });

  it('should create same plugin on different satellite', async () => {
    const createdFirstPlugin = await plugin.create({
      id: '9276e52b-49eb-4d0d-8a53-5a15e3d86f19',
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bz',
      name: 'Fake plugin2',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    }, AvailableState.PLUGIN_INSTALLED);

    expect(createdFirstPlugin).to.have.property('id');
    expect(createdFirstPlugin).to.have.property('name');
    expect(createdFirstPlugin).to.have.property('version');
    expect(createdFirstPlugin).to.have.property('url');
    expect(createdFirstPlugin).to.have.property('satelliteId');

    const createdSecondPlugin = await plugin.create({
      id: '31cb05aa-e6f4-4bcf-82b8-0c6c956ae26d',
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bc',
      name: 'Fake plugin2',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
    }, AvailableState.PLUGIN_INSTALLED);

    expect(createdSecondPlugin).to.have.property('id');
    expect(createdSecondPlugin).to.have.property('name');
    expect(createdSecondPlugin).to.have.property('version');
    expect(createdSecondPlugin).to.have.property('url');
    expect(createdSecondPlugin).to.have.property('satelliteId');
  });

  it('should not create a plugin with an empty url', async () => {
    const promise = plugin.create({
      id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bb',
      name: 'Fake plugin',
      version: '1.0.0',
      url: '',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    }, AvailableState.PLUGIN_INSTALLED);

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a plugin with a empty satellite id', async () => {
    const promise = plugin.create({
      id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bm',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '',
    }, AvailableState.PLUGIN_INSTALLED);

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a plugin with a wrong satellite id', async () => {
    const promise = plugin.create({
      id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '232309e8-54d3-4bcb-8549-cf09251e2940',
    }, AvailableState.PLUGIN_INSTALLED);

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a plugin with a empty name', async () => {
    const promise = plugin.create({
      id: '7b1ad9ce-5433-4e76-b8af-1685437329c5',
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bp',
      name: '',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    }, AvailableState.PLUGIN_INSTALLED);

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
