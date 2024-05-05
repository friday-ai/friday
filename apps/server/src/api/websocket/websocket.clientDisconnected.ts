import logger from "@friday-ai/logger";
import type * as WebSocket from "ws";
import type WebsocketServer from ".";

/**
 * Client disconnected
 */
export default function clientDisconnected(this: WebsocketServer, ws: WebSocket) {
  const userId = Object.keys(this.clients).find((key) => this.clients[key].ws === ws);

  if (userId !== undefined) {
    logger.info(`User ${this.clients[userId].user.userName} disconnected of websocket`);
    delete this.clients[userId];
  }
}
