import { useCallback, useRef, useState } from 'react';

import { WebsocketMessageTypes, WebsocketPayload } from '@friday-ai/shared';

const port = parseInt(import.meta.env.VITE_SERVER_PORT, 10);

type Listener = (payload: WebsocketPayload) => void;
type Handlers = Record<WebsocketMessageTypes, Listener[]>;

export interface WebsocketMessagePayload {
  type: WebsocketMessageTypes;
  sender: string;
  receiver?: string;
  accessToken?: string;
  message?: unknown;
}

const useWebsocket = () => {
  const ws = useRef<WebSocket>();
  const [handlers, setHandlers] = useState<Handlers>({} as Handlers);

  const connect = useCallback(
    (accessToken: string, userId: string) => {
      ws.current = new WebSocket(`ws://${window.location.hostname}:${port}`);

      ws.current.onopen = () => {
        if (ws.current?.readyState === 1) {
          ws.current?.send(
            JSON.stringify({
              type: WebsocketMessageTypes.AUTHENTICATION,
              data: { accessToken, userId },
            })
          );
        }
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data) as WebsocketPayload;
        if (handlers[data.type] !== undefined) {
          handlers[data.type].forEach((cb) => cb(data));
        }
      };

      ws.current.onclose = (event) => {
        if (event.reason === 'Auth failed') {
          throw Error('Auth failed');
        }

        if (event.code === 1006) {
          throw Error('Connection timeout');
        }
      };
    },
    [handlers]
  );

  const on = useCallback(
    (event: WebsocketMessageTypes, callback: Listener) => {
      const newHandlers = handlers;

      if (newHandlers[event] === undefined) {
        newHandlers[event] = [];
      }

      newHandlers[event].push(callback);
      setHandlers(newHandlers);
    },
    [handlers, setHandlers]
  );

  const off = useCallback(
    (event: WebsocketMessageTypes, callback: Listener) => {
      const newHandlers = handlers;

      if (newHandlers[event] !== undefined) {
        newHandlers[event] = newHandlers[event].filter((listener) => listener.toString() !== callback.toString());
        setHandlers(newHandlers);
      }
    },
    [handlers, setHandlers]
  );

  return { connect, on, off, send: ws.current?.send };
};

export default useWebsocket;
