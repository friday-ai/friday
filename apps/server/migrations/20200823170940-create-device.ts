import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  name: '20200823170940-create-device',
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('device', {
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
      defaultManufacturer: {
        allowNull: false,
        type: DataType.STRING,
      },
      defaultModel: {
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
      manufacturer: {
        type: DataType.STRING,
      },
      model: {
        type: DataType.JSON,
      },
      externalId: {
        type: DataType.STRING,
      },
      viaDevice: {
        type: DataType.UUID,
      },
      roomId: {
        allowNull: false,
        type: DataType.UUID,
      },
      pluginId: {
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
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable('device'),
};
