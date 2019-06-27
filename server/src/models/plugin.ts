import { Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, HasMany, NotEmpty, Unique, DefaultScope, Scopes } from 'sequelize-typescript';

import Satellite from './satellite';
import State from './state';
import Variable from './variable';
import Device  from './device';

@DefaultScope({
  attributes: ['id', 'name', 'version', 'satelliteId'],
  include: [() => Satellite]
})
@Scopes({
  full: {
    attributes: ['id', 'name', 'version', 'satelliteId'],
    include: [() => Satellite, () => State, () => Variable]
  },
  withState: {
    attributes: ['id', 'name', 'version', 'satelliteId'],
    include: [() => Satellite, () => State]
  },
  withVariables: {
    attributes: ['id', 'name', 'version', 'satelliteId'],
    include: [() => Satellite, () => Variable]
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
  @Column(DataType.UUIDV4)
  satelliteId!: string;

  @BelongsTo(() => Satellite, {
    foreignKey: 'satellite_id'
  })
  satellite!: Satellite;

  @HasMany(() => Device, {
    foreignKey: 'plugin_id'
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
