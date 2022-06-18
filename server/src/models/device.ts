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
  Validate,
} from 'sequelize-typescript';

import Plugin from './plugin';
import Room from './room';
import State from './state';
import { isOwnerExisting } from '../utils/database/validation';
import { DEVICE_SUBTYPE_LIST } from '../config/device';
import { DatabaseValidationError } from '../utils/decorators/error';

/**
 * Device model
 */
@DefaultScope(() => ({
  attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [Room, Plugin, State],
  },
  withRoom: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [Room],
  },
  withPlugin: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [Plugin],
  },
  withState: {
    attributes: ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
    include: [State],
  },
}))
@Table({
  tableName: 'device',
  underscored: false,
})
export default class Device extends Model {
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
  @Validate({
    async checkSubtypeInstall(this: Device) {
      if (!(this.type in DEVICE_SUBTYPE_LIST)) {
        throw new DatabaseValidationError({
          message: `${this.type} is not part of the available devices`,
          name: 'device.type.not.exist',
        });
      }
    },
  })
  @Column
    type!: string;

  @AllowNull(false)
  @Validate({
    async checkSubtypeInstall(this: Device) {
      if (!(this.subType in DEVICE_SUBTYPE_LIST[this.type])) {
        throw new DatabaseValidationError({
          message: `${this.subType} is not part of the subdevices available in the device ${this.type}`,
          name: 'device.subtype.not.in.type',
        });
      }
    },
  })
  @Column
    subType!: string;

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
