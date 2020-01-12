import * as WebSocket from 'ws';
import WebsocketServer from '.';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Client disconnected
 */
export default function clientDisconnected(this: WebsocketServer, ws: WebSocket) {
  if (!this.clients[this.user.id!]) {
    this.clients[this.user.id!] = [];
  }
  const connectionIndex = this.clients[this.user.id!].findIndex((elem: { client: WebSocket; }) => elem.client === ws);

  if (connectionIndex !== -1) {
    this.clients[this.user.id!].splice(connectionIndex, 1);
  }

  if (this.user.firstName !== undefined) {
    logger.info(`User ${this.user.firstName!} disconnected of websocket`);
  }
}
