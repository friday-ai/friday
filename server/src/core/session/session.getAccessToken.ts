import { SessionType } from '../../config/entities';
import SessionClass from './session';
import { generateAccessToken } from '../../utils/jwt';

/**
 * Get a new access token.
 * @param {string} token - The refresh token to verify.
 * @returns {Promise<SessionType>} Resolve with an session object.
 * @example
 * friday.session.getAccessToken('test');
 */
export default async function getAccessToken(this: SessionClass, token: string): Promise<SessionType> {
  const session: SessionType = await this.validateRefreshToken(token, 'full');
  session.accessToken = generateAccessToken(session.user!.id!, session.user!.role!, session.id!, this.secretJwt);
  session.refreshToken = token;
  return session;
}
