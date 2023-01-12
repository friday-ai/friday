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
  Validate,
} from 'sequelize-typescript';

import { PluginAttributes, PluginCreationAttributes } from '@friday/shared';
import Satellite from './satellite';
import State from './state';
import Variable from './variable';
import Device from './device';
import { isOwnerExisting } from '../utils/database/validation';
import { DatabaseValidationError } from '../utils/decorators/error';

/**
 * Plugin model
 */
@DefaultScope(() => ({
  attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    include: [Satellite, Device, Variable, { model: State, where: { last: true } }],
  },
  withSatellite: {
    attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    include: [Satellite],
  },
  withState: {
    attributes: ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    include: [{ model: State, where: { last: true } }],
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
export default class Plugin extends Model<PluginAttributes, PluginCreationAttributes> {
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
        satellite.get({ plain: true }).plugins.forEach((plugin: PluginAttributes) => {
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
