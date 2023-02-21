import { assert, expect } from 'chai';
import { NotFoundError, UnauthorizedError } from '../../../src/utils/decorators/error';
import Session from '../../../src/core/session/session';

// tokenHash: 'c090007e57736654afa0b637f0e6e7a6d7dddbe476e2892c0d62fdd601d0807d', // hash of 'refresh-token-test-create'

let session: Session;

describe('Session.getAccessToken', () => {
  before(async () => {
    session = global.FRIDAY.session;
  });

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
    await assert.isRejected(promise, UnauthorizedError);
  });

  it('should not get a access token for an expired session', async () => {
    const promise = session.getAccessToken('refresh-token-test-expired');
    await assert.isRejected(promise, UnauthorizedError);
  });
});
