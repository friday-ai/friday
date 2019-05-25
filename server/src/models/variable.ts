// src/models/Variable.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface VariableAttributes {
  id?: number;
  key: string;
  value: string;
  ownerType: Enumerator;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface VariableInstance extends Sequelize.Instance<VariableAttributes>, VariableAttributes {};

export const VariableFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<VariableInstance, VariableAttributes> => {
  const attributes: SequelizeAttributes<VariableAttributes> = {
    key: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.STRING
    },
    ownerType: {
        type: DataTypes.Enumerator
    }
  };

  const variable = sequelize.define<VariableInstance, VariableAttributes>('variable', attributes);

  variable.associate = models => {
    variable.hasMany(models.user);
    variable.hasMany(models.plugin);
    variable.hasMany(models.satellite);
  };

  return variable;
};