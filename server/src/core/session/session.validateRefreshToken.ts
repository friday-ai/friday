import { NotFoundError, UnauthorizedError } from '../../utils/decorators/error';
import { SessionType } from '../../config/entities';
import Session from '../../models/session';
import { hashToken } from '../../utils/jwt';

/**
 * Validate refresh token
 * @description Validate a refresh token.
 * @param {string} token - The refresh token to verify.
 * @param {string} scope - Scope option. (Optional)
 * @returns {Promise<SessionType>} Resolve with an session object.
 * @example
 * friday.session.validateRefreshToken('test');
 */
export default async function validateRefreshToken(token: string, scope?: string): Promise<SessionType> {
  let session;

  if (scope !== '' && scope !== null && scope !== undefined) {
    session = await Session.scope(scope).findOne({
      where: {
        refreshToken: hashToken(token),
      },
    });
  } else {
    session = await Session.findOne({
      where: {
        refreshToken: hashToken(token),
      },
    });
  }

  if (session === null) {
    throw new NotFoundError({ name: 'Validate refresh token', message: 'Refresh token session not found.', metadata: token });
  }

  const sessionToReturn = <SessionType>session.get({ plain: true });

  if (sessionToReturn.revoked === true) {
    throw new UnauthorizedError({ name: 'Validate refresh token', message: 'Session was revoked.', metadata: token });
  }

  if (sessionToReturn.validUntil! < new Date()) {
    throw new UnauthorizedError({ name: 'Validate refresh token', message: 'Session has expired.', metadata: token });
  }

  return sessionToReturn;
}
