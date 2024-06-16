import type { WebsocketMessageTypes } from "./constants";

/**
 * Color interface
 */
export interface Color {
  red: number;
  green: number;
  blue: number;
}

/**
 * Mqtt interface
 */
export interface MqttOptions {
  port: number;
  host?: string;
  hostname?: string;
  path?: string;
  protocol?: "wss" | "ws" | "mqtt" | "mqtts" | "tcp" | "ssl" | "wx" | "wxs";
  keepalive?: number;
  username?: string;
  password?: string;
  qos?: 0 | 1 | 2;
  reconnectPeriod?: number;
}

/**
 * Interface for websocket message
 */
export interface WebsocketPayload {
  type: WebsocketMessageTypes;
  message: unknown;
}

/**
 * Settings interface
 */
export interface SystemSettings {
  version: string;
  units: string;
  history: string;
}

/**
 * Interface for array with key/value pair
 */
export interface KVArr<T> {
  [Key: string]: T;
}

/**
 * Type helper for making certain fields of an object optional. This is helpful
 * for creating the comlpex `CreationAttributes` of database.
 * // Shamelessly copied from https://github.com/sequelize/sequelize/blob/main/src/utils/types.ts
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartlyRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// biome-ignore lint/suspicious/noExplicitAny: "Any" type is necessary here to have flexibility
// biome-ignore lint/complexity/noBannedTypes: Object type is the more appropriate type here
export type Constructor<T = {}> = new (...args: any[]) => T;

// biome-ignore lint/suspicious/noExplicitAny: "Any" type is necessary here to have flexibility
export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
