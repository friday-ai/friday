// src/models/Scene.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface SceneAttributes {
  id?: number;
  name: string;
  actions: JSON;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface SceneInstance extends Sequelize.Instance<SceneAttributes>, SceneAttributes {};

export const SceneFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<SceneInstance, SceneAttributes> => {
  const attributes: SequelizeAttributes<SceneAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    actions: {
      type: DataTypes.JSON
    }
  };

  const scene = sequelize.define<SceneInstance, SceneAttributes>('scene', attributes);

  scene.associate = models => {
    scene.hasMany(models.trigger);
  };

  return scene;
};