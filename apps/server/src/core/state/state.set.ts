import { StateAttributes, StateCreationAttributes, StateCreationKeys } from '@friday/shared';
import State from '../../models/state';
import logger from '../../utils/log';
import { exclude, pick } from '../../utils/object';

/**
 * Set a state.
 * @param {StateType} data -A state object.
 * @returns {Promise<StateAttributes>} Resolve with state.
 * @example
 * ````
 * friday.state.set({
 *   owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
 *   ownerType: StateOwner.USER,
 *   value: AvailableState.USER_AT_HOME
 * });
 * ````
 */
export default async function set(data: StateCreationAttributes): Promise<StateAttributes> {
  // Check if old state exist
  const existingState = await State.findOne({
    where: {
      owner: data.owner,
      last: true,
    },
  });

  // If old state exist, update it
  if (existingState !== null) {
    const plainStateToUpdate = <StateAttributes>existingState.get({ plain: true });
    plainStateToUpdate.last = false;
    await existingState.update(plainStateToUpdate);
  }

  // And then, create the new state
  const pickedData = pick(data as never, StateCreationKeys);
  const newState = await State.create(pickedData);

  logger.success(`State ${data.value} created for ${data.ownerType} ${data.owner}`);

  return exclude(<StateAttributes>newState.get({ plain: true }));
}
