import * as WebSocket from 'ws';
import { WebsocketMessagePayload } from '../../../src/utils/interfaces';
import { WebsocketMessageTypes } from '../../utils/constants';
import Log from '../../utils/log';
import WebsocketServer from '.';
const logger = new Log();

/**
 * Handle message
 */
export default function handleMessage(this: WebsocketServer, message: WebsocketMessagePayload, ws: WebSocket) {
  switch (message.type) {
    case WebsocketMessageTypes.AUTHENTICATION:
      this.clientConnected(message, ws);
      break;
    case WebsocketMessageTypes.MESSAGE_SEND:
      this.sendMessage(message);
      break;
    case WebsocketMessageTypes.MESSAGE_SEND_ALL:
      this.sendMessage(message, {sendAll: true});
      break;
    case WebsocketMessageTypes.MESSAGE_SEND_ADMIN:
      this.sendMessage(message, {sendAdmins: true});
      break;
    default:
      logger.error(`Websocket message type not handled: ${message.type}`);
  }
}
