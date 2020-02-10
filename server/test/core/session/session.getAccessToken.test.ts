import Session from '../../../src/core/session';
import { NotFoundError, UnauthoriizedError } from '../../../src/utils/errors/coreError';

// tokenHash: 'c090007e57736654afa0b637f0e6e7a6d7dddbe476e2892c0d62fdd601d0807d', // hash of 'refresh-token-test-create'

describe('session.getAccessToken', () => {
  const session = new Session('secretJwt');

  it('should get a access token for an session', async () => {

    const sessionReturned = await session.getAccessToken('refresh-token-test-simple');

    expect(sessionReturned).toHaveProperty('refreshToken');
    expect(sessionReturned).toHaveProperty('accessToken');
    expect(sessionReturned).toHaveProperty('id');
    expect(sessionReturned.revoked).toEqual(false);
    expect(sessionReturned.user).toBeObject();
    expect(sessionReturned.user).not.toHaveProperty('password');
  });

  it('should not get a access token for an session', async () => {
    expect.assertions(1);

    await session.getAccessToken('fake-refresh-token-test-simple')
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

  it('should not get a access token for an revoked session', async () => {
    expect.assertions(1);

    await session.getAccessToken('refresh-token-test-revoked')
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(UnauthoriizedError);
      });

  });

  it('should not get a access token for an expired session', async () => {

    await session.getAccessToken('refresh-token-test-expired')
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(UnauthoriizedError);
      });

  });

});
