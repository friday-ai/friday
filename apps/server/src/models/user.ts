import {
  AllowNull,
  BeforeCreate,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  HasOne,
  IsEmail,
  IsUUID,
  Length,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';

import { UserAttributes, AvailableLanguages, UserRole, UserCreationAttributes } from '@friday/shared';
import Variable from './variable';
import State from './state';
import Session from './session';
import { hash } from '../utils/password';

/**
 * User model
 */
@DefaultScope(() => ({
  attributes: ['id', 'userName', 'email', 'theme', 'role', 'language'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'userName', 'email', 'theme', 'role', 'language'],
    include: [Variable, { model: State, where: { last: true } }],
  },
  withState: {
    attributes: ['id', 'userName', 'email', 'theme', 'role', 'language'],
    include: [{ model: State, where: { last: true } }],
  },
  withVariables: {
    attributes: ['id', 'userName', 'email', 'theme', 'role', 'language'],
    include: [Variable],
  },
}))
@Table({
  tableName: 'user',
  underscored: false,
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  userName!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @NotEmpty
  @Column
  email!: string;

  @AllowNull(false)
  @Length({ min: 10 })
  @NotEmpty
  @Column
  password!: string;

  @AllowNull(true)
  @Column
  theme!: string;

  @AllowNull(false)
  @Default(UserRole.HABITANT)
  @Column
  role!: UserRole;

  @AllowNull(false)
  @Default(AvailableLanguages.EN)
  @Column
  language!: AvailableLanguages;

  @HasMany(() => Variable, {
    foreignKey: 'owner',
    constraints: false,
  })
  variables?: Variable[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false,
  })
  state?: State;

  @HasMany(() => Session, {
    foreignKey: 'userId',
    constraints: false,
  })
  session?: Session[];

  /**
   * Function to hash password before saving in the database
   */
  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await hash(user.password);
  }
}