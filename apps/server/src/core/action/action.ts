import BaseModel from '../../utils/database/model.base';
import { ActionType } from '../../config/entities';
import ActionModel from '../../models/action';

/**
 * Action
 */
export default class Action extends BaseModel<ActionModel, ActionType> {
  constructor() {
    super(ActionModel);
  }
}
