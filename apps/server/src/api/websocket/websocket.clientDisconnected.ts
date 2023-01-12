import * as WebSocket from 'ws';
import WebsocketServer from '.';
import logger from '../../utils/log';

/**
 * Client disconnected
 */
export default function clientDisconnected(this: WebsocketServer, ws: WebSocket) {
  const userId = Object.keys(this.clients).find((key) => this.clients[key].ws === ws);

  if (userId !== undefined) {
    logger.info(`User ${this.clients[userId].user.userName} disconnected of websocket`);
    delete this.clients[userId];
  }
}
