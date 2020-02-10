import TestServer from '../../../../utils/testServer';

describe('room.create', () => {

  it('should create a room', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/room')
      .send({
        id: 'fe20af06-0e4a-4eee-a028-956ff51c6a16',
        name: 'A room test',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ['id', 'name', 'houseId', 'updatedAt', 'createdAt']
        );
        expect(
          body.id === 'fe20af06-0e4a-4eee-a028-956ff51c6a16' &&
          body.name === 'A room test' &&
          body.houseId === 'ecb7958f-ea9e-4520-819e-be6358dc407c'
        ).toEqual(true);
      });

  });

  it('should not create a room with a existing name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/room')
      .send({
        id: '4f015db8-f3bf-454e-b9f4-3f8cd1a5b22a',
        name: 'A room test',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
      })
      .expect(409);
  });

  it('should not create a room with an empty name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/room')
      .send({
        id: 'af3cc3b1-b4e4-4def-ad7a-38ec70e23e62',
        name: '',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
      })
      .expect(422);
  });

  it('should not create a room  with an empty house', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/room')
      .send({
        id: '34c490f0-a9f9-4151-84bf-a7321c5f1bea',
        name: 'A room test',
        houseId: ''
      })
      .expect(422);
  });
});
