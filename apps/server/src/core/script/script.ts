import { type ScriptAttributes, type ScriptCreationAttributes, ScriptCreationKeys } from "@friday-ai/shared";
import ScriptModel from "../../models/script";
import BaseModel from "../../utils/database/model.base";

/**
 * Script
 */
export default class Script extends BaseModel<ScriptModel, ScriptAttributes, ScriptCreationAttributes> {
  constructor() {
    super(ScriptModel, ScriptCreationKeys);
  }
}
