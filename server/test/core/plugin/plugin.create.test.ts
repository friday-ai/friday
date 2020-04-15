import { expect, assert } from 'chai';
import Plugin from '../../../src/core/plugin';
import { DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('Plugin.create', () => {
  const plugin = new Plugin();

  it('should create a plugin', async () => {
    const createdPlugin = await plugin.create({
      id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
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

  it('should not create a plugin with an empty url', async () => {
    const promise = plugin.create({
      id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
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
      id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
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
      id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
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
      id: '7b1ad9ce-5433-4e76-b8af-1685437329c5',
      name: '',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
