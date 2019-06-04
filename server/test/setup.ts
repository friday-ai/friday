import * as database from '../src/utils/database';

beforeAll(async () => {
  await database.init();
});
