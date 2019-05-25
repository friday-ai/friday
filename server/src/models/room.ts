// src/models/Room.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface RoomAttributes {
  id?: number;
  name: string;
  house: number;
  state: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface RoomInstance extends Sequelize.Instance<RoomAttributes>, RoomAttributes {};

export const RoomFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<RoomInstance, RoomAttributes> => {
  const attributes: SequelizeAttributes<RoomAttributes> = {
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

  const room = sequelize.define<RoomInstance, RoomAttributes>('room', attributes);

  room.associate = models => {
    room.hasMany(models.variable);
    room.belongsTo(models.state, { as: 'state', foreignKey: 'state' });
    room.belongsTo(models.house, { as: 'house', foreignKey: 'id' });
    // Gérer Room
  };

  return room;
};