import {Sequelize} from 'sequelize-typescript';
import {Op} from 'sequelize';

export const production = new Sequelize({
  dialect: 'sqlite',
  operatorsAliases: Op,
  storage: './friday.db',
  models: [__dirname + '/../models']
});

export const development = new Sequelize({
  dialect: 'sqlite',
  operatorsAliases: Op,
  storage: './friday-development.db',
  models: [__dirname + '/../models']
});

export const test = new Sequelize({
  dialect: 'sqlite',
  operatorsAliases: Op,
  storage: './friday-test.db',
  models: [__dirname + '/../models']
});

