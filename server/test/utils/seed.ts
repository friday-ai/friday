/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import promise from 'bluebird';
import { readdirSync } from 'fs';
import { join } from 'path';
import { database } from '../../src/config/database';

const SEEDERS_PATH = join(__filename, '../../../seeders');

const files = readdirSync(SEEDERS_PATH);
const seeds = files.map((file) => require(join(SEEDERS_PATH, file)));
const reversedSeed = seeds.slice().reverse();

const seedDb = async () => {
  const queryInterface = database.getQueryInterface();
  await promise.each(seeds, async (seed) => {
    await seed.up(queryInterface);
  });
};

const cleanDb = async () => {
  const queryInterface = database.getQueryInterface();
  await promise.each(reversedSeed, async (seed) => {
    await seed.down(queryInterface);
  });
};


export {
  seedDb,
  cleanDb,
};
