import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  name: '20200823171455-create-scene',
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('scene', {
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
      triggerId: {
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
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable('scene'),
};
