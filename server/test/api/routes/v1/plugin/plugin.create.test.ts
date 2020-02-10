import TestServer from '../../../../utils/testServer';
describe('plugin.create', () => {

  it('should create a plugin', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/plugin')
      .send({
        id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
        name: 'Fake plugin',
        version: '1.0.0',
        url: 'fake url',
        enabled: true,
        satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'updatedAt', 'createdAt']
        );
        expect(
          body.id === '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04' &&
          body.name === 'Fake plugin' &&
          body.version === '1.0.0' &&
          body.url === 'fake url' &&
          body.enabled === true &&
          body.satelliteId === 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
        ).toEqual(true);
      });

  });

  it('should not create a plugin with an empty url', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/plugin')
      .send({
        id: '3e2cb8cc-60a7-4c40-87d2-b25048b1aa04',
        name: 'Fake plugin',
        version: '1.0.0',
        url: '',
        enabled: true,
        satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
      })
      .expect(422);
  });

  it('should not create a plugin with a empty satellite id', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/plugin')
      .send({
        id: 'd2ef1148-b2c3-4cb7-8547-d26a8f6f3841',
        name: 'Fake plugin',
        version: '1.0.0',
        url: 'fake url',
        enabled: true,
        satelliteId: ''
      })
      .expect(422);
  });

  it('should not create a plugin with a wrong satellite id', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/plugin')
      .send({
        id: 'a25ba37b-e70f-4d60-8d59-e91bc7584be0',
        name: 'Fake plugin',
        version: '1.0.0',
        url: 'fake url',
        enabled: true,
        satelliteId: '1fad4e9b-a001-4fcc-9eec-34502793828b'
      })
      .expect(422);
  });

  it('should not create a plugin with a empty name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/plugin')
      .send({
        id: '7b280206-c676-496a-b8f7-f8dc530983f5',
        name: '',
        version: '1.0.0',
        url: 'fake url',
        enabled: true,
        satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
      })
      .expect(422);
  });
});
