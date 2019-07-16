import State from '../../models/state';
import StateType from './state.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name state.getByOwner
 * @description Get a state by owner.
 * @param {String} owner - Id of owner.
 * @returns {Promise<StateType[]>} Resolve with state.
 * @example
 * friday.state.getByOwner('88e5b907-d62d-433c-8811-999c9ed72453')
 */
export default async function getByOwner(owner: string): Promise<StateType> {
  try {

    let state;

    state = await State.findOne({
      where: { owner: owner}
    });

    if (state === null) {
      throw logger.error('State not found');
    }

    let stateToReturn = <StateType>state.get({ plain: true });

    return stateToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
