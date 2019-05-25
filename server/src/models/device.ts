// src/models/Device.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface DeviceAttributes {
  id?: number;
  name: string;
  type: Enumerator;
  subtype: Enumerator;
  variable: JSON | null;
  unit: string;
  plugin: number;
  room: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface DeviceInstance extends Sequelize.Instance<DeviceAttributes>, DeviceAttributes {};

export const DeviceFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<DeviceInstance, DeviceAttributes> => {
  const attributes: SequelizeAttributes<DeviceAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.Enumerator
    },
    subtype: {
      type: DataTypes.Enumerator
    },
    variable: {
      type: DataTypes.JSON
    },
    unit: {
      type: DataTypes.STRING
    },
    number: {
      type: DataTypes.number
    },
    room: {
      type: DataTypes.number
    }
  };

  const device = sequelize.define<DeviceInstance, DeviceAttributes>('device', attributes);

  device.associate = models => {
    device.belongsTo(models.plugin, { as: 'plugin', foreignKey: 'id' });
    device.belongsTo(models.room, { as: 'room', foreignKey: 'id' });
  };

  return device;
};