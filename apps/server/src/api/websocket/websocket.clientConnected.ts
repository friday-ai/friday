import * as WebSocket from 'ws';
import logger from '@friday-ai/logger';
import WebsocketServer from '.';
import { BadParametersError } from '../../utils/decorators/error';

interface AuthPayload {
  accessToken: string;
  userId: string;
}

/**
 * Client connected
 */
export default async function clientConnected(this: WebsocketServer, payload: string, ws: WebSocket) {
  const authPayload = JSON.parse(payload) as AuthPayload;

  try {
    if (authPayload.accessToken === undefined) {
      throw new BadParametersError({
        name: 'Websocket authentication',
        message: 'Access token not found',
        metadata: authPayload,
      });
    }

    await this.friday.session.validateAccessToken(authPayload.accessToken);
    const user = await this.friday.user.getById(authPayload.userId);

    this.clients[user.id] = { user, ws };
    this.isAuthenticated = true;

    logger.info(`User ${user.userName} connected in websocket.`);
  } catch (e) {
    logger.error('Websocket authentication failed.');
    ws.close(4000, 'Auth failed');
  }
}
