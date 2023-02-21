import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('device_capability', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUID,
      },
      defaultName: {
        allowNull: false,
        type: DataType.STRING,
      },
      name: {
        type: DataType.STRING,
      },
      type: {
        allowNull: false,
        type: DataType.STRING,
      },
      externalId: {
        type: DataType.STRING,
      },
      deviceId: {
        allowNull: false,
        type: DataType.UUID,
      },
      roomId: {
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
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable('device_capability'),
};
