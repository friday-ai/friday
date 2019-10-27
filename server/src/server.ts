import Server from './api/app';
import * as database from './config/database';

const port = parseInt(process.env.PORT!, 10) || 3000;

(async () => {

  await database.init();
  new Server(port).start();

})();
