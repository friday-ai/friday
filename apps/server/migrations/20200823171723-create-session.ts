import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  name: '20200823171723-create-session',
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('session', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUIDV4,
      },
      refreshToken: {
        unique: true,
        allowNull: false,
        type: DataType.STRING,
      },
      revoked: {
        allowNull: false,
        type: DataType.BOOLEAN,
      },
      userAgent: {
        type: DataType.STRING,
      },
      validUntil: {
        allowNull: false,
        type: DataType.DATE,
      },
      userId: {
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
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable('session'),
};
