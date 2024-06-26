import type { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

export default {
  name: "20200823171832-create-state",
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable("state", {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataType.UUIDV4,
      },
      owner: {
        allowNull: true,
        type: DataType.UUIDV4,
      },
      ownerType: {
        allowNull: false,
        type: DataType.STRING,
      },
      value: {
        allowNull: false,
        type: DataType.STRING,
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
  down: ({ context: queryInterface }: { context: QueryInterface }) => queryInterface.dropTable("state"),
};
