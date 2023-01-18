import * as WebSocket from 'ws';
import logger from '@friday/logger';
import WebsocketServer from '.';

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
