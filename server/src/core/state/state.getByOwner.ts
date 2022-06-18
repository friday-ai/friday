import sequelize from 'sequelize';
import State from '../../models/state';
import { StateType } from '../../config/entities';
import { NotFoundError } from '../../utils/decorators/error';

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
  const state = await State.findOne({
    where: { owner },
    order: [sequelize.literal('updatedAt DESC')],
  });

  if (state === null) {
    throw new NotFoundError({ name: 'Get State by owner', message: 'State not found', metadata: owner });
  }

  return <StateType>state.get({ plain: true });
}
