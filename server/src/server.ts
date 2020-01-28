import Server from './api/app';
import * as database from './config/database';
import Friday from './core/friday';

const port = parseInt(process.env.SERVER_PORT!, 10) || 3000;

(async () => {

  await database.init();
  const friday = new Friday();
  new Server(port, friday).start();

})();
