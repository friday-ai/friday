import { Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasMany, HasOne,
  IsUUID, AllowNull, NotEmpty, Unique, DefaultScope, Scopes } from 'sequelize-typescript';

import House from './house';
import Satellite from './satellite';
import Device from './device';
import State from './state';

@DefaultScope({
  attributes: ['id', 'name', 'houseId'],
  include: [() => House]
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'houseId'],
    include: [() => House, () => Device, () => Satellite, () => State]
  },
  withState: {
    attributes: ['id', 'name', 'houseId'],
    include: [() => House, () => State]
  },
  withDevices: {
    attributes: ['id', 'name', 'houseId'],
    include: [() => House, () => Device]
  },
  withSatellites: {
    attributes: ['id', 'name', 'houseId'],
    include: [() => House, () => Satellite]
  }
})
@Table({
  tableName: 'room',
  underscored: false
})
export default class Room extends Model<Room> {

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
  @Column(DataType.UUIDV4)
  houseId!: string;

  @BelongsTo(() => House, {
    foreignKey: 'house_id'
  })
  house!: House;

  @HasMany(() => Device, {
    foreignKey: 'room_id'
  })
  devices!: Device[];

  @HasMany(() => Satellite, {
    foreignKey: 'room_id'
  })
  satellites!: Satellite[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state!: State;

}
