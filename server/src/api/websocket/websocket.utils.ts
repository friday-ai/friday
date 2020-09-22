/* eslint-disable import/prefer-default-export */
import { WebsocketMessageTypes } from '../../utils/constants';

/**
 * Format websocket message
 * @param {string} type - The type of the websocket message.
 * @param {string} payload - The payload of the message.
 * @example
 * formatWebsocketMessage('message.new', { text: 'test' });
 */
export function formatWebsocketMessage(type: WebsocketMessageTypes, payload: string) {
  return JSON.stringify({ type, payload });
}
