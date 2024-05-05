import type { QueryInterface } from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert("script", [
      {
        id: "d354cede-3895-4dac-8a90-73d970b4617c",
        name: "Test Script",
        code: "console.log('Hey ! This script is a test ! :)')",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete("script", {}, {}),
};
