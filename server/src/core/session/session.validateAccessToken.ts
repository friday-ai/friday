import jwt from 'jsonwebtoken';
import SessionClass from './index';
import error, { NotFoundError, UnauthorizedError } from '../../utils/errors/coreError';
import SessionType, { AccessTokenType } from './session.interface';

/**
 * Validate access token
 * @param {string} accessToken - The access token to verify.
 * @returns {Promise<AccessTokenType>} Resolve with a access token object.
 * @example
 * friday.session.validateAccessToken('test');
 */
export default async function validateAccessToken(this: SessionClass, accessToken: string): Promise<AccessTokenType> {
  try {
    const decoded = <AccessTokenType>jwt.verify(accessToken, this.secretJwt, {
      issuer: 'friday',
      audience: 'user',
    });

    const session: SessionType = await this.getById(decoded.session);

    if (session === null) {
      throw new NotFoundError({ name: 'Validate access token', message: 'Access token session not found.', metadata: accessToken });
    }

    if (session.revoked === true) {
      throw new UnauthorizedError({ name: 'Validate access token', message: 'Session was revoked.', metadata: accessToken });
    }

    if (session.validUntil! < new Date()) {
      throw new UnauthorizedError({ name: 'Validate access token', message: 'Session has expired.', metadata: accessToken });
    }

    return decoded;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: accessToken,
    });
  }
}
