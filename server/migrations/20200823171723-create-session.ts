import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('session', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUIDV4,
      },
      refreshToken: {
        unique: true,
        allowNull: false,
        type: DataType.STRING,
      },
      revoked: {
        allowNull: false,
        type: DataType.BOOLEAN,
      },
      validUntil: {
        allowNull: false,
        type: DataType.DATE,
      },
      userId: {
        allowNull: false,
        type: DataType.UUID,
      },
      created_at: {
        allowNull: false,
        type: DataType.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataType.DATE,
      },
    });
  },
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('session'),
};
