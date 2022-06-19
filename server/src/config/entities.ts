import {
  ActionsType,
  AvailableConditions,
  AvailableLanguages,
  AvailableState,
  StateOwner,
  UserRole, VariableOwner,
} from './constants';
import { Color } from '../utils/interfaces';

/**
 * Action interface
 */
export interface ActionType {
  id?: string;
  name?: string;
  description?: string;
  type?: ActionsType;
  subType?: string;
  variableKey?: any;
  variableValue?: string;
  sceneId?: string;
  scene?: SceneType;
}

/**
 * Device interface.
 */
export interface DeviceType {
  id?: string;
  name?: string;
  type?: string;
  subType?: string;
  variable?: any;
  unit?: string;
  value?: string;
  roomId?: string;
  room?: RoomType;
  pluginId?: string;
  plugin?: PluginType;
  state?: StateType;
}

/**
 * Trigger interface.
 */
export interface TriggerType {
  id?: string;
  name?: string;
  description?: string;
  type?: AvailableConditions;
  rules?: any;
  scenes?: Array<SceneType>;
}

/**
 * House interface.
 */
export interface HouseType {
  id?: string;
  name?: string;
  latitude?: string;
  longitude?: string;
  rooms?: Array<RoomType[]>;
  state?: StateType;
}

/**
 * Plugin interface.
 */
export interface PluginType {
  id?: string;
  dockerId?: string;
  name?: string;
  version?: string;
  url?: string;
  enabled?: boolean;
  satelliteId?: string;
  satellite?: SatelliteType;
  state?: StateType;
  devices?: Array<DeviceType[]>;
  variables?: Array<VariableType[]>;
  lastHeartbeat?: Date;
}

/**
 * Room interface.
 */
export interface RoomType {
  id?: string;
  name?: string;
  houseId?: string;
  house?: HouseType;
  devices?: Array<DeviceType[]>;
  state?: StateType;
  satellites?: Array<SatelliteType[]>;
}

/**
 * Satellite interface.
 */
export interface SatelliteType {
  id?: string;
  name?: string;
  roomId?: string;
  room?: RoomType;
  plugins?: Array<PluginType[]>;
  variables?: Array<VariableType[]>;
  state?: StateType;
  lastHeartbeat?: Date;
}

/**
 * Scene interface.
 */
export interface SceneType {
  id?: string;
  name?: string;
  description?: string;
  triggerId?: string;
  trigger?: Array<TriggerType[]>;
  actions?: Array<ActionType[]>;
}

/**
 * Script interface.
 */
export interface ScriptType {
  id?: string;
  name?: string;
  code?: string;
}

/**
 * Session interface.
 */
export interface SessionType {
  id?: string;
  refreshToken?: string;
  revoked?: boolean;
  validUntil?: Date;
  userId?: string;
  accessToken?: string;
  user?: UserType;
}

/**
 * State interface.
 */
export interface StateType {
  id?: string;
  owner: string;
  ownerType: StateOwner;
  value: AvailableState | number | Color;
  last?: boolean;
  user?: UserType;
  room?: RoomType;
  house?: HouseType;
  plugin?: PluginType;
  satellite?: SatelliteType;
  device?: DeviceType;
}

/**
 * User interface.
 */
export interface UserType {
  id?: string;
  userName?: string;
  email?: string;
  password?: string;
  theme?: string;
  role?: UserRole;
  language?: AvailableLanguages;
  state?: StateType;
  variables?: Array<VariableType[]>;
}

/**
 * Variable interface.
 */
export interface VariableType {
  id?: string;
  key?: string;
  value?: string;
  owner?: string;
  ownerType?: VariableOwner;
}