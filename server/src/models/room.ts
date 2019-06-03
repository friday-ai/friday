import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, DataType, HasMany, HasOne, IsUUID, AllowNull } from 'sequelize-typescript';
import House from './house';
import Satellite from './satellite';
import Device from './device';
import State from './state';

@Table({
  tableName: 'room',
  underscored: true
})
export default class Room extends Model<Room> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @ForeignKey(() => House)
  @Column(DataType.INTEGER)
  house_id!: number;

  @BelongsTo(() => House)
  house!: House;

  @HasMany(() => Device)
  devices!: Device[];

  @HasMany(() => Satellite)
  satellites!: Satellite[];

  @HasOne(() => State)
  state!: State;

}
