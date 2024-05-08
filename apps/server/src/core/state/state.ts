import type { StateCreationAttributes } from "@friday-ai/shared";
import { EventsType } from "../../config/constants";
import { Catch } from "../../utils/decorators/error";
import type EventClass from "../../utils/event";
import type VariableClass from "../variable/variable";

import getByOwner from "./state.getByOwner";
import purge from "./state.purge";
import set from "./state.set";

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
  async set(data: StateCreationAttributes) {
    return set(data);
  }

  @Catch()
  async purge() {
    return purge.call(this);
  }
}
