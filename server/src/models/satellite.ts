import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey, DataType, HasOne,
  IsUUID, AllowNull, HasMany, DefaultScope, Scopes, NotEmpty, Unique } from 'sequelize-typescript';

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
  @Unique
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @ForeignKey(() => Room)
  @Column(DataType.UUIDV4)
  roomId!: string;

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
