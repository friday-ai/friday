import type { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

export default {
  name: "20200823171918-create-trigger",
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable("trigger", {
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
      rules: {
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
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable("trigger"),
};
