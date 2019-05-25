// src/models/State.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface StateAttributes {
  id?: number;
  name: string;
  owner: number;
  owner_type: Enumerator;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface StateInstance extends Sequelize.Instance<StateAttributes>, StateAttributes {};

export const StateFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<StateInstance, StateAttributes> => {
  const attributes: SequelizeAttributes<StateAttributes> = {
    name: {
      type: DataTypes.string
    },
    owner: {
      type: DataTypes.number
    },
    owner_type: {
        type: DataTypes.Enumerator
    },
    value: {
        type: DataTypes.string
    }
  };

  const state = sequelize.define<StateInstance, StateAttributes>('state', attributes);

  state.associate = models => {
    state.hasMany(models.house);
    state.hasMany(models.user);
    state.hasMany(models.device);
    state.hasMany(models.plugin);
    state.hasMany(models.house);
    state.hasMany(models.room);
    state.hasMany(models.satellite);
  };

  return state;
};