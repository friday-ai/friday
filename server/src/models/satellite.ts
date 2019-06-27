import { Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, HasMany, DefaultScope, Scopes, NotEmpty, Unique } from 'sequelize-typescript';

import Room from './room';
import State from './state';
import Variable from './variable';
import Plugin from './plugin';

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
  @Column(DataType.UUIDV4)
  roomId!: string;

  @BelongsTo(() => Room, {
    foreignKey: 'room_id'
  })
  room!: Room;

  @HasMany(() => Variable, {
    foreignKey: 'owner',
    constraints: false
  })
  variables?: Variable[];

  @HasMany(() => Plugin, {
    foreignKey: 'satellite_id'
  })
  plugins?: Plugin[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state!: State;
}
