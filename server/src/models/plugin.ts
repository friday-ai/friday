// src/models/Plugin.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface PluginAttributes {
  id?: number;
  name: string;
  version: string;
  state: number;
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
    },
    state: {
        type: DataTypes.number
    }
  };

  const plugin = sequelize.define<PluginInstance, PluginAttributes>('plugin', attributes);

  plugin.associate = models => {
    plugin.hasMany(models.device);
    plugin.hasMany(models.variable);
    plugin.belongsTo(models.state, { as: 'state', foreignKey: 'id' });
    // Gérer satellite
  };

  return plugin;
};