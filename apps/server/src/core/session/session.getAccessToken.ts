import { SessionAttributes } from '@friday-ai/shared';
import SessionClass from './session';
import { generateAccessToken } from '../../utils/jwt';
import { BadParametersError } from '../../utils/decorators/error';

/**
 * Get a new access token.
 * @param {string} token - The refresh token to verify.
 * @returns {Promise<SessionAttributes>} Resolve with an session object.
 * @example
 * friday.session.getAccessToken('test');
 */
export default async function getAccessToken(this: SessionClass, token: string): Promise<SessionAttributes> {
  const session: SessionAttributes = await this.validateRefreshToken(token, 'full');

  if (session.user === undefined || session.user.id === undefined || session.user.role === undefined || session.id === undefined) {
    throw new BadParametersError({ name: 'Get a access token', message: 'Incorrect params' });
  }

  session.accessToken = generateAccessToken(session.user.id, session.user.role, session.id, this.secretJwt);
  session.refreshToken = token;
  return session;
}
