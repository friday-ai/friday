import * as WebSocket from 'ws';
import logger from '@friday/logger';
import { WebsocketMessagePayload } from '../../utils/interfaces';
import WebsocketServer from '.';
import { BadParametersError } from '../../utils/decorators/error';

/**
 * Client connected
 */
export default async function clientConnected(this: WebsocketServer, message: WebsocketMessagePayload, ws: WebSocket) {
  try {
    if (message.accessToken === undefined) {
      throw new BadParametersError({
        name: 'Websocket authentication',
        message: 'Access token not found',
        metadata: message,
      });
    }

    await this.friday.session.validateAccessToken(message.accessToken);
    const user = await this.friday.user.getById(message.sender);

    this.clients[user.id] = { user, ws };
    this.isAuthenticated = true;

    logger.info(`User ${user.userName} connected in websocket.`);
  } catch (e) {
    logger.error('Websocket authentication failed.');
    ws.close(4000, 'Auth failed');
  }
}
