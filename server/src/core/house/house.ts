import BaseModel from '../../utils/database/model.base';
import HouseModel from '../../models/house';
import { HouseType } from '../../config/entities';

/**
 * House
 */
export default class House extends BaseModel<HouseModel, HouseType> {
  constructor() {
    super(HouseModel);
  }
}
