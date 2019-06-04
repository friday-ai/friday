import { Sequelize } from 'sequelize-typescript';

const env = process.env.NODE_ENV || 'production';

const database_name: {[x: string]: any} = {
  production: './friday.db',
  development: './friday-development.db',
  test: './friday-test.db'
};

const init = async () => {
  const database = await new Sequelize({
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false,
    storage: database_name[env],
    models: [__dirname + '/../models']
  });

  if (env === 'test') {
    // If exist, drop tables for tests
    await database.sync({force: true});
  } else {
    await database.sync();
  }

};

export {
  init
};
