// src/models/Action.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface ActionAttributes {
  id?: number;
  name: string;
  description: string;
  type: string;
  sub_type: string;
  variable_key: string;
  variable_value: string;
  Action: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface ActionInstance extends Sequelize.Instance<ActionAttributes>, ActionAttributes {};

export const ActionFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ActionInstance, ActionAttributes> => {
  const attributes: SequelizeAttributes<ActionAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.string
    },
    type: {
      type: DataTypes.string
    },
    sub_type: {
        type: DataTypes.string
    },
    variable_key: {
      type: DataTypes.string
    },
    variable_value: {
      type: DataTypes.string
    },
    scene: {
        type: DataTypes.number
    }
  };

  const action = sequelize.define<ActionInstance, ActionAttributes>('action', attributes);

  action.associate = models => {
    action.belongsTo(models.scene, { as: 'scene', foreignKey: 'id' });
  };

  return action;
};