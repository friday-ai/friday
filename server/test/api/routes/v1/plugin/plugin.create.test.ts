import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import { admin, guest, habitant } from '../../../../utils/apiToken';

describe('POST /api/v1/plugin', () => {
  it('should create a plugin', async () => {
    const plugin = {
      id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: '2020-10-27T23:43:23.025Z',
    };

    await server
      .post('/api/v1/plugin')
      .send(plugin)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, plugin);
      });
  });

  it('admin should have access to create a plugin', async () => {
    const plugin = {
      id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: '2020-10-27T23:43:23.552Z',
    };

    await server
      .post('/api/v1/plugin', admin)
      .send(plugin)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, plugin);
      });
  });

  it('habitant shouldn\'t have access to create a plugin', async () => {
    const plugin = {
      id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: '2020-10-27T23:43:23.552Z',
    };

    await server
      .post('/api/v1/plugin', habitant)
      .send(plugin)
      .expect('Content-Type', /json/)
      .expect(403);
  });

  it('guest shouldn\'t have access to create a plugin', async () => {
    const plugin = {
      id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: '2020-10-27T23:43:23.552Z',
    };

    await server
      .post('/api/v1/plugin', guest)
      .send(plugin)
      .expect('Content-Type', /json/)
      .expect(403);
  });

  it('should not create same plugin on same satellite', async () => {
    const plugin = {
      id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
      name: 'Fake plugin',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: '2020-10-27T23:43:23.552Z',
    };

    await server
      .post('/api/v1/plugin')
      .send(plugin)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, plugin);
      });

    await server
      .post('/api/v1/plugin')
      .send(plugin)
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should create same plugin on different satellite', async () => {
    const plugin1 = {
      id: '9276e52b-49eb-4d0d-8a53-5a15e3d86f19',
      name: 'Fake plugin2',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: '2020-10-27T23:43:23.552Z',
    };

    await server
      .post('/api/v1/plugin')
      .send(plugin1)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, plugin1);
      });

    const plugin2 = {
      id: '31cb05aa-e6f4-4bcf-82b8-0c6c956ae26d',
      name: 'Fake plugin2',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
    };

    await server
      .post('/api/v1/plugin')
      .send(plugin2)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, plugin2);
      });
  });

  it('should not create a plugin with an empty url', async () => {
    await server
      .post('/api/v1/plugin')
      .send({
        id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
        name: 'Fake plugin',
        version: '1.0.0',
        url: '',
        enabled: true,
        satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      })
      .expect(422);
  });

  it('should not create a plugin with a empty satellite id', async () => {
    await server
      .post('/api/v1/plugin')
      .send({
        id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
        name: 'Fake plugin',
        version: '1.0.0',
        url: 'fake url',
        enabled: true,
        satelliteId: '',
      })
      .expect(422);
  });

  it('should not create a plugin with a wrong satellite id', async () => {
    await server
      .post('/api/v1/plugin')
      .send({
        id: 'a25ba37b-e70f-4d60-8d59-e91bc7584be0',
        name: 'Fake plugin',
        version: '1.0.0',
        url: 'fake url',
        enabled: true,
        satelliteId: '1fad4e9b-a001-4fcc-9eec-34502793828b',
      })
      .expect(422);
  });

  it('should not create a plugin with a empty name', async () => {
    await server
      .post('/api/v1/plugin')
      .send({
        id: '7b280206-c676-496a-b8f7-f8dc530983f5',
        name: '',
        version: '1.0.0',
        url: 'fake url',
        enabled: true,
        satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      })
      .expect(422);
  });
});
