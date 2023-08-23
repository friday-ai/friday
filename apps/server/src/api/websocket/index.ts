import logger from '@friday-ai/logger';
import { UserAttributes, WebsocketMessageTypes } from '@friday-ai/shared';
import * as WebSocket from 'ws';
import { EventsType } from '../../config/constants';
import Friday from '../../core/friday';
import clientConnected from './websocket.clientConnected';
import clientDisconnected from './websocket.clientDisconnected';
import sendMessage from './websocket.sendMessage';
import { NewWebsocketPayload } from '../../utils/interfaces';

/**
 * Web socket manager
 */
export default class WebsocketServer {
  public friday: Friday;
  public wss: WebSocket.Server;
  public clients: Record<string, { user: UserAttributes; ws: WebSocket }> = {};
  public isAuthenticated = false;

  public clientConnected = clientConnected;
  public clientDisconnected = clientDisconnected;
  public sendMessage = sendMessage;

  constructor(wss: WebSocket.Server, friday: Friday) {
    this.wss = wss;
    this.friday = friday;
    this.friday.event.on(EventsType.WEBSOCKET_SEND, (event) => this.sendMessage(event));
    this.friday.event.on(EventsType.WEBSOCKET_SEND_ALL, (event) => this.sendMessage(event, '', true));
  }

  /**
   * Start function of websocket server
   * @memberof WebSocketServer
   */
  start() {
    this.wss.on('connection', (ws: WebSocket) => {
      this.isAuthenticated = false;

      ws.on('close', () => {
        this.clientDisconnected(ws);
      });

      ws.on('message', async (message: string) => {
        const payload = JSON.parse(message) as NewWebsocketPayload;

        if (payload.type === WebsocketMessageTypes.AUTHENTICATION) {
          await this.clientConnected(JSON.stringify(payload.data), ws);
        } else {
          logger.warning(`Websocket message type: ${payload.type} not handled`);
        }
      });

      setTimeout(() => {
        if (!this.isAuthenticated) {
          ws.terminate();
        }
        // tslint:disable-next-line: align
      }, 5000);
    });
  }
}
