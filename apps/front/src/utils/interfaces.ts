/**
 * Interface for array with key/value pair
 */

import { AvailableState, StateOwner } from './constants';

export interface KVArr<T> {
  [Key: string]: T;
}

export interface SVGProps {
  className?: string;
  width?: string;
  height?: string;
}

export interface SceneType {
  id: string;
  icon: string;
  name: string;
  description: string;
  status: string;
  errorMessage?: string;
}

export interface ThemeType {
  name: string;
  value: string;
}

export interface StateType {
  id: string;
  owner: string;
  ownerType: StateOwner;
  value: AvailableState;
}

export interface RoomType {
  id?: string;
  name?: string;
  houseId?: string;
}

export interface HouseType {
  id?: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  rooms?: Array<RoomType[]>;
}

export interface PluginType {
  id: string;
  name: string;
  dockerId: string;
  version: string;
  url: string;
  enabled: boolean;
  satelliteId: string;
  state: StateType;
}

export interface PluginInstallType {
  name: string;
  version: string;
  repoTag: string;
  satelliteId: string;
}

export interface SatelliteType {
  id: string;
  name: string;
  url: string;
  roomId: string;
  lastHeartbeat: number;
  room: RoomType;
  state: StateType;
  plugins: PluginType[];
}

export interface UserType {
  id?: string;
  userName?: string;
  email?: string;
  password?: string;
  language?: string;
  role?: string;
  units?: string;
}

export interface SessionType {
  id?: string;
  refreshToken?: string;
  revoked?: boolean;
  validUntil?: Date;
  userId?: string;
  accessToken?: string;
  user?: UserType;
}

export interface VariableType {
  id?: string;
  key?: string;
  value?: string;
  owner?: string;
  ownerType?: string;
}

export interface Marker {
  title: string;
  position: [number, number];
}

export interface DeviceType {
  id?: string;
  defaultName?: string;
  defaultManufacturer?: string;
  defaultModel?: string;
  name?: string;
  type?: string;
  manufacturer?: string;
  model?: string;
  pluginSelector?: string;
  viaDevice?: string;
  roomId?: string;
  pluginId?: string;
  device?: DeviceType;
  room?: RoomType;
  plugin?: PluginType;
  capabilities?: DeviceCapabilityType[];
}

export interface DeviceCapabilityType {
  id?: string;
  defaultName?: string;
  name?: string;
  type?: 'onoff' | 'brightness';
  deviceId?: string;
  roomId?: string;
  device?: DeviceType;
  room?: RoomType;
  settings?: DeviceCapabilitySettingsType;
  state?: DeviceCapabilityStateType;
}

export interface DeviceCapabilitySettingsType {
  id?: string;
  settings?: DeviceCapabilitySettingsSchema;
  capabilityId?: string;
  capability?: DeviceCapabilityType;
}

export interface DeviceCapabilityStateType {
  id?: string;
  value?: string | number | boolean;
  last?: boolean;
  capabilityId?: string;
  capability?: DeviceCapabilityType;
}

type OnOffSettings = null;

interface BrightnessSettings extends Record<string, number> {
  min: number;
  max: number;
  step: number;
}

export type DeviceCapabilitySettingsSchema = OnOffSettings | BrightnessSettings;
