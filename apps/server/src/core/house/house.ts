import BaseModel from '../../utils/database/model.base';
import HouseModel from '../../models/house';
import { HouseType } from '../../config/entities';
import StateClass from '../state/state';
import { Catch } from '../../utils/decorators/error';
import { AvailableState, StateOwner } from '../../config/constants';

/**
 * House
 */
export default class House extends BaseModel<HouseModel, HouseType> {
  public state: StateClass;

  constructor(state: StateClass) {
    super(HouseModel);
    this.state = state;
  }

  @Catch()
  async create(data: Omit<HouseType, 'id'>) {
    const house = await super.create(data);

    // Set default state for house
    await this.state.set({
      owner: house.id!,
      ownerType: StateOwner.HOUSE,
      value: AvailableState.HOUSE_NOT_EMPTY,
      last: true,
    });

    return house;
  }
}
