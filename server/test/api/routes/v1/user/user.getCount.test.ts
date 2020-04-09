import TestServer from '../../../../utils/testServer';

describe('user.getCount', () => {
  it('should return the number of registered users', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/user/count')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeNumber();
        expect(body).toEqual(2);
      });
  });
});
