import BaseModel from '../../utils/database/model.base';
import TriggerModel from '../../models/trigger';
import { TriggerType } from '../../config/entities';

/**
 * Trigger
 */
export default class Trigger extends BaseModel<TriggerModel, TriggerType> {
  constructor() {
    super(TriggerModel);
  }
}
