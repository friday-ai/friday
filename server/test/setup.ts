import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Server from '../src/api/app';
import Friday from '../src/core/friday';
import { seedDb, cleanDb } from './utils/seed';
import { umzug } from '../src/config/database';
import Log from '../src/utils/log';

const port = parseInt(process.env.SERVER_PORT!, 10) || 3500;
const log = new Log();

chai.use(chaiAsPromised);

before(async function before() {
  this.timeout(16000);

  // Create Friday core object
  const friday = new Friday();

  // Start Friday core
  await friday.start();

  // @ts-ignore
  global.TEST_SERVER = new Server(port, friday).start();

  try {
    await cleanDb();
  } catch (e) {
    log.warning('Impossible to clean database, ignoring error');
  }
  try {
    await umzug.up();
    await seedDb();
  } catch (e) {
    log.error(e);
    throw e;
  }
});

beforeEach(async function beforeEach() {
  this.timeout(8000);

  // Clean database
  await cleanDb();

  // And seed it again
  await seedDb();
});
