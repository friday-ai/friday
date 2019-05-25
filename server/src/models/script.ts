// src/models/Script.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface ScriptAttributes {
  id?: number;
  name: string;
  code: JSON;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface ScriptInstance extends Sequelize.Instance<ScriptAttributes>, ScriptAttributes {};

export const ScriptFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ScriptInstance, ScriptAttributes> => {
  const attributes: SequelizeAttributes<ScriptAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.JSON
    }
  };

  const script = sequelize.define<ScriptInstance, ScriptAttributes>('script', attributes);

  return script;
};