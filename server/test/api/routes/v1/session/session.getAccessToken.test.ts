import { expect } from 'chai';
import server from '../../../../utils/request';

describe('POST /api/v1/session/access_token', () => {
  it('should get a access token for an session', async () => {
    await server
      .post('/api/v1/session/access_token')
      .send({
        refreshToken: 'refresh-token-test-simple',
      })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.all.keys(
          ['id', 'refreshToken', 'revoked', 'validUntil', 'userId', 'user', 'accessToken'],
        );
        expect(body.revoked).to.equal(false);
        expect(body.user).to.be.an('object');
        expect(body.user).not.to.have.property('password');
      });
  });

  it('should not get a access token for an session', async () => {
    await server
      .post('/api/v1/session/access_token')
      .send({
        refreshToken: 'fake-refresh-token-test-simple',
      })
      .expect(404);
  });

  it('should not get a access token for an revoked session', async () => {
    await server
      .post('/api/v1/session/access_token')
      .send({
        refreshToken: 'refresh-token-test-revoked',
      })
      .expect(401);
  });

  it('should not get a access token for an expired session', async () => {
    await server
      .post('/api/v1/session/access_token')
      .send({
        refreshToken: 'refresh-token-test-expired',
      })
      .expect(401);
  });
});
