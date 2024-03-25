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

import { StateAttributes, StateCreationAttributes, StateOwner } from '@friday-ai/shared';
import { isOwnerExisting } from '../utils/database/validation';
import House from './house';
import Plugin from './plugin';
import Room from './room';
import Satellite from './satellite';
import User from './user';

/**
 * State model
 */
@DefaultScope(() => ({
  attributes: ['id', 'owner', 'ownerType', 'value'],
}))
@Table({
  tableName: 'state',
  underscored: false,
})
export default class State extends Model<StateAttributes, StateCreationAttributes> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @NotEmpty
  @Is('owner', (value) => isOwnerExisting(value, ['user', 'room', 'house', 'satellite', 'plugin']))
  @Column(DataType.UUIDV4)
  owner!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(StateOwner)))
  ownerType!: StateOwner;

  @AllowNull(false)
  @Column(DataType.STRING)
  value!: string;

  @AllowNull(false)
  @NotEmpty
  @Default(true)
  @Column(DataType.BOOLEAN)
  last!: boolean;

  @BelongsTo(() => User, {
    foreignKey: 'owner',
    constraints: false,
  })
  user?: User;

  @BelongsTo(() => Room, {
    foreignKey: 'owner',
    constraints: false,
  })
  room?: Room;

  @BelongsTo(() => House, {
    foreignKey: 'owner',
    constraints: false,
  })
  house?: House;

  @BelongsTo(() => Plugin, {
    foreignKey: 'owner',
    constraints: false,
  })
  plugin?: Plugin;

  @BelongsTo(() => Satellite, {
    foreignKey: 'owner',
    constraints: false,
  })
  satellite?: Satellite;
}
