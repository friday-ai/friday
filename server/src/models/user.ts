import {
  Table, Column, Model, PrimaryKey, DataType, HasOne, IsDate, IsUUID,
  Default, AllowNull, Unique, IsEmail, NotEmpty, Length, DefaultScope, BeforeCreate, Scopes, HasMany,
} from 'sequelize-typescript';

import Variable from './variable';
import { UserRole, AvailableLanguages } from '../utils/constants';
import State from './state';
import { hash } from '../utils/password';
import Session from './session';

/**
 * User model
 */
@DefaultScope({
  attributes: ['id', 'name', 'firstName', 'email', 'birthDate'],
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language'],
    include: [() => State, () => Variable],
  },
  withState: {
    attributes: ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language'],
    include: [() => State],
  },
  withVariables: {
    attributes: ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language'],
    include: [() => Variable],
  },
})
@Table({
  tableName: 'user',
  underscored: false,
})
export default class User extends Model<User> {
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
  name!: string;

  @AllowNull(false)
  @Column
  firstName!: string;

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
  @IsDate
  @Column({ type: DataType.DATEONLY })
  birthDate!: Date;

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
    user.password = await hash(user.password!);
  }
}
