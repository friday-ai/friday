import {
  Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, HasMany, NotEmpty, Unique, DefaultScope, Scopes, Default, Is, IsDate, Validate,
} from 'sequelize-typescript';

import Satellite from './satellite';
import State from './state';
import Variable from './variable';
import Device from './device';
import { isOwnerExisting } from '../utils/databaseValidation';
import { DatabaseValidationError } from '../utils/errors/coreError';
import PluginType from '../core/plugin/plugin.interface';

/**
 * Plugin model
 */
@DefaultScope(() => ({
  attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    include: [Satellite, State, Device, Variable],
  },
  withSatellite: {
    attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    include: [Satellite],
  },
  withState: {
    attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    include: [State],
  },
  withDevices: {
    attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    include: [Device],
  },
  withVariables: {
    attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    include: [Variable],
  },
}))
@Table({
  tableName: 'plugin',
  underscored: false,
})
export default class Plugin extends Model {
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
  dockerId!: string;

  @AllowNull(false)
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
  @Is('satelliteId', (value) => isOwnerExisting(value, ['satellite']))
  @Validate({
    async isNotAlreadyInstall(this: Plugin) {
      // Check plugin isn't already install;
      const satellite = await Satellite.scope('withPlugins').findByPk(this.satelliteId);
      if (satellite !== null && typeof satellite.plugins !== 'undefined') {
        satellite.get({ plain: true }).plugins.forEach((plugin: PluginType) => {
          if (plugin.name === this.name) {
            throw new DatabaseValidationError({
              message: 'plugin already install on this satellite',
              name: 'plugin.already.install',
            });
          }
        });
      }
    },
  })
  @Column(DataType.UUIDV4)
  satelliteId!: string;

  @AllowNull(false)
  @IsDate
  @NotEmpty
  @Default(new Date())
  @Column({ type: DataType.DATE })
  lastHeartbeat!: Date;

  @BelongsTo(() => Satellite, {
    foreignKey: 'satelliteId',
    constraints: false,
  })
  satellite!: Satellite;

  @HasMany(() => Device, {
    foreignKey: 'pluginId',
    constraints: false,
  })
  devices!: Device[];

  @HasMany(() => Variable, {
    foreignKey: 'owner',
    constraints: false,
  })
  variables?: Variable[];

  @HasOne(() => State, {
    foreignKey: 'owner',
    constraints: false,
  })
  state?: State;
}
