import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, IsUUID, AllowNull } from 'sequelize-typescript';
import { State_owner } from '../utils/constants';
import User from './user';
import Satellite from './satellite';
import Room from './room';
import House from './house';
import Device from './device';
import Plugin from './plugin';

@Table({
  tableName: 'state',
  underscored: true
})
export default class State extends Model<State> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({type: DataType.INTEGER})
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @ForeignKey(() => Room)
  @ForeignKey(() => House)
  @ForeignKey(() => Plugin)
  @ForeignKey(() => Satellite)
  @ForeignKey(() => Device)
  @Column(DataType.INTEGER)
  owner: number;

  @AllowNull(false)
  @Column
  owner_type: State_owner;

  @AllowNull(false)
  @Column
  value: string;

}
