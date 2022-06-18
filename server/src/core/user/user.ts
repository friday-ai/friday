import BaseModel from '../../utils/database/model.base';
import UserModel from '../../models/user';
import { UserType } from '../../config/entities';

import login from './user.login';
import { Catch } from '../../utils/decorators/error';

/**
 * User
 */
export default class User extends BaseModel<UserModel, UserType> {
  constructor() {
    super(UserModel);
  }

  @Catch()
  async create(data: Omit<UserType, 'id'>) {
    const user = await super.create(data);
    delete user.password;
    return user;
  }

  @Catch()
  async update(identifier: string, data: Omit<UserType, 'id'>) {
    const user = await super.update(identifier, data);
    delete user.password;
    return user;
  }

  @Catch()
  async login(email: string, password: string) {
    return login(email, password);
  }
}

