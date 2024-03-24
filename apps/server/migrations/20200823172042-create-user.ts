import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  name: '20200823172042-create-user',
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('user', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUIDV4,
      },
      userName: {
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
      theme: {
        allowNull: true,
        type: DataType.STRING,
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
