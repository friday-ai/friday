import BaseModel from '../../utils/database/model.base';
import RoomModel from '../../models/room';
import { RoomType } from '../../config/entities';

/**
 * Room
 */
export default class Room extends BaseModel<RoomModel, RoomType> {
  constructor() {
    super(RoomModel);
  }
}
