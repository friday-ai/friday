import BaseModel from '../../utils/database/model.base';
import RoomModel from '../../models/room';
import { RoomType } from '../../config/entities';
import StateClass from '../state/state';
import { Catch } from '../../utils/decorators/error';
import { AvailableState, StateOwner } from '../../config/constants';

/**
 * Room
 */
export default class Room extends BaseModel<RoomModel, RoomType> {
  public state: StateClass;

  constructor(state: StateClass) {
    super(RoomModel);
    this.state = state;
  }

  @Catch()
  async create(data: Omit<RoomType, 'id'>) {
    const room = await super.create(data);

    // Set default state for room
    await this.state.set({
      owner: room.id!,
      ownerType: StateOwner.ROOM,
      value: AvailableState.ROOM_EMPTY,
      last: true,
    });

    return room;
  }
}
