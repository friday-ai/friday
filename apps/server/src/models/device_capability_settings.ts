import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  Is,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import type { DeviceCapabilitySettingsSchema, DcsCreationAttributes, DcsAttributes } from '@friday-ai/shared';
import Device from './device';
import DeviceCapability from './device_capability';
import { isOwnerExisting } from '../utils/database/validation';

/**
 * Device capability settings model
 */
@DefaultScope(() => ({
  attributes: ['id', 'capabilityId', 'settings'],
}))
@Table({
  tableName: 'device_capability_settings',
  underscored: false,
})
export default class DeviceCapabilitySettings extends Model<DcsAttributes, DcsCreationAttributes> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @NotEmpty
  @Is('capabilityId', (value) => isOwnerExisting(value, ['device_capability']))
  @Column(DataType.UUIDV4)
  capabilityId!: string;

  @AllowNull(true)
  @Column(DataType.JSON)
  settings!: DeviceCapabilitySettingsSchema;

  @BelongsTo(() => Device, {
    foreignKey: 'capabilityId',
    constraints: false,
  })
  capability?: DeviceCapability;
}
