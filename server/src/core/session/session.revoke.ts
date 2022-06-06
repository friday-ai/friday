import Session from '../../models/session';
import SessionType from './session.interface';
import error, { BadParametersError, NotFoundError } from '../../utils/errors/coreError';

/**
 * Revoke an session.
 * @param {String} userId - Id of user.
 * @param {String} sessionId - Id of session.
 * @returns {Promise<SessionType>} Resolve with session revoked.
 * @example
 * ````
 * friday.session.revoke('a8ba342e-854a-4906-8670-d400c868bdb1', 'b991aa73-2acb-4e24-8f95-66fbd27506b6');
 * ````
 */
export default async function revoke(userId: string, sessionId: string): Promise<SessionType> {
  try {
    if (userId === '' || userId === null || userId === undefined || sessionId === '' || sessionId === null || sessionId === undefined) {
      throw new BadParametersError({ name: 'Revoke an Session', message: 'Incorrect params', metadata: { userId, sessionId } });
    }

    const session = await Session.findOne({
      where: {
        id: sessionId,
        userId,
      },
    });

    if (session === null) {
      throw new NotFoundError({ name: 'Revoke an Session', message: 'Session not found', metadata: { userId, sessionId } });
    }

    const sessionToReturn = <SessionType>session.get({ plain: true });
    sessionToReturn.revoked = true;
    await session.update(sessionToReturn);

    return sessionToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: sessionId,
    });
  }
}
