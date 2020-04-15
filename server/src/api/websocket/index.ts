import * as WebSocket from 'ws';
import Friday from '../../core/friday';
import handleMessage from './websocket.handleMessage';
import clientConnected from './websocket.clientConnected';
import clientDisconnected from './websocket.clientDisconnected';
import sendMessage from './websocket.sendMessage';
import UserType from '../../core/user/user.interface';
import { EventsType } from '../../utils/constants';

/**
 * Web socket manager
 */
export default class WebsocketServer {
  public friday: Friday;
  public wss: WebSocket.Server;
  public clients: { [x: string]: any } = [];
  public user: UserType = {};
  public isAuthenticated: boolean = false;
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
      this.user = {};
      this.isAuthenticated = false;

      ws.on('close', () => {
        this.clientDisconnected(ws);
      });

      ws.on('message', (message: string) => {
        this.handleMessage(JSON.parse(message), ws);
      });

      setTimeout(() => {
        if (this.isAuthenticated === false) {
          ws.terminate();
        }
      // tslint:disable-next-line: align
      }, 5000);
    });
  }
}
