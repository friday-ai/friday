import { type VariableAttributes, type VariableCreationAttributes, VariableCreationKeys } from "@friday-ai/shared";
import VariableModel from "../../models/variable";
import BaseModel from "../../utils/database/model.base";
import { Catch } from "../../utils/decorators/error";

import getValue from "./variable.getValue";
import update from "./variable.update";

/**
 * Variable
 */
export default class Variable extends BaseModel<VariableModel, VariableAttributes, VariableCreationAttributes> {
  constructor() {
    super(VariableModel, VariableCreationKeys);
  }

  @Catch()
  async update(idOrKey: string, data: Partial<VariableAttributes>) {
    return update(idOrKey, data);
  }

  @Catch()
  async getValue(key: string): Promise<VariableAttributes> {
    return getValue(key);
  }
}
