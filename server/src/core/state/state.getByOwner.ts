import State from '../../models/state';
import StateType from './state.interface';
import Log from '../../utils/log';
const logger = new Log();

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
