import { readdirSync } from "node:fs";
import { join } from "node:path";
import promise from "bluebird";
import { database } from "../../src/config/database";

const SEEDERS_PATH = join(__filename, "../../../seeders");

const files = readdirSync(SEEDERS_PATH);
const seeds = files.map((file) => require(join(SEEDERS_PATH, file)).default);
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

export { seedDb, cleanDb };
