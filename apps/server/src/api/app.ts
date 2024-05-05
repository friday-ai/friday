import http, { type Server as ServerType } from "node:http";
import logger from "@friday-ai/logger";
import type { MqttOptions } from "@friday-ai/shared";
import compression from "compression";
import cors from "cors";
import express, { type RequestHandler } from "express";
import helmet from "helmet";
import * as WebSocket from "ws";

import type Friday from "../core/friday";
import errorMiddleware from "./middlewares/errorMiddleware";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";
import MqttServer from "./mqtt";
import router from "./routes/router";
import WebsocketServer from "./websocket/index";

/**
 * Server class
 */
export default class Server {
  public server!: ServerType;
  public websocketServer!: WebsocketServer;
  public mqttServer!: MqttServer;
  readonly port: number;
  readonly mqttOptions?: MqttOptions;
  readonly friday: Friday;

  constructor(port: number, friday: Friday, mqttOptions?: MqttOptions) {
    this.port = port;
    this.mqttOptions = mqttOptions;
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
    app.use("/api", notFoundMiddleware);

    // loading error middleware
    app.use(errorMiddleware);

    // initialize the http server
    this.server = http.createServer(app);

    // initialize the WebSocket server instance
    const wss = new WebSocket.WebSocketServer({ server: this.server });
    this.websocketServer = new WebsocketServer(wss, this.friday);

    // start WebSocket server
    this.websocketServer.start();

    // initialize and start the Mqtt server instance
    this.mqttServer = new MqttServer(this.friday);
    await this.mqttServer.start(this.mqttOptions);

    this.server.listen(this.port, () => {
      logger.title("Friday server started !");
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
