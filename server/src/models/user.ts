// src/models/User.ts
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface UserAttributes {
  id?: number;
  name: string;
  first_name: string;
  email: string;
  date_of_birth: Date;
  password_hash: string;
  role: string;
  state: number;
  language: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING
    },
    email: {
        type: DataTypes.Enumerator
    },
    date_of_birth: {
        type: DataTypes.Date
    },
    password_hash: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    language: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.number
    }
  };

  const user = sequelize.define<UserInstance, UserAttributes>('user', attributes);

  user.associate = models => {
    user.hasMany(models.variable);
    user.belongsTo(models.state, { as: 'state', foreignKey: 'id' });
  };

  return user;
};