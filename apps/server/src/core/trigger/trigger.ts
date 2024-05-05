import { type TriggerAttributes, type TriggerCreationAttributes, TriggerCreationKeys } from "@friday-ai/shared";
import TriggerModel from "../../models/trigger";
import BaseModel from "../../utils/database/model.base";

/**
 * Trigger
 */
export default class Trigger extends BaseModel<TriggerModel, TriggerAttributes, TriggerCreationAttributes> {
  constructor() {
    super(TriggerModel, TriggerCreationKeys);
  }
}
