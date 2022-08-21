import jwt from 'jsonwebtoken';
import SessionClass from './session';
import { UnauthorizedError } from '../../utils/decorators/error';
import { SessionType } from '../../config/entities';
import { AccessTokenType } from '../../utils/interfaces';

/**
 * Validate access token
 * @param {string} token - The access token to verify.
 * @returns {Promise<AccessTokenType>} Resolve with an access token object.
 * @example
 * friday.session.validateAccessToken('test');
 */
export default async function validateAccessToken(this: SessionClass, token: string): Promise<AccessTokenType> {
  const decoded = <AccessTokenType>jwt.verify(token, this.secretJwt, {
    issuer: 'friday',
    audience: 'user',
  });

  const session: SessionType = await this.getById(decoded.session);

  if (session.revoked === true) {
    throw new UnauthorizedError({ name: 'Validate access token', message: 'Session was revoked.', metadata: token });
  }

  if (session.validUntil! < new Date()) {
    throw new UnauthorizedError({ name: 'Validate access token', message: 'Session has expired.', metadata: token });
  }

  return decoded;
}
