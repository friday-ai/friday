import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  HasOne,
  Is,
  IsDate,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';

import Room from './room';
import State from './state';
import Variable from './variable';
import Plugin from './plugin';
import { isOwnerExisting } from '../utils/databaseValidation';

/**
 * Satellite model
 */
@DefaultScope(() => ({
  attributes: ['id', 'name', 'roomId', 'lastHeartbeat'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'name', 'roomId', 'lastHeartbeat'],
    include: [Room, Plugin, State, Variable],
  },
  withRoom: {
    attributes: ['id', 'name', 'roomId', 'lastHeartbeat'],
    include: [Room],
  },
  withState: {
    attributes: ['id', 'name', 'roomId', 'lastHeartbeat'],
    include: [State],
  },
  withVariables: {
    attributes: ['id', 'name', 'roomId', 'lastHeartbeat'],
    include: [Variable],
  },
  withPlugins: {
    attributes: ['id', 'name', 'roomId', 'lastHeartbeat'],
    include: [Plugin],
  },
}))
@Table({
  tableName: 'satellite',
  underscored: false,
})
export default class Satellite extends Model {
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

  @AllowNull(false)
  @IsDate
  @NotEmpty
  @Default(new Date())
  @Column({ type: DataType.DATE })
    lastHeartbeat!: Date;

  @BelongsTo(() => Room, {
    foreignKey: 'roomId',
    constraints: false,
  })
    room!: Room;

  @HasMany(() => Variable, {
    foreignKey: 'owner',
    constraints: false,
  })
    variables?: Variable[];

  @HasMany(() => Plugin, {
    foreignKey: 'satelliteId',
    constraints: false,
  })
    plugins?: Plugin[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false,
  })
    state!: State;
}
