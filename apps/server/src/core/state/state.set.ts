import { StateAttributes, StateCreationAttributes } from '@friday/shared';
import State from '../../models/state';
import logger from '../../utils/log';

/**
 * Set a state.
 * @param {StateType} data -A state object.
 * @returns {Promise<StateAttributes>} Resolve with state.
 * @example
 * ````
 * friday.state.set({
 *   id: '9a05e6c3-e36a-4779-bc66-6f7d015920c7',
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
  const newState = await State.create(data);

  logger.success(`State ${data.value} created for ${data.ownerType} ${data.owner}`);

  return <StateAttributes>newState.get({ plain: true });
}
