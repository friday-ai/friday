import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, IsUUID, AllowNull } from 'sequelize-typescript';
import { Variable_owner } from '../utils/constants';
import User from './user';
import Plugin from './plugin';
import Satellite from './satellite';

@Table({
  tableName: 'variable',
  underscored: true
})
export default class Variable extends Model<Variable> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column
  key!: string;

  @AllowNull(false)
  @Column
  value!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @ForeignKey(() => Plugin)
  @ForeignKey(() => Satellite)
  @Column(DataType.INTEGER)
  owner!: number;

  @AllowNull(false)
  @Column
  ownerType!: Variable_owner;
}
