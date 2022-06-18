import BaseModel from '../../utils/database/model.base';
import VariableModel from '../../models/variable';
import { VariableType } from '../../config/entities';
import { Catch } from '../../utils/decorators/error';

import update from './variable.update';
import getValue from './variable.getValue';

/**
 * Variable
 */
export default class Variable extends BaseModel<VariableModel, VariableType> {
  constructor() {
    super(VariableModel);
  }

  @Catch()
  async update(idOrKey: string, data: Omit<VariableType, 'id'>) {
    return update(idOrKey, data);
  }

  @Catch()
  async getValue(key: string): Promise<VariableType> {
    return getValue(key);
  }
}
