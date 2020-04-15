import { expect, assert } from 'chai';
import Session from '../../../src/core/session';
import { NotFoundError, UnauthoriizedError } from '../../../src/utils/errors/coreError';

// tokenHash: 'c090007e57736654afa0b637f0e6e7a6d7dddbe476e2892c0d62fdd601d0807d', // hash of 'refresh-token-test-create'

describe('Session.getAccessToken', () => {
  const session = new Session('secretJwt');

  it('should get a access token for an session', async () => {
    const sessionReturned = await session.getAccessToken('refresh-token-test-simple');

    expect(sessionReturned).to.have.property('refreshToken');
    expect(sessionReturned).to.have.property('accessToken');
    expect(sessionReturned).to.have.property('id');
    expect(sessionReturned.revoked).to.equal(false);
    expect(sessionReturned.user).to.be.an('object');
    expect(sessionReturned.user).not.to.have.property('password');
  });

  it('should not get a access token for an session', async () => {
    const promise = session.getAccessToken('fake-refresh-token-test-simple');
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not get a access token for an revoked session', async () => {
    const promise = session.getAccessToken('refresh-token-test-revoked');
    await assert.isRejected(promise, UnauthoriizedError);
  });

  it('should not get a access token for an expired session', async () => {
    const promise = session.getAccessToken('refresh-token-test-expired');
    await assert.isRejected(promise, UnauthoriizedError);
  });
});
