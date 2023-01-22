import { ScriptAttributes, ScriptCreationAttributes, ScriptCreationKeys } from '@friday-ai/shared';
import BaseModel from '../../utils/database/model.base';
import ScriptModel from '../../models/script';

/**
 * Script
 */
export default class Script extends BaseModel<ScriptModel, ScriptAttributes, ScriptCreationAttributes> {
  constructor() {
    super(ScriptModel, ScriptCreationKeys);
  }
}
