import State from '../../models/state';
import StateType from './state.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(satellite: StateType): Promise<StateType> {
  try {
    const createdState = await State.create(satellite);
    let stateToReturn = <StateType>createdState.get({ plain: true });
    return stateToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
