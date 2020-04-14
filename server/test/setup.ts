import chai from 'chai';
import chaiAsPormised from 'chai-as-promised';
import Server from '../src/api/app';
import Friday from '../src/core/friday';
import { seedDb, cleanDb } from './utils/seed';

const port = parseInt(process.env.SERVER_PORT!, 10) || 3500;

chai.use(chaiAsPormised);

before(async function before() {
  this.timeout(8000);

  // Create Friday core object
  const friday = new Friday();

  // Start Friday core
  await friday.start();

  // @ts-ignore
  global.TEST_SERVER = new Server(port, friday).start();
});

beforeEach(async function beforeEach() {
  this.timeout(8000);

  // Clean database
  await cleanDb();

  // And seed it again
  await seedDb();
});
