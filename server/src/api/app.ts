import { Request, Response } from 'express';
import express from 'express';
import * as bodyParser from 'body-parser';
import Log from '../utils/log';

/**
 * Server class
 */
export default class Server {
  readonly port: number;

  constructor(port: number) {
    this.port = port;
  }

  /**
   * Start function of server
   * @memberof Server
   */
  start() {
    const app = express();
    const logger = new Log();

    // middleware for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // middleware for json body parsing
    app.use(bodyParser.json());

    app.get('/', function (req: Request, res: Response) {
      res.sendStatus(200);
      logger.info('This query gives nothing.. finally for the moment ;)');
    });

    app.listen(this.port, () => {
      logger.title('Friday server initialized !');
      logger.info(`Friday server is available at localhost:${this.port}`);
    });
  }
}
