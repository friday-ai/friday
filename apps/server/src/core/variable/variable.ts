import { VariableAttributes, VariableCreationAttributes, VariableCreationKeys } from '@friday-ai/shared';
import BaseModel from '../../utils/database/model.base';
import VariableModel from '../../models/variable';
import { Catch } from '../../utils/decorators/error';

import update from './variable.update';
import getValue from './variable.getValue';

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
