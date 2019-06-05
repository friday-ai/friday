import promise from 'bluebird';
import { readdirSync } from 'fs';
import { join } from 'path';

const SEEDERS_PATH = join(__filename, '../../seeders');

const files = readdirSync(SEEDERS_PATH);
const seeds = files.map((file) => require(join(SEEDERS_PATH, file)));
const reversedSeed = seeds.slice().reverse();

const callLater = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 10);
  });

const seedDb = async () => {
  await promise.mapSeries(seeds, (seed) => callLater().then(() => seed.create()));
};

const cleanDb = async () => {
  await promise.mapSeries(reversedSeed, (seed) => callLater().then(() => seed.destroy()));
};

export {
  seedDb,
  cleanDb
};
