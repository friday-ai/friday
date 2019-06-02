import * as db from '../src/utils/database';

beforeAll(async () => {
  await db.test.sync({ force: true });
});
