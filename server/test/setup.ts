import * as database from '../src/config/database';
import { seedDb, cleanDb } from './utils/seed';

beforeAll(async () => {
  jest.setTimeout(30000);
  await database.init();
  await seedDb();
});

afterAll(async () => {
  await cleanDb();
  await database.closeConnection();
});
