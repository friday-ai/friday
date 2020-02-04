import TestServer from '../../../../utils/testServer';

describe('session.revoke', () => {

  it('should revoke a session', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/session/revoke/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        sessionId: '894b93df-a7ab-494c-92f6-7d88ae9164b3'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toContainAllKeys(
          ['id', 'refreshToken', 'revoked', 'validUntil', 'userId']
        );
        expect(body.revoked).toEqual(true);
      });
  });

  it('should not revoke a session', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/session/revoke')
      .query({
        sessionId: ''
      })
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it('should not revoke an session', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/session/revoke/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        sessionId: 'test'
      })
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
