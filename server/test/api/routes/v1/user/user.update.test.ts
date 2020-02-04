import TestServer from '../../../../utils/testServer';

describe('user.update', () => {
  it('should update a user', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .send({
        name: 'User update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('User update');
      });
  });

  it('should not found user to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/scene/0cd30aef-9c4e-4a23-81e3-354797129333')
      .send({
        name: 'User update'
      })
      .expect(404);

  });
});
