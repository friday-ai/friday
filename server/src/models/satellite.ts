import { Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, HasMany, DefaultScope, Scopes, NotEmpty, Unique, Default, Is } from 'sequelize-typescript';

import Room from './room';
import State from './state';
import Variable from './variable';
import Plugin from './plugin';
import { isOwnerExisting } from '../utils/databaseValidation';

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
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUIDV4 })
  id!: string;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Is('roomId', (value) => isOwnerExisting(value, ['room']))
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
