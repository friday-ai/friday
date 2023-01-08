import Session from '../../models/session';
import { SessionType } from '../../config/entities';
import { UserType } from  '../../config/entities';
import SessionClass from './session';
import { generateRefreshToken, generateAccessToken } from '../../utils/jwt';

/**
 * Create a session.
 * @param {UserType} user - A user object.
 * @param {string} userAgent
 * @returns {Promise<SessionType>} Resolve with created session.
 * @example
 * ````
 * friday.session.create({
 *    id: '87d636b2-fa65-4f0e-ae04-622562f62c31',
 *    userName: 'JohnPepperwood',
 *    email: 'sample@sample.com',
 *    password: 'mysupersamplepassword',
 *    role: 'admin'
 * });
 * ````
 */
export default async function create(this: SessionClass, user: UserType, userAgent?: string): Promise<SessionType> {
  const { refreshToken, refreshTokenHash, refreshTokenValidity } = await generateRefreshToken();
  const newSession: {} = {
    refreshToken: refreshTokenHash,
    validUntil: new Date(Date.now() + refreshTokenValidity * 1000),
    userId: user.id,
    userAgent,
  };

  const createdSession = await Session.create(newSession);
  const sessionToReturn = <SessionType>createdSession.get({ plain: true });
  sessionToReturn.accessToken = generateAccessToken(user.id!, user.role!, sessionToReturn.id!, this.secretJwt);
  sessionToReturn.user = user;
  sessionToReturn.refreshToken = refreshToken;

  return sessionToReturn;
}
