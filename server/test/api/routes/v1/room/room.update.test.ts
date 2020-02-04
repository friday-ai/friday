import TestServer from '../../../../utils/testServer';

describe('room.update', () => {
  it('should update a room', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .send({
        name: 'Room update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('Room update');
      });
  });

  it('should not found room to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/room/8b513ecf-2c2d-4cc7-aefc-0ac8eba85333')
      .send({
        name: 'Plugin update'
      })
      .expect(404);

  });
});
