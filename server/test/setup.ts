import * as database from '../src/config/database';
import { seedDb, cleanDb } from './utils/seed';

beforeAll(async () => {
  await database.init();
  await seedDb();
});

afterAll(async () => {
  await cleanDb();
  await database.closeConnection();
});
