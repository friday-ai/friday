import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, DataType, HasOne, IsUUID, AllowNull } from 'sequelize-typescript';
import Plugin from './plugin';
import Room from './room';
import { Available_type_of_device, Available_sub_type_of_device } from '../utils/constants';
import State from './state';

@Table({
  tableName: 'device',
  underscored: true
})
export default class Device extends Model<Device> {

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
  type: Available_type_of_device;

  @AllowNull(false)
  @Column
  sub_type: Available_sub_type_of_device;

  @Column(DataType.JSON)
  variable: any;

  @Column
  variable_value: string;

  @Column
  unit: string;

  @Column
  value: string;

  @ForeignKey(() => Room)
  @Column(DataType.INTEGER)
  room_id: number;

  @BelongsTo(() => Room)
  room: Room;

  @ForeignKey(() => Plugin)
  @Column(DataType.INTEGER)
  plugin_id: number;

  @BelongsTo(() => Plugin)
  plugin: Plugin;

  @HasOne(() => State)
  state: State;

}
