import { Table, Column, Model, PrimaryKey, DataType, HasMany, HasOne, IsUUID, AllowNull, NotEmpty, Unique, DefaultScope, Scopes } from 'sequelize-typescript';
import Room from './room';
import State from './state';

@DefaultScope({
  attributes: ['id', 'name', 'latitude', 'longitude'],
  include: [() => Room]
})
@Scopes({
  withState: {
    attributes: ['id', 'name', 'latitude', 'longitude'],
    include: [() => Room, () => State]
  }
})
@Table({
  tableName: 'house',
  underscored: false
})
export default class House extends Model<House> {

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
  latitude!: string;

  @AllowNull(false)
  @Column
  longitude!: string;

  @HasMany(() => Room)
  rooms!: Room[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state!: State;
}
