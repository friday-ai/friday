import State from '../../models/state';
import StateType from './state.interface';
import error from '../../utils/errors/coreError';

/**
 * Set a state.
 * @param {StateType} state -A state object.
 * @returns {Promise<StateType[]>} Resolve with state.
 * @example
 * ````
 * friday.state.getByOwner({
 *   id: '9a05e6c3-e36a-4779-bc66-6f7d015920c7',
 *   owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
 *   ownerType: StateOwner.USER,
 *   value: AvailableState.USER_AT_HOME
 * };
 * ````
 */
export default async function create(state: StateType): Promise<StateType> {
  try {
    const createdState = await State.create(state);
    let stateToReturn = <StateType>createdState.get({ plain: true });
    return stateToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: state});
  }
}
