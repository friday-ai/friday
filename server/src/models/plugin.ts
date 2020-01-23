import { Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, HasMany, NotEmpty, Unique, DefaultScope, Scopes, Default } from 'sequelize-typescript';

import Satellite from './satellite';
import State from './state';
import Variable from './variable';
import Device  from './device';
import { v4 as uuid } from 'uuid';

/**
 * Plugin model
 */
@DefaultScope({
  attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId']
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [() => Satellite, () => State, () => Device, () => Variable]
  },
  withSatellite: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [() => Satellite]
  },
  withState: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [() => State]
  },
  withDevices: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [() => Device]
  },
  withVariables: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [() => Variable]
  }
})
@Table({
  tableName: 'plugin',
  underscored: false
})
export default class Plugin extends Model<Plugin> {

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
  @Column
  version!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  url!: string;

  @AllowNull(false)
  @Column
  enabled!: boolean;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.UUIDV4)
  satelliteId!: string;

  @BelongsTo(() => Satellite, {
    foreignKey: 'satelliteId',
    constraints: false
  })
  satellite!: Satellite;

  @HasMany(() => Device, {
    foreignKey: 'pluginId',
    constraints: false
  })
  devices!: Device[];

  @HasMany(() => Variable, {
    foreignKey: 'owner',
    constraints: false
  })
  variables?: Variable[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false
  })
  state?: State;
}
