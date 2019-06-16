import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, DataType, HasMany, HasOne,
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
  @ForeignKey(() => House)
  @Column(DataType.UUIDV4)
  houseId!: string;

  @BelongsTo(() => House)
  house!: House;

  @HasMany(() => Device)
  devices!: Device[];

  @HasMany(() => Satellite)
  satellites!: Satellite[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state!: State;

}
