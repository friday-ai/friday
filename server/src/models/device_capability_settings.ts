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
import Device from './device';
import { isOwnerExisting } from '../utils/database/validation';
import DeviceCapability from './device_capability';

/**
 * Device capability settings model
 */
@DefaultScope(() => ({
  attributes: ['id', 'capabilityId', 'value'],
}))
@Table({
  tableName: 'device_capability_settings',
  underscored: false,
})
export default class DeviceCapabilitySettings extends Model {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUIDV4 })
    id!: string;

  @AllowNull(false)
  @NotEmpty
  @Is('capabilityId', (value) => isOwnerExisting(value, ['device_capability']))
  @Column(DataType.UUIDV4)
    capabilityId!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
    type!: string;

  @AllowNull(false)
  @Column(DataType.JSON)
    value!: string;

  @BelongsTo(() => Device, {
    foreignKey: 'capabilityId',
    constraints: false,
  })
    capability?: DeviceCapability;
}
