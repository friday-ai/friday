import * as http from 'http';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import router from './routes/router';
import Log from '../utils/log';
import notFoundMiddleware from './middlewares/notFoundMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';
import * as WebSocket from 'ws';
import WebsocketServer from './websocket/index';
import Friday from '../../src/core/friday';

const env = process.env.NODE_ENV || 'production';

/**
 * Server class
 */
export default class Server {
  public server!: any;
  public websocketServer!: any;
  readonly port: number;
  readonly friday: any;

  constructor(port: number, friday: Friday) {
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

    // initialize the http server
    this.server = http.createServer(app);

    // initialize the WebSocket server instance
    const wss = new WebSocket.Server({ server: this.server });
    this.websocketServer = new WebsocketServer(wss, this.friday);

    // start WebSocket server
    this.websocketServer.start();

    if (env !== 'test') {
      this.server.listen(this.port, () => {
        logger.title('Friday server initialized !');
        logger.info(`Friday server is available at localhost:${this.port}`);
      });
    }

    return this.server;
  }

  /**
   * Close function of server
   * @memberof Server
   */
  close() {
    this.server.close();
  }
}
