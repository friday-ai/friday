import sequelize from 'sequelize';
import { StateAttributes } from '@friday/shared';
import State from '../../models/state';
import { NotFoundError } from '../../utils/decorators/error';

/**
 * Get a state by owner.
 * @param {String} owner - Id of owner.
 * @returns {Promise<StateAttributes>} Resolve with state.
 * @example
 * ````
 * friday.state.getByOwner('88e5b907-d62d-433c-8811-999c9ed72453')
 * ````
 */
export default async function getByOwner(owner: string): Promise<StateAttributes> {
  const state = await State.findOne({
    where: { owner },
    order: [sequelize.literal('updatedAt DESC')],
  });

  if (state === null) {
    throw new NotFoundError({ name: 'Get State by owner', message: 'State not found', metadata: owner });
  }

  return <StateAttributes>state.get({ plain: true });
}
