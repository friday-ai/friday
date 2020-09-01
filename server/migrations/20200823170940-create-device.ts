import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('device', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUID,
      },
      name: {
        unique: true,
        allowNull: false,
        type: DataType.STRING,
      },
      type: {
        allowNull: false,
        type: DataType.STRING,
      },
      subType: {
        allowNull: false,
        type: DataType.STRING,
      },
      variable: {
        type: DataType.JSON,
      },
      unit: {
        type: DataType.STRING,
      },
      value: {
        type: DataType.STRING,
      },
      roomId: {
        allowNull: false,
        type: DataType.UUID,
      },
      pluginId: {
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
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('device'),
};
