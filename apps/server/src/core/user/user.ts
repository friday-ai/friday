import type { UserAttributes, UserCreationAttributes } from '@friday-ai/shared';
import { AvailableState, StateOwner, UserCreationKeys } from '@friday-ai/shared';
import UserModel from '../../models/user';
import BaseModel from '../../utils/database/model.base';
import { Catch } from '../../utils/decorators/error';
import StateClass from '../state/state';

import login from './user.login';

/**
 * User
 */
export default class User extends BaseModel<UserModel, UserAttributes, UserCreationAttributes> {
  public state: StateClass;

  constructor(state: StateClass) {
    super(UserModel, UserCreationKeys);
    this.state = state;
  }

  @Catch()
  async create(data: UserCreationAttributes): Promise<Omit<UserAttributes, 'password'>> {
    const user = await super.create(data);

    // Set default state for user
    await this.state.set({
      owner: user.id,
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
      last: true,
    });

    return user;
  }

  @Catch()
  async login(email: string, password: string) {
    return login(email, password);
  }
}
