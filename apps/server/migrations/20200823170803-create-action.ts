import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('action', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUIDV4,
      },
      name: {
        unique: true,
        allowNull: false,
        type: DataType.STRING,
      },
      description: {
        allowNull: false,
        type: DataType.STRING,
      },
      type: {
        allowNull: true,
        type: DataType.STRING,
      },
      subType: {
        allowNull: false,
        type: DataType.STRING,
      },
      variableKey: {
        type: DataType.STRING,
      },
      variableValue: {
        type: DataType.STRING,
      },
      scene: {
        allowNull: false,
        type: DataType.UUIDV4,
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
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable('action'),
};
