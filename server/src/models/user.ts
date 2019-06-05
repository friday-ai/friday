import { Table, Column, Model, PrimaryKey, HasMany, DataType, HasOne, IsDate, IsUUID,
  Default, AllowNull, Unique, IsEmail, NotEmpty, Length, DefaultScope, BeforeCreate, Scopes } from 'sequelize-typescript';

import Variable from './variable';
import { User_role, Available_languages } from '../utils/constants';
import State from './state';
import { hash } from '../../src/utils/password';

@DefaultScope({
  attributes: ['id', 'name', 'first_name', 'email', 'birth_date']
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'first_name', 'email', 'birth_date', 'role', 'language'],
    include: [() => State, () => Variable]
  },
  withState: {
    attributes: ['id', 'name', 'first_name', 'email', 'birth_date', 'role', 'language'],
    include: [() => State]
  },
  withVariables: {
    attributes: ['id', 'name', 'first_name', 'email', 'birth_date', 'role', 'language'],
    include: [() => Variable]
  }
})
@Table({
  tableName: 'user',
  underscored: true
})
export default class User extends Model<User> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  first_name!: string;

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
  birth_date!: Date;

  @AllowNull(false)
  @Default(User_role.HABITANT)
  @Column
  role!: User_role;

  @AllowNull(false)
  @Default(Available_languages.EN)
  @Column
  language!: Available_languages;

  @HasMany(() => Variable)
  variables?: Variable[];

  @HasOne(() => State)
  state?: State;

  @BeforeCreate
  static async HassPassword(user: User) {
    user.password = await hash(user.password!);
  }
}
