import { Sequelize } from 'sequelize-typescript';
import Umzug from 'umzug';
import path from 'path';

const env = process.env.NODE_ENV || 'production';

const DATABASE_NAME: {[x: string]: string} = {
  production: './friday.db',
  development: './friday-development.db',
  test: './friday-test.db',
};

const database = new Sequelize({
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
  storage: DATABASE_NAME[env],
  models: [path.join(__dirname, '../models')],
});

// Migrations
const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, '../../migrations'),
    params: [database.getQueryInterface()],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: database,
  },
});

const init = async () => {
  if (env === 'test') {
    // If exist, drop tables for tests
    await database.sync({ force: true });
  } else {
    await database.sync();
  }
};

const closeConnection = async () => {
  database.close();
};

export {
  database,
  umzug,
  init,
  closeConnection,
};
