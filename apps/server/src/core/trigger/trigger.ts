import { TriggerAttributes, TriggerCreationAttributes, TriggerCreationKeys } from '@friday-ai/shared';
import BaseModel from '../../utils/database/model.base';
import TriggerModel from '../../models/trigger';

/**
 * Trigger
 */
export default class Trigger extends BaseModel<TriggerModel, TriggerAttributes, TriggerCreationAttributes> {
  constructor() {
    super(TriggerModel, TriggerCreationKeys);
  }
}
