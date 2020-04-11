import set from './state.set';
import getByOwner from './state.getByOwner';
import purge from './state.purge';
import EventClass from '../../utils/event';
import VariableClass from '../variable';
import { EventsType } from '../../utils/constants';

/**
 * State
 */
export default class State {
  set = set;
  getByOwner = getByOwner;
  purge = purge;

  public variable: VariableClass;

  constructor(event: EventClass, variable: VariableClass) {
    this.variable = variable;
    event.on(EventsType.STATES_PURGE, purge);
  }
}
