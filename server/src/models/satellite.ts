import { Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, HasMany, DefaultScope, Scopes, NotEmpty, Unique, Default } from 'sequelize-typescript';

import Room from './room';
import State from './state';
import Variable from './variable';
import Plugin from './plugin';
import { v4 as uuid } from 'uuid';

/**
 * Satellite model
 */
@DefaultScope({
  attributes: ['id', 'name', 'roomId']
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'roomId'],
    include: [() => Room, () => Plugin, () => State, () => Variable]
  },
  withRoom: {
    attributes: ['id', 'name', 'roomId'],
    include: [() => Room]
  },
  withState: {
    attributes: ['id', 'name', 'roomId'],
    include: [() => State]
  },
  withVariables: {
    attributes: ['id', 'name', 'roomId'],
    include: [() => Variable]
  },
  withPlugins: {
    attributes: ['id', 'name', 'roomId'],
    include: [() => Plugin]
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
  @Default(uuid())
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.UUIDV4)
  roomId!: string;

  @BelongsTo(() => Room, {
    foreignKey: 'roomId',
    constraints: false
  })
  room!: Room;

  @HasMany(() => Variable, {
    foreignKey: 'owner',
    constraints: false
  })
  variables?: Variable[];

  @HasMany(() => Plugin, {
    foreignKey: 'satelliteId',
    constraints: false
  })
  plugins?: Plugin[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state!: State;
}
