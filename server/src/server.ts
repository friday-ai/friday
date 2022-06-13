import Server from './api/app';
import Friday from './core/friday';
import logger from './utils/log';

const port = parseInt(process.env.SERVER_PORT!, 10) || 3000;

(async () => {
  try {
    // Create Friday object
    const friday = new Friday();

    // Start Friday core
    await friday.start();

    // Start Friday server
    await new Server(port, friday).start();
  } catch (e) {
    logger.error(e);
  }
})();
