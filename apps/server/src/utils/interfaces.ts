import { DevicesActions, WebsocketMessageTypes } from '@friday-ai/shared';
import { Order } from 'sequelize';
import { EventsType, MqttMessageTypes, TopicsTypes } from '../config/constants';

/**
 * Options for core functions type 'getAll'
 */
export interface GetOptions {
  scope?: string;
  take?: number;
  skip?: number;
  order?: Order;
}

/**
 * Options for core errors
 */
export interface ErrorType {
  name: string;
  message: string;
  cause?: Error;
  metadata?: unknown;
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

export interface NewWebsocketPayload {
  type: WebsocketMessageTypes;
  data: string;
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

export interface DeviceCommandType {
  action: DevicesActions;
  params: unknown;
}

export interface CapabilityManagerParams {
  actions: DevicesActions[];
}

export interface CapabilityManagerParamsList {
  [key: string]: CapabilityManagerParams;
}

/**
 * Access token interface
 */
export interface AccessTokenType {
  user: string;
  role: string;
  session: string;
}
