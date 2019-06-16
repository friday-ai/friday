import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, DataType, HasOne, IsUUID, AllowNull } from 'sequelize-typescript';
import Plugin from './plugin';
import Room from './room';
import { AvailableTypeOfDevice, AvailableSubTypeOfDevice } from '../utils/constants';
import State from './state';

@Table({
  tableName: 'device',
  underscored: false
})
export default class Device extends Model<Device> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  type!: AvailableTypeOfDevice;

  @AllowNull(false)
  @Column
  subType!: AvailableSubTypeOfDevice;

  @Column(DataType.JSON)
  variable: any;

  @Column
  variableValue!: string;

  @Column
  unit!: string;

  @Column
  value!: string;

  @ForeignKey(() => Room)
  @Column(DataType.INTEGER)
  roomId!: number;

  @BelongsTo(() => Room)
  room!: Room;

  @ForeignKey(() => Plugin)
  @Column(DataType.INTEGER)
  pluginId!: number;

  @BelongsTo(() => Plugin)
  plugin!: Plugin;

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state!: State;

}
