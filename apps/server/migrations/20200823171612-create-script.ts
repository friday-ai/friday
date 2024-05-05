import type { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

export default {
  name: "20200823171612-create-script",
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable("script", {
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
      code: {
        allowNull: false,
        type: DataType.STRING,
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
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable("script"),
};
