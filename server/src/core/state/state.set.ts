import State from '../../models/state';
import { StateType } from '../../config/entities';

/**
 * Set a state.
 * @param {StateType} data -A state object.
 * @returns {Promise<StateType[]>} Resolve with state.
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
export default async function set(data: StateType): Promise<StateType> {
  // Check if old state exist
  const existingState = await State.findOne({
    where: {
      owner: data.owner,
      last: true,
    },
  });

  // If old state exist, update it
  if (existingState !== null) {
    const plainStateToUpdate = <StateType>existingState.get({ plain: true });
    plainStateToUpdate.last = false;
    await existingState.update(plainStateToUpdate);
  }

  // And then, create the new state
  const newState = await State.create({ ...data });
  return <StateType>newState.get({ plain: true });
}
