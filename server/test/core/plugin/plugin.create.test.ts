import Plugin from '../../../src/core/plugin';
import { DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('plugin.create', () => {
  const plugin = new Plugin();

  it('should create a plugin', async () => {
    const createdPlugin = await plugin.create({
      id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
    });

    expect(createdPlugin).toHaveProperty('id');
    expect(createdPlugin).toHaveProperty('name');
    expect(createdPlugin).toHaveProperty('version');
    expect(createdPlugin).toHaveProperty('url');
    expect(createdPlugin).toHaveProperty('satelliteId');
  });

  it('should not create a plugin with an empty url', async () => {
    expect.assertions(1);

    await plugin.create({
      id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
      name: 'Fake plugin',
      version: '1.0.0',
      url: '',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
    })
      .catch((err: Error) => {
         expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

  it('should not create a plugin with a empty satellite id', async () => {
    expect.assertions(1);

    await plugin.create({
      id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: ''
    })
      .catch((err: Error) => {
         expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

  it('should not create a plugin with a wrong satellite id', async () => {
    expect.assertions(1);

    await plugin.create({
      id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '232309e8-54d3-4bcb-8549-cf09251e2940'
    })
      .catch((err: Error) => {
         expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

  it('should not create a plugin with a empty name', async () => {
    expect.assertions(1);

    await plugin.create({
      id: '7b1ad9ce-5433-4e76-b8af-1685437329c5',
      name: '',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
    })
      .catch((err: Error) => {
         expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

});
