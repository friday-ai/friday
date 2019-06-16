import { Table, Column, Model, PrimaryKey, DataType, IsUUID, AllowNull, BelongsTo, Unique, NotEmpty } from 'sequelize-typescript';
import { StateOwner } from '../utils/constants';
import User from './user';
import Satellite from './satellite';
import Room from './room';
import House from './house';
import Device from './device';
import Plugin from './plugin';

@Table({
  tableName: 'state',
  underscored: false
})
export default class State extends Model<State> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  description!: string;

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
