import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  name: '20200823171132-create-plugin',
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('plugin', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUIDV4,
      },
      dockerId: {
        unique: true,
        allowNull: false,
        type: DataType.STRING,
      },
      name: {
        allowNull: false,
        type: DataType.STRING,
      },
      version: {
        allowNull: false,
        type: DataType.STRING,
      },
      url: {
        allowNull: false,
        type: DataType.STRING,
      },
      enabled: {
        allowNull: false,
        type: DataType.JSON,
      },
      satelliteId: {
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
      lastHeartbeat: {
        allowNull: false,
        type: DataType.DATE,
      },
    });
  },
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable('plugin'),
};
