import TestServer from '../../../../utils/testServer';

describe('user.delete', () => {
  it('should delete a user', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found user to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/user/0cd30aef-9c4e-4a23-81e3-354797129333')
      .expect(404);
  });

});
