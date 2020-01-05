import { Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, NotEmpty, Unique, DefaultScope, Scopes, Default } from 'sequelize-typescript';

import Plugin from './plugin';
import Room from './room';
import { AvailableTypeOfDevice, AvailableSubTypeOfDevice } from '../utils/constants';
import State from './state';
import { v4 as uuid } from 'uuid';

/**
 * Device model
 */
@DefaultScope({
  attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId']
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => Room, () => Plugin, () => State]
  },
  withRoom: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => Room]
  },
  withPlugin: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => Plugin]
  },
  withState: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => State]
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
  @Default(uuid())
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
    foreignKey: 'roomId',
    constraints: false
  })
  room!: Room;

  @Column(DataType.UUIDV4)
  pluginId!: string;

  @BelongsTo(() => Plugin, {
    foreignKey: 'pluginId',
    constraints: false
  })
  plugin!: Plugin;

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state!: State;

}
