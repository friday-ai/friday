import { EventEmitter } from 'events';
import { EventsType } from '../config/constants';
import { DevicesActionsType } from '../config/device';

/**
 * Event
 */
export default class Event {
  public static emitter = new EventEmitter();

  static emit(event: EventsType | DevicesActionsType, ...args: any) {
    this.emitter.emit(event, ...args);
  }

  static on(event: EventsType | DevicesActionsType, cb: (...args: any[]) => void) {
    this.emitter.on(event, cb);
  }
}
