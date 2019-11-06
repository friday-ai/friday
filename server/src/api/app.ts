import http from 'http';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import router from './routes/router';
import Log from '../utils/log';
import notFoundMiddleware from './middlewares/notFoundMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';
import { Http2Server } from 'http2';

/**
 * Server class
 */
export default class Server {
  public server!: Http2Server;
  readonly port: number;
  readonly friday: any;

  constructor(port: number, friday: any) {
    this.port = port;
    this.friday = friday;
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

    // middleware for secure HTTP headers
    app.use(helmet());

    // compress all response
    app.use(compression());

    // loading all friday's routes
    app.use(router(this.friday));

    // if not API routes was found
    app.use('/api', notFoundMiddleware);

    // loading error middleware
    app.use(errorMiddleware);

    this.server = http.createServer(app);

    this.server.listen(this.port, () => {
      logger.title('Friday server initialized !');
      logger.info(`Friday server is available at localhost:${this.port}`);
    });
  }

  /**
   * Close function of server
   * @memberof Server
   */
  close() {
    this.server.close();
  }
}
