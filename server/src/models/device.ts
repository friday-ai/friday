import { Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, NotEmpty, Unique, DefaultScope, Scopes } from 'sequelize-typescript';

import Plugin from './plugin';
import Room from './room';
import { AvailableTypeOfDevice, AvailableSubTypeOfDevice } from '../utils/constants';
import State from './state';

@DefaultScope({
  attributes: ['id', 'name', 'type', 'subType', 'variable', 'variableValue', 'unit', 'value'],
  include: [() => Room]
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'variableValue', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => Room, () => Plugin, () => State]
  },
  withPlugin: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'variableValue', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => Room, () => Plugin]
  },
  withState: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'variableValue', 'unit', 'value', 'roomId'],
    include: [() => Room]
  }
})
@Table({
  tableName: 'device',
  underscored: false
})
export default class Device extends Model<Device> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Unique
  @NotEmpty
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
  unit!: string;

  @Column
  value!: string;

  @Column(DataType.UUIDV4)
  roomId!: string;

  @BelongsTo(() => Room, {
    foreignKey: 'room_id'
  })
  room!: Room;

  @Column(DataType.UUIDV4)
  pluginId!: string;

  @BelongsTo(() => Plugin, {
    foreignKey: 'plugin_id'
  })
  plugin!: Plugin;

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state!: State;

}
