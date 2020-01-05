import Session from '../../models/session';
import SessionType from './session.interface';
import { GetOptions } from '../../utils/interfaces';
import error from '../../utils/errors/coreError';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

/**
 * Get all sessions.
 * @param {Getoptions} options - Options of the query.
 * @returns {Promise<SessionType[]>} Resolve with session array.
 * @example
 * ````
 * friday.session.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<SessionType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let sessions;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      sessions = await Session.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip,
        where: {
          revoked: false
        }
      });
    } else {
      sessions = await Session.findAll({
        limit: options.take,
        offset: options.skip,
        where: {
          revoked: false
        }
      });
    }

    const sessionsPlain = <SessionType[]>sessions.map((user) => {
      const sessionPlain = user.get({ plain: true });
      return sessionPlain;
    });

    return sessionsPlain;

  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: options});
  }
}
