import {Sequelize} from 'sequelize-typescript';

export const production = new Sequelize({
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  storage: './friday.db',
  models: [__dirname + '/../models']
});

export const development = new Sequelize({
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  storage: './friday-development.db',
  models: [__dirname + '/../models']
});

export const test = new Sequelize({
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  storage: './friday-test.db',
  models: [__dirname + '/../models']
});

