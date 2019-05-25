// src/models/Satellite.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface SatelliteAttributes {
  id?: number;
  name: string;
  room: number;
  state: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface SatelliteInstance extends Sequelize.Instance<SatelliteAttributes>, SatelliteAttributes {};

export const SatelliteFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<SatelliteInstance, SatelliteAttributes> => {
  const attributes: SequelizeAttributes<SatelliteAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    room: {
      type: DataTypes.number
    },
    state: {
      type: DataTypes.number
    }
  };

  const satellite = sequelize.define<SatelliteInstance, SatelliteAttributes>('satellite', attributes);

  satellite.associate = models => {
    satellite.hasMany(models.variable);
    satellite.belongsTo(models.state, { as: 'state', foreignKey: 'state' });
    satellite.belongsTo(models.room, { as: 'room', foreignKey: 'id' });
  };

  return satellite;
};