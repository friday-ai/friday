import type { RoomAttributes, RoomCreationAttributes } from "@friday-ai/shared";
import { AvailableState, RoomsCreationKeys, StateOwner } from "@friday-ai/shared";
import RoomModel from "../../models/room";
import BaseModel from "../../utils/database/model.base";
import { Catch } from "../../utils/decorators/error";
import type StateClass from "../state/state";

/**
 * Room
 */
export default class Room extends BaseModel<RoomModel, RoomAttributes, RoomCreationAttributes> {
  public state: StateClass;

  constructor(state: StateClass) {
    super(RoomModel, RoomsCreationKeys);
    this.state = state;
  }

  @Catch()
  async create(data: RoomCreationAttributes) {
    const room = await super.create(data);

    // Set default state for room
    await this.state.set({
      owner: room.id,
      ownerType: StateOwner.ROOM,
      value: AvailableState.ROOM_EMPTY,
      last: true,
    });

    return room;
  }
}
