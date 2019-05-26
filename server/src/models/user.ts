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
  @Column({type: DataType.INTEGER})
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column
  first_name: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @IsDate
  @Column
  date_of_birth: Date;

  @AllowNull(false)
  @NotEmpty
  @Column
  password_hash: string;

  @AllowNull(false)
  @Default('habitant')
  @Column
  role: User_role;

  @AllowNull(false)
  @Column
  language: Available_languages;

  @HasMany(() => Variable)
  variable: Variable[];

  @HasOne(() => State)
  state: State;

}
