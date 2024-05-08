import type { WebsocketPayload } from "@friday-ai/shared";
import error, { BadParametersError } from "../../utils/decorators/error";
import type WebSocketServer from "./index";

/**
 * Send message
 */
export default function sendMessage(this: WebSocketServer, payload: WebsocketPayload, toUser = "", sendAll = false) {
  try {
    if (toUser === "" && sendAll === false) {
      throw new BadParametersError({
        name: "Send websocket message",
        message: "Incorrect params, no user id provided and send all is set as false",
        metadata: { toUser, sendAll },
      });
    }

    if (sendAll) {
      for (const client of this.wss.clients) {
        client.send(JSON.stringify(payload));
      }
    }

    if (toUser !== "" && this.clients[toUser] && this.clients[toUser].ws.readyState === WebSocket.OPEN) {
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
