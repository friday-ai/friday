import { Table, Column, Model, PrimaryKey, HasMany, DataType, HasOne, IsDate, IsUUID, Default, AllowNull, Unique, IsEmail, NotEmpty } from 'sequelize-typescript';
import Variable from './variable';
import { User_role, Available_languages } from '../utils/constants';
import State from './state';

@Table({
  tableName: 'user',
  underscored: true
})
export default class User extends Model<User> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  first_name!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column
  email!: string;

  @AllowNull(false)
  @IsDate
  @Column
  birth_date !: Date;

  @AllowNull(false)
  @NotEmpty
  @Column
  password_hash!: string;

  @AllowNull(false)
  @Default(User_role.HABITANT)
  @Column({ type: DataType.ENUM() })
  role!: User_role;

  @AllowNull(false)
  @Column({ type: DataType.ENUM })
  language!: Available_languages;

  @HasMany(() => Variable)
  variable?: Variable[];

  @HasOne(() => State)
  state?: State;

}
