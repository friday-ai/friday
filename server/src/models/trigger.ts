// src/models/trigger.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface TriggerAttributes {
  id?: number;
  name: string;
  type: string;
  rules: number;
  scene_to_execute: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface TriggerInstance extends Sequelize.Instance<TriggerAttributes>, TriggerAttributes {};

export const TriggerFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TriggerInstance, TriggerAttributes> => {
  const attributes: SequelizeAttributes<TriggerAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.number
    },
    rules: {
      type: DataTypes.number
    },
    scene_to_execute: {
        type: DataTypes.number
    }
  };

  const trigger = sequelize.define<TriggerInstance, TriggerAttributes>('trigger', attributes);

  trigger.associate = models => {
    trigger.belongsTo(models.scene_to_execute, { as: 'scene', foreignKey: 'id' });
  };

  return trigger;
};