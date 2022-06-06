import * as WebSocket from 'ws';
import { WebsocketMessagePayload } from '../../utils/interfaces';
import WebsocketServer from '.';
import Log from '../../utils/log';
import { BadParametersError } from '../../utils/errors/coreError';

const logger = new Log();

/**
 * Client connected
 */
export default async function clientConnected(this: WebsocketServer, message: WebsocketMessagePayload, ws: WebSocket) {
  try {
    if (message.accessToken === null) {
      throw new BadParametersError({
        name: 'Websocket authentication',
        message: 'Access token not found',
        metadata: message,
      });
    }

    await this.friday.session.validateAccessToken(message.accessToken!);
    const user = await this.friday.user.getById(message.sender);

    if (!this.clients[user.id!]) {
      this.clients[user.id!] = [];
    }
    const connectionIndex = this.clients[user.id!].findIndex((elem: { client: WebSocket; }) => elem.client === ws);

    if (connectionIndex === -1) {
      this.clients[user.id!].push({
        user,
        ws,
      });
    }

    this.user = user;
    this.isAuthenticated = true;
    logger.info(`User ${user.userName} connected in websocket.`);
  } catch (e) {
    logger.error('Websocket authentication failed.');
    ws.close(4000, 'Auth failed');
  }
}
