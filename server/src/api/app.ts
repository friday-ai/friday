import * as http from 'http';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import * as WebSocket from 'ws';
import router from './routes/router';
import Log from '../utils/log';
import notFoundMiddleware from './middlewares/notFoundMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';
import WebsocketServer from './websocket/index';
import Friday from '../core/friday';
import MqttServer from './mqtt';
import { MqttOptions } from '../utils/interfaces';

const defaultMqttOptions: MqttOptions = {
  port: 1883,
  host: 'localhost',
  protocol: 'mqtt',
};

/**
 * Server class
 */
export default class Server {
  public server!: any;
  public websocketServer!: any;
  public mqttServer!: MqttServer;
  readonly port: number;
  readonly mqttOptions: MqttOptions;
  readonly friday: any;

  constructor(port: number, friday: Friday, mqttOptions?: MqttOptions) {
    this.port = port;
    this.mqttOptions = mqttOptions || defaultMqttOptions;
    this.friday = friday;
  }

  /**
   * Start function of server
   * @memberof Server
   */
  async start() {
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

    // initialize and start the Mqtt server instance
    this.mqttServer = new MqttServer(this.friday, this.mqttOptions);
    await this.mqttServer.start();

    this.server.listen(this.port, () => {
      logger.title('Friday server initialized !');
      logger.info(`Friday server is available at localhost:${this.port}`);
    });

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
