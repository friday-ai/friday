import React from 'react';
import { SessionType } from '../../utils/interfaces';
import { WebsocketMessageType } from '../../utils/constants';

const port = parseInt(import.meta.env.VITE_SERVER_PORT, 10);

class Websockets {
  public socket: WebSocket | null;
  public session: SessionType;
  public setSession: React.Dispatch<React.SetStateAction<SessionType>>;
  public listeners: { [key: string]: (message: string) => void };

  constructor(session: SessionType, setSession: React.Dispatch<React.SetStateAction<SessionType>>) {
    this.socket = null;
    this.session = session;
    this.setSession = setSession;
    this.listeners = {};
  }

  connect(session: SessionType, retryCount = 0) {
    if (retryCount >= 3) {
      localStorage.removeItem('session');
      this.setSession({});
      throw new Error('MAX_RETRY_EXCEEDED');
    }
    this.session = session;
    this.socket = new WebSocket(`ws://localhost:${port}`);
    this.socket.onopen = () => {
      this.socket?.send(
        JSON.stringify({
          type: 'authenticate',
          accessToken: this.session.accessToken,
          sender: this.session.userId,
        })
      );
    };

    this.socket.onclose = (e) => {
      console.error(e);
      if (e.reason === WebsocketMessageType.INVALID_ACCESS_TOKEN) {
        localStorage.removeItem('session');
        this.setSession({});
      } else if (e.code !== 1005 && e.code !== 1000) {
        setTimeout(() => {
          this.connect(this.session, retryCount + 1);
        }, 1000);
      }
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const listener = this.listeners[data.type];
      if (listener) {
        listener(data.message);
      }
    };
  }

  addListener(event: WebsocketMessageType, listener: (message: string) => void) {
    this.listeners[event] = listener;
  }

  send(message: string) {
    if (this.socket) {
      this.socket.send(message);
    }
  }
}

export default Websockets;
