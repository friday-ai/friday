import Session from '../../models/session';
import SessionType from './session.interface';
import UserType from '../user/user.interface';
import SessionClass from './index';
import error from '../../utils/errors/coreError';
import { generateRefreshToken, generateAccessToken } from '../../utils/jwt';

/**
 * Create an session.
 * @param {UserType} user - A user object.
 * @returns {Promise<SessionType>} Resolve with created session.
 * @example
 * ````
 * friday.session.create({
 *    id: '87d636b2-fa65-4f0e-ae04-622562f62c31',
 *    name: 'Pepperwood',
 *    firstName: 'John',
 *    email: 'sample@sample.com',
 *    password: 'mysupersamplepassword',
 *    birthDate: new Date(1996, 12, 20),
 *    role: 'admin'
 * });
 * ````
 */
export default async function create(this: SessionClass, user: UserType): Promise<SessionType> {
  try {
    const { refreshToken, refreshTokenHash, refreshTokenValidity } = await generateRefreshToken();
    const newSession: {} = {
      refreshToken: refreshTokenHash,
      validUntil: new Date(Date.now() + refreshTokenValidity * 1000),
      userId: user.id
    };

    const createdSession = await Session.create(newSession);
    let sessionToReturn = <SessionType>createdSession.get({ plain: true });
    sessionToReturn.accessToken = await generateAccessToken(user.id!, user.role!, sessionToReturn.id!, this.secretJwt);
    sessionToReturn.user = user;
    sessionToReturn.refreshToken = refreshToken;

    return sessionToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: user});
  }
}
