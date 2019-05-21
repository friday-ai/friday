// src/models/Plugin.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface PluginAttributes {
  id?: number;
  name: string;
  version: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface PluginInstance extends Sequelize.Instance<PluginAttributes>, PluginAttributes {};

export const PluginFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<PluginInstance, PluginAttributes> => {
  const attributes: SequelizeAttributes<PluginAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    version: {
      type: DataTypes.STRING
    }
  };

  const Plugin = sequelize.define<PluginInstance, PluginAttributes>('plugin', attributes);

  Plugin.associate = models => {
    Plugin.hasMany(models.device);
    Plugin.hasMany(models.variable);
    Plugin.belongsTo(models.state, { as: 'state', foreignKey: 'id' });
    // Gérer satellite
  };

  return Plugin;
};