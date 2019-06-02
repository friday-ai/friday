import Server from './app';
import * as db from './utils/database';

const env = process.env.NODE_ENV || 'production';
const port = parseInt(process.env.PORT!, 10) || 3000;
let database = db.production;

if (env === 'development') {
  database = db.development;
}

(async () => {
  await database.sync({ force: true });

  new Server(port).start();

})();
