import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('user', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataType.STRING,
      },
      firstName: {
        allowNull: false,
        type: DataType.STRING,
      },
      email: {
        unique: true,
        allowNull: true,
        type: DataType.STRING,
      },
      password: {
        allowNull: false,
        type: DataType.JSON,
      },
      birthDate: {
        allowNull: false,
        type: DataType.DATE,
      },
      role: {
        allowNull: false,
        type: DataType.JSON,
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
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable('user'),
};
