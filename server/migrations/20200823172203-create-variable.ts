import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('variable', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUIDV4,
      },
      key: {
        unique: true,
        allowNull: false,
        type: DataType.STRING,
      },
      value: {
        allowNull: false,
        type: DataType.STRING,
      },
      owner: {
        allowNull: true,
        type: DataType.UUIDV4,
      },
      ownerType: {
        allowNull: false,
        type: DataType.STRING,
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
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('variable'),
};
