import { EventEmitter } from 'events';
import { EventsType } from './constants';

/**
 * Event
 */
export default class Event {
  public emitter = new EventEmitter();

  emit = (event: EventsType, ...args: any) => {
    this.emitter.emit(event, ...args);
  };

  on = (event: EventsType, cb: (...args: any[]) => void) => {
    this.emitter.on(event, cb);
  };
}
