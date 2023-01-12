import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  Is,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';

import { DeviceAttributes, DeviceCreationAttributes, DevicesTypes } from '@friday/shared';
import Plugin from './plugin';
import Room from './room';
import DeviceCapability from './device_capability';
import { isOwnerExisting } from '../utils/database/validation';

/**
 * Device model
 */
@DefaultScope(() => ({
  attributes: [
    'id',
    'defaultName',
    'defaultManufacturer',
    'defaultModel',
    'name',
    'type',
    'manufacturer',
    'model',
    'pluginSelector',
    'viaDevice',
    'roomId',
    'pluginId',
  ],
}))
@Scopes(() => ({
  full: {
    attributes: [
      'id',
      'defaultName',
      'defaultManufacturer',
      'defaultModel',
      'name',
      'type',
      'manufacturer',
      'model',
      'pluginSelector',
      'viaDevice',
      'roomId',
      'pluginId',
    ],
    include: [Room, Plugin, DeviceCapability],
  },
  withRoom: {
    attributes: [
      'id',
      'defaultName',
      'defaultManufacturer',
      'defaultModel',
      'name',
      'type',
      'manufacturer',
      'model',
      'pluginSelector',
      'viaDevice',
      'roomId',
      'pluginId',
    ],
    include: [Room],
  },
  withPlugin: {
    attributes: [
      'id',
      'defaultName',
      'defaultManufacturer',
      'defaultModel',
      'name',
      'type',
      'manufacturer',
      'model',
      'pluginSelector',
      'viaDevice',
      'roomId',
      'pluginId',
    ],
    include: [Plugin],
  },
  withCapabilities: {
    attributes: [
      'id',
      'defaultName',
      'defaultManufacturer',
      'defaultModel',
      'name',
      'type',
      'manufacturer',
      'model',
      'pluginSelector',
      'viaDevice',
      'roomId',
      'pluginId',
    ],
    include: [{ model: DeviceCapability.scope('withSettings') }],
  },
}))
@Table({
  tableName: 'device',
  underscored: false,
})
export default class Device extends Model<DeviceAttributes, DeviceCreationAttributes> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  defaultName!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  defaultManufacturer!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  defaultModel!: string;

  @AllowNull(true)
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  type!: DevicesTypes;

  @AllowNull(true)
  @Column
  manufacturer!: string;

  @AllowNull(true)
  @Column
  model!: string;

  @AllowNull(true)
  @Column
  pluginSelector!: string;

  @AllowNull(true)
  @Is('viaDevice', (value) => (value !== undefined ? isOwnerExisting(value, ['device']) : true))
  @Column(DataType.UUIDV4)
  viaDevice!: string;

  @NotEmpty
  @AllowNull(true)
  @Is('roomId', (value) => (value !== undefined ? isOwnerExisting(value, ['room']) : true))
  @Column(DataType.UUIDV4)
  roomId!: string;

  @NotEmpty
  @Is('pluginId', (value) => isOwnerExisting(value, ['plugin']))
  @Column(DataType.UUIDV4)
  pluginId!: string;

  @BelongsTo(() => Device, {
    foreignKey: 'viaDevice',
    constraints: false,
  })
  device!: Device;

  @BelongsTo(() => Room, {
    foreignKey: 'roomId',
    constraints: false,
  })
  room!: Room;

  @BelongsTo(() => Plugin, {
    foreignKey: 'pluginId',
    constraints: false,
  })
  plugin!: Plugin;

  @HasMany(() => DeviceCapability, {
    foreignKey: 'deviceId',
    constraints: false,
  })
  capabilities!: DeviceCapability[];
}
