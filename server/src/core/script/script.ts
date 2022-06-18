import BaseModel from '../../utils/database/model.base';
import ScriptModel from '../../models/script';
import { ScriptType } from '../../config/entities';

/**
 * Script
 */
export default class Script extends BaseModel<ScriptModel, ScriptType> {
  constructor() {
    super(ScriptModel);
  }
}
