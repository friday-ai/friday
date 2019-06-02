import { Table, Column, Model, PrimaryKey, DataType, HasMany, HasOne, IsUUID, AllowNull } from 'sequelize-typescript';
import Room from './room';
import State from './state';

@Table({
  tableName: 'house',
  underscored: true
})
export default class House extends Model<House> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  latitude!: string;

  @AllowNull(false)
  @Column
  longitude!: string;

  @HasMany(() => Room)
  room!: Room[];

  @HasOne(() => State)
  state!: State;
}
