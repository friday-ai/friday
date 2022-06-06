import State from '../../models/state';
import StateType from './state.interface';
import error from '../../utils/errors/coreError';

/**
 * Set a state.
 * @param {StateType} state -A state object.
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
export default async function set(state: StateType): Promise<StateType> {
  try {
    // Check if old state exist
    const stateToUpdate = await State.findOne({
      where: {
        owner: state.owner,
        last: true,
      },
    });

    // If old state exist, update it
    if (stateToUpdate !== null) {
      const plainStateToUpdate = <StateType>stateToUpdate.get({ plain: true });
      plainStateToUpdate.last = false;
      await stateToUpdate.update(plainStateToUpdate);
    }

    // And then, create the new state
    const createdState = await State.create({ ...state });
    const stateToReturn = <StateType>createdState.get({ plain: true });
    return stateToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: state,
    });
  }
}
