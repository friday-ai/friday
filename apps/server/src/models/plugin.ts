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
} from "sequelize-typescript";

import type { PluginAttributes, PluginCreationAttributes } from "@friday-ai/shared";
import { isOwnerExisting } from "../utils/database/validation";
import { DatabaseValidationError } from "../utils/decorators/error";
import Device from "./device";
import Satellite from "./satellite";
import State from "./state";
import Variable from "./variable";

/**
 * Plugin model
 */
@DefaultScope(() => ({
  attributes: ["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat"],
}))
@Scopes(() => ({
  full: {
    attributes: ["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat"],
    include: [Satellite, Device, Variable, { model: State, where: { last: true } }],
  },
  withSatellite: {
    attributes: ["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat"],
    include: [Satellite],
  },
  withState: {
    attributes: ["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat"],
    include: [{ model: State, where: { last: true } }],
  },
  withDevices: {
    attributes: ["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat"],
    include: [Device],
  },
  withVariables: {
    attributes: ["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat"],
    include: [Variable],
  },
}))
@Table({
  tableName: "plugin",
  underscored: false,
})
export default class Plugin extends Model<PluginAttributes, PluginCreationAttributes> {
  @IsUUID(4)
  @AllowNull(false)
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column(DataType.STRING)
  dockerId!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  version!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  url!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  enabled!: boolean;

  @AllowNull(false)
  @NotEmpty
  @Is("satelliteId", (value) => isOwnerExisting(value, ["satellite"]))
  @Validate({
    async isNotAlreadyInstall(this: Plugin) {
      // Check plugin isn't already install;
      const satellite = await Satellite.scope("withPlugins").findByPk(this.satelliteId);
      if (satellite !== null && typeof satellite.plugins !== "undefined") {
        const plugins = satellite.get({ plain: true }).plugins;

        for (const plugin of plugins) {
          if (plugin.name === this.name) {
            throw new DatabaseValidationError({
              message: "plugin already install on this satellite",
              name: "plugin.already.install",
            });
          }
        }
      }
    },
  })
  @Column(DataType.UUIDV4)
  satelliteId!: string;

  @AllowNull(false)
  @IsDate
  @NotEmpty
  @Default(new Date())
  @Column(DataType.DATE)
  lastHeartbeat!: Date;

  @BelongsTo(() => Satellite, {
    foreignKey: "satelliteId",
    constraints: false,
  })
  satellite!: Satellite;

  @HasMany(() => Device, {
    foreignKey: "pluginId",
    constraints: false,
  })
  devices!: Device[];

  @HasMany(() => Variable, {
    foreignKey: "owner",
    constraints: false,
  })
  variables?: Variable[];

  @HasOne(() => State, {
    foreignKey: "owner",
    constraints: false,
  })
  state?: State;
}
