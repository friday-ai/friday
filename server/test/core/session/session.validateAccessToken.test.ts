import Session from '../../../src/core/session';
import { NotFoundError, UnauthoriizedError } from '../../../src/utils/errors/coreError';
import { generateAccessToken } from '../../../src/utils/jwt';

describe('session.validateAccessToken', () => {
  const session = new Session('secretJwt');
  const validAccessToken = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'HABITANT', '894b93df-a7ab-494c-92f6-7d88ae9164b3', 'secretJwt');
  const notFoundAccessToken = generateAccessToken('7c5509e3-6966-465e-b88f-694b05f267c6', 'HABITANT', '537f130b-8b6f-444b-8ae7-db6b161f35a9', 'secretJwt');
  const revokedAccessToken = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'HABITANT', '2c23ba16-a4a0-4015-bb1b-7ecba3375260', 'secretJwt');
  const expiredAccessToken = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'HABITANT', 'baebcfc9-8ca0-4803-9f56-15519f05eefd', 'secretJwt');

  it('should valid a access token', async () => {
    const accessToken = await session.validateAccessToken(validAccessToken);

    expect(accessToken).toHaveProperty('user');
    expect(accessToken).toHaveProperty('role');
    expect(accessToken).toHaveProperty('session');
  });

  it('should not found a associate session to the access token', async () => {

    await session.validateAccessToken(notFoundAccessToken)
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });

  });

  it('should return an error, associate session has revoked', async () => {

    await session.validateAccessToken(revokedAccessToken)
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(UnauthoriizedError);
    });

  });

  it('should return an error, associate session has expired', async () => {

    await session.validateAccessToken(expiredAccessToken)
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(UnauthoriizedError);
    });

  });

});