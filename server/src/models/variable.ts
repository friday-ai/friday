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

  const Variable = sequelize.define<VariableInstance, VariableAttributes>('Variable', attributes);

  Variable.associate = models => {
    Variable.hasMany(models.User);
    Variable.hasMany(models.plugin);
    Variable.hasMany(models.satellite);
  };

  return Variable;
};