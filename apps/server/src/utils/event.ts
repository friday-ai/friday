import { EventEmitter } from "node:events";
import type { DevicesActions } from "@friday-ai/shared";
import type { EventsType } from "../config/constants";

/**
 * Event
 */
const Event = {
  emitter: new EventEmitter(),

  // biome-ignore lint/suspicious/noExplicitAny: "Any" type is necessary here to have flexibility
  emit(event: EventsType | DevicesActions, ...args: any) {
    Event.emitter.emit(event, ...args);
  },

  // biome-ignore lint/suspicious/noExplicitAny: "Any" type is necessary here to have flexibility
  on(event: EventsType | DevicesActions, cb: (...args: any[]) => void) {
    Event.emitter.on(event, cb);
  },
};

export default Event;
