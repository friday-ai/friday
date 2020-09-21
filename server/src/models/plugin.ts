import {
  Table, Column, Model, PrimaryKey, BelongsTo, DataType, HasOne,
  IsUUID, AllowNull, HasMany, NotEmpty, Unique, DefaultScope, Scopes, Default, Is,
} from 'sequelize-typescript';

import Satellite from './satellite';
import State from './state';
import Variable from './variable';
import Device from './device';
import { isOwnerExisting } from '../utils/databaseValidation';
import Friday from '../core/friday';
import {DatabaseValidationError} from '../utils/errors/coreError';
/**
 * Plugin model
 */
@DefaultScope(() => ({
  attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
}))
@Scopes(() => ({
  full: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [Satellite, State, Device, Variable],
  },
  withSatellite: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [Satellite],
  },
  withState: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [State],
  },
  withDevices: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [Device],
  },
  withVariables: {
    attributes: ['id', 'name', 'version', 'url', 'enabled', 'satelliteId'],
    include: [Variable],
  },
}))
@Table({
  tableName: 'plugin',
  underscored: false,
  validate: {
    async isNotAlreadyInstall(this: Plugin) {
      const friday = new Friday();
      // Check plugin isn't already install;
      let satellite = await friday.satellite.getById(this.satelliteId, 'withPlugins');
      if(satellite !== null && typeof satellite.plugins !== 'undefined') {
        satellite.plugins.forEach(plugin => {
          if((plugin as any).name === this.name) {
            throw new DatabaseValidationError({message:'plugin already install on this satellite', name: 'plugin.already.install'});
          }
        });
      }
    }
  }
})
export default class Plugin extends Model<Plugin> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUIDV4 })
  id!: string;

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
  @Column(DataType.UUIDV4)
  satelliteId!: string;

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
