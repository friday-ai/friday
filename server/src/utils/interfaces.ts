import {
  WebsocketMessageTypes, MqttMessageTypes, EventsType, TopicsTypes, AvailableState,
} from '../config/constants';
import DeviceClass from '../core/device/device';
import User from '../core/user/user';
import { DeviceType } from '../config/entities';

/**
 * Options for core functions type 'getAll'
 */
export interface GetOptions {
  scope?: string;
  take?: number;
  skip?: number;
}

/**
 * Options for core errors
 */
export interface ErrorType {
  name: string;
  message: string;
  cause?: Error;
  metadata?: any;
}

/**
 * Options for sending websocket message
 */
export interface WebsocketSendOptions {
  sendAll?: boolean;
  sendAdmins?: boolean;
}

/**
 * Interface for websocket message
 */
export interface WebsocketMessagePayload {
  type: WebsocketMessageTypes;
  sender: string;
  receiver?: string;
  accessToken?: string;
  message?: string;
}

/**
 * Interface for jobs scheduler
 */
export interface JobsInterface {
  name: string;
  rule: string;
  event: EventsType;
}

/**
 * Interface for array with key/value pair
 */
export interface KVArr<T> {
  [Key: string]: T;
}

export interface MqttOptions {
  port: number;
  host?: string;
  hostname?: string
  path?: string
  protocol?: 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs';
  keepalive?: number;
  username?: string;
  password?: string;
  qos?: 0 | 1 | 2;
}

/**
 * Options for sending mqtt message
 */
export interface MqttSendOptions {
  sendAll?: boolean;
}

/**
 * Interface for mqtt message
 */
export interface MqttMessagePayload {
  type: MqttMessageTypes;
  sender: string;
  topic: TopicsTypes;
  message: string | object;
  receiver?: string;
}

/**
 * Interface for plugin container
 */
export interface Color {
  red: number,
  green: number,
  blue: number
}

export interface PluginInstallOptions {
  name: string,
  repoTag: string;
  version: string;
}

export interface FeatureParameter {
  deviceType: DeviceType,
  deviceClass: DeviceClass
  userClass?: User
  userId?: string
  state?: AvailableState | number | Color
  rgb?: Color
}

export interface DeviceTypeParameter {
  deviceId: string,
  state: AvailableState | number | Color
}

export type NestedObjects = KVArr<string>;

export type DeviceSubtypeList = KVArr<NestedObjects>;

export type DeviceTypeCommonFeature = KVArr<NestedObjects>;

export type DeviceSubtypeFeatureList = KVArr<KVArr<NestedObjects>>;


/**
 * Access token interface
 */
export interface AccessTokenType {
  user: string;
  role: string;
  session: string;
}
