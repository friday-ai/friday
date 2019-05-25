// src/models/House.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface HouseAttributes {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  state: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface HouseInstance extends Sequelize.Instance<HouseAttributes>, HouseAttributes {};

export const HouseFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<HouseInstance, HouseAttributes> => {
  const attributes: SequelizeAttributes<HouseAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.number
    },
    longitude: {
        type: DataTypes.number
    },
    state: {
        type: DataTypes.number
    }
  };

  const house = sequelize.define<HouseInstance, HouseAttributes>('house', attributes);

  house.associate = models => {
    house.hasMany(models.room);
    house.belongsTo(models.state, { as: 'state', foreignKey: 'id' });
    // Gérer satellite
  };

  return house;
};