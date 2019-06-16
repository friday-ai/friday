import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, DataType, HasOne, IsUUID, AllowNull, HasMany, DefaultScope, Scopes } from 'sequelize-typescript';
import Room from './room';
import State from './state';
import Variable from './variable';

@DefaultScope({
  attributes: ['id', 'name', 'roomId'],
  include: [() => Room]
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'roomId'],
    include: [() => State, () => Variable]
  },
  withState: {
    attributes: ['id', 'name', 'roomId'],
    include: [() => State]
  },
  withVariables: {
    attributes: ['id', 'name', 'roomId'],
    include: [() => Variable]
  }
})
@Table({
  tableName: 'satellite',
  underscored: false
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
  roomId!: number;

  @BelongsTo(() => Room)
  room!: Room;

  @HasMany(() => Variable, {
    foreignKey: 'owner',
    constraints: false
  })
  variables?: Variable[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state!: State;
}
