import BaseModel from '../../utils/database/model.base';
import UserModel from '../../models/user';
import { UserType } from '../../config/entities';
import { Catch } from '../../utils/decorators/error';
import StateClass from '../state/state';
import { AvailableState, StateOwner } from '../../config/constants';

import login from './user.login';

/**
 * User
 */
export default class User extends BaseModel<UserModel, UserType> {
  public state: StateClass;

  constructor(state: StateClass) {
    super(UserModel);
    this.state = state;
  }

  @Catch()
  async create(data: Omit<UserType, 'id'>) {
    const user = await super.create(data);

    // Set default state for user
    await this.state.set({
      owner: user.id!,
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
      last: true,
    });

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

