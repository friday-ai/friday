import { ActionAttributes, ActionCreationAttributes, ActionCreationKeys } from '@friday/shared';
import BaseModel from '../../utils/database/model.base';
import ActionModel from '../../models/action';

/**
 * Action
 */
export default class Action extends BaseModel<ActionModel, ActionAttributes, ActionCreationAttributes> {
  constructor() {
    super(ActionModel, ActionCreationKeys);
  }
}
