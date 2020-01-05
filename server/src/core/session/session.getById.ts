import Session from '../../models/session';
import SessionType from './session.interface';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

/**
 * Get an session by id.
 * @param {String} id - Id of session.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<UserType>} Resolve with session.
 * @example
 * ````
 * friday.session.getById('a8ba342e-854a-4906-8670-d400c868bdb1', 'full');
 * ````
 */
export default async function getById(id: string, scope?: string): Promise<SessionType> {
  try {

    let session;

    if (scope !== '' && scope !== null && scope !== undefined) {
      session = await Session.scope(scope).findByPk(id);
    } else {
      session = await Session.findByPk(id);
    }

    if (session === null) {
      throw new NotFoundError({name: 'Get Session by Id', message: 'Session not found', metadata: id});
    }

    let sessionToReturn = <SessionType>session.get({ plain: true });

    return sessionToReturn;

  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
