import error, { NotFoundError, UnauthorizedError } from '../../utils/errors/coreError';
import SessionType from './session.interface';
import Session from '../../models/session';
import { hashToken } from '../../utils/jwt';

/**
 * Validate refresh token
 * @description Validate a refresh token.
 * @param {string} refreshToken - The refresh token to verify.
 * @param {string} scope - Scope option. (Optional)
 * @returns {Promise<SessionType>} Resolve with an session object.
 * @example
 * friday.session.validateRefreshToken('test');
 */
export default async function validateRefreshToken(refreshToken: string, scope?: string): Promise<SessionType> {
  try {
    let session;

    if (scope !== '' && scope !== null && scope !== undefined) {
      session = await Session.scope(scope).findOne({
        where: {
          refreshToken: hashToken(refreshToken),
        },
      });
    } else {
      session = await Session.findOne({
        where: {
          refreshToken: hashToken(refreshToken),
        },
      });
    }

    if (session === null) {
      throw new NotFoundError({ name: 'Validate refresh token', message: 'Refresh token session not found.', metadata: refreshToken });
    }

    const sessionToReturn = <SessionType>session.get({ plain: true });

    if (sessionToReturn.revoked === true) {
      throw new UnauthorizedError({ name: 'Validate refresh token', message: 'Session was revoked.', metadata: refreshToken });
    }

    if (sessionToReturn.validUntil! < new Date()) {
      throw new UnauthorizedError({ name: 'Validate refresh token', message: 'Session has expired.', metadata: refreshToken });
    }

    return sessionToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: refreshToken,
    });
  }
}
