import SessionType from './session.interface';
import SessionClass from './index';
import error from '../../utils/errors/coreError';
import { generateAccessToken } from '../../utils/jwt';

/**
 * Get a new access token.
 * @param {string} refreshToken - The refresh token to verify.
 * @returns {Promise<SessionType>} Resolve with an session object.
 * @example
 * friday.session.validateRefeshToken('test');
 */
export default async function getAccessToken(this: SessionClass, refreshToken: string): Promise<SessionType> {
  try {
    const session: SessionType = await this.validateRefreshToken(refreshToken, 'full');
    session.accessToken = await generateAccessToken(session.user!.id, session.user!.role!, session.id, this.secretJwt);
    session.refreshToken = refreshToken;
    return session;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: refreshToken});
  }
}
