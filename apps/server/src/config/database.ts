import { Sequelize } from "sequelize-typescript";
import { SequelizeStorage, Umzug } from "umzug";
import type { KVArr } from "../utils/interfaces";

import migrations from "../../migrations";
import { modelsArr } from "../models";

const env = process.env.NODE_ENV || "production";

const DATABASE_NAME: KVArr<string> = {
  production: "./friday.db",
  development: "./friday-development.db",
  test: ":memory:",
};

const database = new Sequelize({
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
  storage: DATABASE_NAME[env],
  models: modelsArr,
});

// Migrations
const umzug = new Umzug({
  migrations: [...migrations],
  context: database.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: database }),
  logger: console,
});

const init = async () => {
  if (env === "test") {
    // Drop tables for tests
    await database.sync({ force: true });
  } else {
    await database.sync();
  }
};

const closeConnection = async () => {
  if (env === "test") {
    return null;
  }

  return database.close();
};

export { closeConnection, database, init, umzug };
