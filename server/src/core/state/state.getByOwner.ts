import State from '../../models/state';
import StateType from './state.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Get a state by owner.
 * @param {String} owner - Id of owner.
 * @returns {Promise<StateType[]>} Resolve with state.
 * @example
 * ````
 * friday.state.getByOwner('88e5b907-d62d-433c-8811-999c9ed72453')
 * ````
 */
export default async function getByOwner(owner: string): Promise<StateType> {
  try {
    const state = await State.findOne({
      where: { owner },
    });

    if (state === null) {
      throw new NotFoundError({ name: 'Get State by owner', message: 'State not found', metadata: owner });
    }

    const stateToReturn = <StateType>state.get({ plain: true });

    return stateToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: owner,
    });
  }
}
