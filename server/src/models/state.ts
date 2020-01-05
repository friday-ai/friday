import { Table, Column, Model, PrimaryKey, DataType, IsUUID, AllowNull, BelongsTo, Unique, DefaultScope, Default } from 'sequelize-typescript';
import { StateOwner } from '../utils/constants';
import User from './user';
import Satellite from './satellite';
import Room from './room';
import House from './house';
import Device from './device';
import Plugin from './plugin';
import { v4 as uuid } from 'uuid';

/**
 * State model
 */
@DefaultScope({
  attributes: ['id', 'owner', 'ownerType', 'value']
})
@Table({
  tableName: 'state',
  underscored: false
})
export default class State extends Model<State> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(uuid())
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Column(DataType.UUIDV4)
  owner!: string;

  @AllowNull(false)
  @Column
  ownerType!: StateOwner;

  @AllowNull(false)
  @Column
  value!: string;

  @BelongsTo(() => User, {
    foreignKey: 'owner',
    constraints: false
  })
  user?: User;

  @BelongsTo(() => Room, {
    foreignKey: 'owner',
    constraints: false
  })
  room?: Room;

  @BelongsTo(() => House, {
    foreignKey: 'owner',
    constraints: false
  })
  house?: House;

  @BelongsTo(() => Plugin, {
    foreignKey: 'owner',
    constraints: false
  })
  plugin?: Plugin;

  @BelongsTo(() => Satellite, {
    foreignKey: 'owner',
    constraints: false
  })
  satellite?: Satellite;

  @BelongsTo(() => Device, {
    foreignKey: 'owner',
    constraints: false
  })
  device?: Device;

}
