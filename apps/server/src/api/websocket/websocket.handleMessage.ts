import * as WebSocket from 'ws';
import { WebsocketMessageTypes } from '@friday/shared';
import logger from '@friday/logger';
import { WebsocketMessagePayload } from '../../utils/interfaces';
import WebsocketServer from '.';

/**
 * Handle message
 */
export default async function handleMessage(this: WebsocketServer, message: WebsocketMessagePayload, ws: WebSocket) {
  switch (message.type) {
    case WebsocketMessageTypes.AUTHENTICATION:
      await this.clientConnected(message, ws);
      break;
    case WebsocketMessageTypes.MESSAGE_SEND:
      this.sendMessage(message);
      break;
    case WebsocketMessageTypes.MESSAGE_SEND_ALL:
      this.sendMessage(message, { sendAll: true });
      break;
    case WebsocketMessageTypes.MESSAGE_SEND_ADMIN:
      this.sendMessage(message, { sendAdmins: true });
      break;
    default:
      logger.error(`Websocket message type not handled: ${message.type}`);
  }
}
