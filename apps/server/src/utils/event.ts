/* eslint-disable @typescript-eslint/no-explicit-any */
import { DevicesActions } from '@friday/shared';
import { EventEmitter } from 'events';
import { EventsType } from '../config/constants';

/**
 * Event
 */
export default class Event {
  public static emitter = new EventEmitter();

  static emit(event: EventsType | DevicesActions, ...args: any) {
    this.emitter.emit(event, ...args);
  }

  static on(event: EventsType | DevicesActions, cb: (...args: any[]) => void) {
    this.emitter.on(event, cb);
  }
}
