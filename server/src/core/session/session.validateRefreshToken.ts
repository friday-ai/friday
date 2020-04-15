import error, { NotFoundError, UnauthoriizedError } from '../../utils/errors/coreError';
import SessionType from './session.interface';
import Session from '../../models/session';
import { hashToken } from '../../utils/jwt';

/**
 * Validate refresh token
 * @description Validate a refresh token.
 * @param {string} refreshToken - The refresh token to verify.
 * @returns {Promise<SessionType>} Resolve with an session object.
 * @example
 * friday.session.validateRefeshToken('test');
 */
export default async function validateRefeshToken(refreshToken: string, scope?: string): Promise<SessionType> {
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
      throw new NotFoundError({ name: 'Validate refress token', message: 'Refresh token session not found.', metadata: refreshToken });
    }

    const sessionToReturn = <SessionType>session.get({ plain: true });

    if (sessionToReturn.revoked === true) {
      throw new UnauthoriizedError({ name: 'Validate refress token', message: 'Session was revoked.', metadata: refreshToken });
    }

    if (sessionToReturn.validUntil! < new Date()) {
      throw new UnauthoriizedError({ name: 'Validate refress token', message: 'Session has expired.', metadata: refreshToken });
    }

    return sessionToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: refreshToken,
    });
  }
}
