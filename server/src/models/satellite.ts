import { Table, Column, Model, PrimaryKey, BelongsTo, HasMany, ForeignKey, DataType, HasOne, IsUUID, AllowNull } from 'sequelize-typescript';
import Room from './room';
import Variable from './variable';
import State from './state';

@Table({
  tableName: 'satellite',
  underscored: true
})
export default class Satellite extends Model<Satellite> {

  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @ForeignKey(() => Room)
  @Column(DataType.INTEGER)
  room_id!: number;

  @BelongsTo(() => Room)
  room!: Room;

  @HasMany(() => Variable)
  variable!: Variable[];

  @HasOne(() => State)
  state!: State;
}
