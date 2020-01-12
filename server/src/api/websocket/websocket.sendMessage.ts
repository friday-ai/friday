import { WebsocketMessagePayload, WebsocketSendOptions } from '../../../src/utils/interfaces';
import WebSocketServer from './index';
import error, { BadParametersError, NotFoundError } from '../../../src/utils/errors/coreError';
import UserType from '../../../src/core/user/user.interface';
import { UserRole } from '../../../src/utils/constants';

const DEFAULT_OPTIONS: WebsocketSendOptions = {
  sendAll: false,
  sendAdmins: false
};

/**
 * Send message
 */
export default function sendMessage(this: WebSocketServer, message: WebsocketMessagePayload, options?: WebsocketSendOptions) {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (options.sendAll === false && options.sendAdmins === false && (message.receiver === '' || message.receiver === undefined)) {
      throw new BadParametersError({ name: 'Send websocket message', message: 'Incorrect params', metadata: options });
    }

    if (!this.clients[message.sender]) {
      throw new NotFoundError({ name: 'Send websocket message', message: 'User\'s connection not found', metadata: options });
    }

    if (options.sendAll === true) {
      this.clients.forEach((connections: [{ user: UserType, ws: WebSocket }]) => {
        connections.forEach((connection: { user: UserType, ws: WebSocket }) => {
          connection.ws.send(JSON.stringify(message));
        });
      });
    } else if (options.sendAdmins === true) {
      this.clients.forEach((connections: [{ user: UserType, ws: WebSocket }]) => {
        connections.forEach((connection: { user: UserType, ws: WebSocket }) => {
          if (this.user.role === UserRole.ADMIN) {
            connection.ws.send(JSON.stringify(message));
          }
        });
      });
    } else {
      this.clients[message.receiver!].forEach((connection: { ws: WebSocket; }) => {
        connection.ws.send(JSON.stringify(message));
      });
    }

  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e, metadata: options });
  }

}
