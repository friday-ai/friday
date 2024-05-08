import type { HouseAttributes, HouseCreationAttributes } from "@friday-ai/shared";
import { AvailableState, HouseCreationKeys, StateOwner } from "@friday-ai/shared";
import HouseModel from "../../models/house";
import BaseModel from "../../utils/database/model.base";
import { Catch } from "../../utils/decorators/error";
import type StateClass from "../state/state";

/**
 * House
 */
export default class House extends BaseModel<HouseModel, HouseAttributes, HouseCreationAttributes> {
  public state: StateClass;

  constructor(state: StateClass) {
    super(HouseModel, HouseCreationKeys);
    this.state = state;
  }

  @Catch()
  async create(data: HouseCreationAttributes) {
    const house = await super.create(data);

    // Set default state for house
    await this.state.set({
      owner: house.id,
      ownerType: StateOwner.HOUSE,
      value: AvailableState.HOUSE_NOT_EMPTY,
      last: true,
    });

    return house;
  }
}
