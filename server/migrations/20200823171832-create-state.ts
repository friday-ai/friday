import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('state', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUIDV4,
      },
      owner: {
        allowNull: true,
        type: DataType.UUIDV4,
      },
      ownerType: {
        allowNull: false,
        type: DataType.STRING,
      },
      value: {
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
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('state'),
};
