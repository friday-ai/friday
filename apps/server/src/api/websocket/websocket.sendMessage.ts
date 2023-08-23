import { NewWebsocketPayload } from '../../utils/interfaces';
import WebSocketServer from './index';
import error, { BadParametersError } from '../../utils/decorators/error';

/**
 * Send message
 */
export default function sendMessage(this: WebSocketServer, payload: NewWebsocketPayload, toUser = '', sendAll = false) {
  try {
    if (toUser === '' && sendAll === false) {
      throw new BadParametersError({
        name: 'Send websocket message',
        message: 'Incorrect params, no user id provided and send all is set as false',
        metadata: { toUser, sendAll },
      });
    }

    if (sendAll) {
      this.wss.clients.forEach((client) => {
        client.send(JSON.stringify(payload));
      });
    }

    if (toUser !== '' && this.clients[toUser] && this.clients[toUser].ws.readyState === WebSocket.OPEN) {
      this.clients[toUser].ws.send(JSON.stringify(payload));
    }
  } catch (e) {
    throw error({
      name: e.name,
      message: e.message,
      cause: e,
      metadata: { toUser, sendAll },
    });
  }
}
