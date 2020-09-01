import {
  Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, NotEmpty, Unique, DefaultScope, Scopes, Default, Is,
} from 'sequelize-typescript';

import Plugin from './plugin';
import Room from './room';
import { AvailableTypeOfDevice, AvailableSubTypeOfDevice } from '../utils/constants';
import State from './state';
import { isOwnerExisting } from '../utils/databaseValidation';

/**
 * Device model
 */
@DefaultScope({
  attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => Room, () => Plugin, () => State],
  },
  withRoom: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => Room],
  },
  withPlugin: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => Plugin],
  },
  withState: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [() => State],
  },
})
@Table({
  tableName: 'device',
  underscored: false,
})
export default class Device extends Model<Device> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
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

  @Default({})
  @Column(DataType.JSON)
  variable: any;

  @Default('')
  @Column
  unit!: string;

  @Default('')
  @Column
  value!: string;

  @NotEmpty
  @Is('roomId', (value) => isOwnerExisting(value, ['room']))
  @Column(DataType.UUIDV4)
  roomId!: string;

  @BelongsTo(() => Room, {
    foreignKey: 'roomId',
    constraints: false,
  })
  room!: Room;

  @NotEmpty
  @Is('pluginId', (value) => isOwnerExisting(value, ['plugin']))
  @Column(DataType.UUIDV4)
  pluginId!: string;

  @BelongsTo(() => Plugin, {
    foreignKey: 'pluginId',
    constraints: false,
  })
  plugin!: Plugin;

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false,
  })
  state!: State;
}
