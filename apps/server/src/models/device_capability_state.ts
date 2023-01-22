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

import { DcstCreationAttributes, DcstAttributes } from '@friday-ai/shared';
import Device from './device';
import DeviceCapability from './device_capability';
import { isOwnerExisting } from '../utils/database/validation';

/**
 * Device capability state model
 */
@DefaultScope(() => ({
  attributes: ['id', 'capabilityId', 'value'],
}))
@Table({
  tableName: 'device_capability_state',
  underscored: false,
})
export default class DeviceCapabilityState extends Model<DcstAttributes, DcstCreationAttributes> {
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
  @Column
  value!: string;

  @AllowNull(false)
  @NotEmpty
  @Default(true)
  @Column
  last!: boolean;

  @BelongsTo(() => Device, {
    foreignKey: 'capabilityId',
    constraints: false,
  })
  capability?: DeviceCapability;
}
