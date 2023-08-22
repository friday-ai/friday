import http, { Server as ServerType } from 'http';
import express, { RequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import * as WebSocket from 'ws';
import { MqttOptions } from '@friday-ai/shared';
import logger from '@friday-ai/logger';

import router from './routes/router';
import notFoundMiddleware from './middlewares/notFoundMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';
import WebsocketServer from './websocket/index';
import Friday from '../core/friday';
import MqttServer from './mqtt';

const defaultMqttOptions: MqttOptions = {
  port: 1883,
  host: process.env.MQTT_HOST || 'localhost',
  protocol: 'mqtt',
};

/**
 * Server class
 */
export default class Server {
  public server!: ServerType;
  public websocketServer!: WebsocketServer;
  public mqttServer!: MqttServer;
  readonly port: number;
  readonly mqttOptions: MqttOptions;
  readonly friday: Friday;

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

    // middleware for parsing application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }) as RequestHandler);

    // middleware for json body parsing
    app.use(express.json() as RequestHandler);

    // middleware for secure HTTP headers
    app.use(helmet() as RequestHandler);

    // compress all response
    app.use(compression());

    app.use(cors({ credentials: true, origin: true }));

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
    this.mqttServer = new MqttServer(this.friday);
    await this.mqttServer.start(this.mqttOptions);

    this.server.listen(this.port, () => {
      logger.title('Friday server started !');
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
