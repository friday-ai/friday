import { useCallback, useRef, useState } from 'react';

import { WebsocketMessageTypes } from '@friday-ai/shared';

const port = parseInt(import.meta.env.VITE_SERVER_PORT, 10);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener = (args: any) => void;
type Handlers = Record<WebsocketMessageTypes, Listener[]>;

export interface WebsocketMessagePayload {
  type: WebsocketMessageTypes;
  sender: string;
  receiver?: string;
  accessToken?: string;
  message?: string;
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
        const data = JSON.parse(event.data) as WebsocketMessagePayload;
        if (handlers[data.type] !== undefined) {
          handlers[data.type].forEach((cb) => cb(data));
        }
      };

      // eslint-disable-next-line no-console
      ws.current.onclose = (event) => console.error('connection closed', event);
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
