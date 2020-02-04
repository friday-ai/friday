import TestServer from '../../../../utils/testServer';

describe('user.login', () => {
  it('should login an user', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/user/login')
      .send({
        email: 'john@pepperwood.com',
        password: 'mysuperpassword'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(
          body.revoked === false &&
          body.user.email === 'john@pepperwood.com'
        ).toEqual(true);
      });
  });

  it('should not login an user with bad password', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/user/login')
      .send({
        email: 'john@pepperwood.com',
        password: 'mysuperpasword'
      })
      .expect('Content-Type', /json/)
      .expect(403);
  });
});
