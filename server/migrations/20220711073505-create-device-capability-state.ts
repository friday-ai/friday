import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('device_capability_state', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUID,
      },
      value: {
        allowNull: false,
        type: DataType.STRING,
      },
      capabilityId: {
        allowNull: false,
        type: DataType.UUID,
      },
      last: {
        allowNull: false,
        defaultValue: true,
        type: DataType.BOOLEAN,
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
  down: ({ context: queryInterface }: { context: QueryInterface }) =>
    queryInterface.dropTable('device_capability_state'),
};
