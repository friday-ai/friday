import EventClass from '../../utils/event';
import VariableClass from '../variable/variable';
import { EventsType } from '../../config/constants';
import { Catch } from '../../utils/decorators/error';
import { StateType } from '../../config/entities';

import set from './state.set';
import getByOwner from './state.getByOwner';
import purge from './state.purge';

/**
 * State
 */
export default class State {
  public variable: VariableClass;

  constructor(event: typeof EventClass, variable: VariableClass) {
    this.variable = variable;
    event.on(EventsType.STATES_PURGE, purge);
  }

  @Catch()
  async getByOwner(owner: string) {
    return getByOwner(owner);
  }

  @Catch()
  async set(data: StateType) {
    return set(data);
  }

  @Catch()
  async purge() {
    return purge.call(this);
  }
}
