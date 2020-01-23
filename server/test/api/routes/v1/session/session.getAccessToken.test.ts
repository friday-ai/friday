import TestServer from "../../../../utils/helper";

describe('session.getAccessToken', () => {
  it('should get a access token for an session', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/session/access_token')
      .send({
        refreshToken: 'refresh-token-test-simple'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ["id", "refreshToken", "revoked", "validUntil", "userId", "user", "accessToken"]
        );
        expect(body.revoked).toEqual(false);
        expect(body.user).toBeObject();
        expect(body.user).not.toHaveProperty('password');
      });
  });

  it('should not get a access token for an session', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/session/access_token')
      .send({
        refreshToken: 'fake-refresh-token-test-simple'
      })
      .expect(404);
  });

  it('should not get a access token for an revoked session', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/session/access_token')
      .send({
        refreshToken: 'refresh-token-test-revoked'
      })
      .expect(401);
  });

  it('should not get a access token for an expired session', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/session/access_token')
      .send({
        refreshToken: 'refresh-token-test-expired'
      })
      .expect(401);
  });
});
