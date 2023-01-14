import { RoomAttributes, RoomCreationAttributes, AvailableState, StateOwner, RoomsCreationKeys } from '@friday/shared';
import BaseModel from '../../utils/database/model.base';
import RoomModel from '../../models/room';
import StateClass from '../state/state';
import { Catch } from '../../utils/decorators/error';

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
