import * as WebSocket from 'ws';
import { UserAttributes } from '@friday/shared';
import Friday from '../../core/friday';
import handleMessage from './websocket.handleMessage';
import clientConnected from './websocket.clientConnected';
import clientDisconnected from './websocket.clientDisconnected';
import sendMessage from './websocket.sendMessage';
import { EventsType } from '../../config/constants';

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
  public handleMessage = handleMessage;
  public sendMessage = sendMessage;

  constructor(wss: WebSocket.Server, friday: Friday) {
    this.wss = wss;
    this.friday = friday;
    this.friday.event.on(EventsType.WEBSOCKET_SEND, (event) => this.sendMessage(event));
    this.friday.event.on(EventsType.WEBSOCKET_SEND_ALL, (event) => this.sendMessage(event, { sendAll: true }));
    this.friday.event.on(EventsType.WEBSOCKET_SEND_ADMIN, (event) => this.sendMessage(event, { sendAdmins: true }));
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
        await this.handleMessage(JSON.parse(message), ws);
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
