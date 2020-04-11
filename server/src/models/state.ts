import { Table, Column, Model, PrimaryKey, DataType, IsUUID, AllowNull, BelongsTo, Unique, DefaultScope, Default, Is, NotEmpty } from 'sequelize-typescript';
import { StateOwner } from '../utils/constants';
import User from './user';
import Satellite from './satellite';
import Room from './room';
import House from './house';
import Device from './device';
import Plugin from './plugin';
import { isOwnerExisting } from '../utils/databaseValidation';

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
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @NotEmpty
  @Is('owner', (value) => isOwnerExisting(value, ['user', 'room', 'house', 'satellite', 'plugin', 'device']))
  @Column(DataType.UUIDV4)
  owner!: string;

  @AllowNull(false)
  @Column
  ownerType!: StateOwner;

  @AllowNull(false)
  @Column
  value!: string;

  @AllowNull(false)
  @NotEmpty
  @Default(true)
  @Column
  last!: boolean;

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
