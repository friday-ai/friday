import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasOne,
  Is,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';
import { isOwnerExisting } from '../utils/database/validation';
import Room from './room';
import Device from './device';
import DeviceCapabilityState from './device_capability_state';
import DeviceCapabilitySettings from './device_capability_settings';
import { DevicesCapabilityType } from '../config/device';

/**
 * Device capability model
 */
@DefaultScope(() => ({
  attributes: ['id', 'defaultName', 'name', 'type', 'deviceId', 'roomId'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'defaultName', 'name', 'type', 'deviceId', 'roomId'],
    include: [Device, Room, DeviceCapabilitySettings, { model: DeviceCapabilityState, where: { last: true } }],
  },
  withRoom: {
    attributes: ['id', 'defaultName', 'name', 'type', 'deviceId', 'roomId'],
    include: [Room],
  },
  withDevice: {
    attributes: ['id', 'defaultName', 'name', 'type', 'deviceId', 'roomId'],
    include: [Device],
  },
  withState: {
    attributes: ['id', 'defaultName', 'name', 'type', 'deviceId', 'roomId'],
    include: [{ model: DeviceCapabilityState, where: { last: true } }],
  },
  withSettings: {
    attributes: ['id', 'defaultName', 'name', 'type', 'deviceId', 'roomId'],
    include: [DeviceCapabilitySettings],
  },
}))
@Table({
  tableName: 'device_capability',
  underscored: false,
})
export default class DeviceCapability extends Model {
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

  @AllowNull(true)
  @Column
    name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
    type!: DevicesCapabilityType;

  @AllowNull(false)
  @NotEmpty
  @Is('deviceId', (value) => isOwnerExisting(value, ['device']))
  @Column(DataType.UUIDV4)
    deviceId!: string;

  @NotEmpty
  @Is('roomId', (value) => isOwnerExisting(value, ['room']))
  @Column(DataType.UUIDV4)
    roomId!: string;

  @BelongsTo(() => Device, {
    foreignKey: 'deviceId',
    constraints: false,
  })
    device!: Device;

  // TODO: get by default device room if is not set
  @BelongsTo(() => Room, {
    foreignKey: 'roomId',
    constraints: false,
  })
    room!: Room;

  @HasOne(() => DeviceCapabilityState, {
    foreignKey: 'capabilityId',
    constraints: false,
  })
    state!: DeviceCapabilityState;
}
