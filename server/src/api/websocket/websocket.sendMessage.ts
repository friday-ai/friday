import { WebsocketMessagePayload, WebsocketSendOptions } from '../../utils/interfaces';
import WebSocketServer from './index';
import error, { BadParametersError, NotFoundError } from '../../utils/errors/coreError';
import UserType from '../../core/user/user.interface';
import { UserRole } from '../../utils/constants';

const DEFAULT_OPTIONS: WebsocketSendOptions = {
  sendAll: false,
  sendAdmins: false,
};

/**
 * Send message
 */
export default function sendMessage(this: WebSocketServer, message: WebsocketMessagePayload, options?: WebsocketSendOptions) {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    if (mergedOptions.sendAll === false && mergedOptions.sendAdmins === false && (message.receiver === '' || message.receiver === undefined)) {
      throw new BadParametersError({ name: 'Send websocket message', message: 'Incorrect params', metadata: mergedOptions });
    }

    if (!this.clients[message.sender]) {
      throw new NotFoundError({ name: 'Send websocket message', message: 'User\'s connection not found', metadata: mergedOptions });
    }

    if (mergedOptions.sendAll === true) {
      this.clients.forEach((connections: [{ user: UserType, ws: WebSocket }]) => {
        connections.forEach((connection: { user: UserType, ws: WebSocket }) => {
          connection.ws.send(JSON.stringify(message));
        });
      });
    } else if (mergedOptions.sendAdmins === true) {
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
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
