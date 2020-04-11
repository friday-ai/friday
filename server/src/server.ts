import Server from './api/app';
import Friday from './core/friday';

const port = parseInt(process.env.SERVER_PORT!, 10) || 3000;

(async () => {

  // Create Friday object
  const friday = new Friday();

  // Start Friday core
  friday.start();

  // Start Friday server
  new Server(port, friday).start();

})();
