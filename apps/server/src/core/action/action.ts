import { type ActionAttributes, type ActionCreationAttributes, ActionCreationKeys } from "@friday-ai/shared";
import ActionModel from "../../models/action";
import BaseModel from "../../utils/database/model.base";

/**
 * Action
 */
export default class Action extends BaseModel<ActionModel, ActionAttributes, ActionCreationAttributes> {
  constructor() {
    super(ActionModel, ActionCreationKeys);
  }
}
