import type { QueryInterface } from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert("scene", [
      {
        id: "2452964a-a225-47dd-9b83-d88d57ed280e",
        name: "Test scene",
        description: "A scene for the tests ;) ",
        triggerId: "a0f02b72-73e0-4cfd-a049-5caaa0b80514",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete("scene", {}, {}),
};
