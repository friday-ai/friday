import { assert, expect } from 'chai';
import Plugin from '../../../src/core/plugin/plugin';
import { DatabaseValidationError } from '../../../src/utils/decorators/error';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable/variable';
import State from '../../../src/core/state/state';
import Docker from '../../../src/core/docker/docker';

describe('Plugin.create', () => {
  const event = Event;
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('e2cz8cc-60a7-4c40-87d2-b25048b1aa04', docker, state);

  it('should create a plugin', async () => {
    const createdPlugin = await plugin.create({
      dockerId: 'fbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14b5',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    });

    expect(createdPlugin).to.have.property('id');
    expect(createdPlugin).to.have.property('name');
    expect(createdPlugin).to.have.property('version');
    expect(createdPlugin).to.have.property('url');
    expect(createdPlugin).to.have.property('satelliteId');
  });

  it('should not create same plugin on same satellite', async () => {
    const createdFirstPlugin = await plugin.create({
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bf',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    });

    expect(createdFirstPlugin).to.have.property('id');
    expect(createdFirstPlugin).to.have.property('name');
    expect(createdFirstPlugin).to.have.property('version');
    expect(createdFirstPlugin).to.have.property('url');
    expect(createdFirstPlugin).to.have.property('satelliteId');

    const createdSecondPlugin = plugin.create({
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bq',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    });

    await assert.isRejected(createdSecondPlugin, DatabaseValidationError);
  });

  it('should create same plugin on different satellite', async () => {
    const createdFirstPlugin = await plugin.create({
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bz',
      name: 'Fake plugin2',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    });

    expect(createdFirstPlugin).to.have.property('id');
    expect(createdFirstPlugin).to.have.property('name');
    expect(createdFirstPlugin).to.have.property('version');
    expect(createdFirstPlugin).to.have.property('url');
    expect(createdFirstPlugin).to.have.property('satelliteId');

    const createdSecondPlugin = await plugin.create({
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bc',
      name: 'Fake plugin2',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
    });

    expect(createdSecondPlugin).to.have.property('id');
    expect(createdSecondPlugin).to.have.property('name');
    expect(createdSecondPlugin).to.have.property('version');
    expect(createdSecondPlugin).to.have.property('url');
    expect(createdSecondPlugin).to.have.property('satelliteId');
  });

  it('should not create a plugin with an empty url', async () => {
    const promise = plugin.create({
      dockerId: 'cbeb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14bb',
      name: 'Fake plugin',
      version: '1.0.0',
      url: '',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
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
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a plugin with a wrong satellite id', async () => {
    const promise = plugin.create({
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '232309e8-54d3-4bcb-8549-cf09251e2940',
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
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
