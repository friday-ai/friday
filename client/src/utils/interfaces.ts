/**
 * Interface for array with key/value pair
 */

import { AvailableState, StateOwner } from './constants';
import { AvailableLanguages, UserRole } from '../../../server/src/utils/constants';
import VariableType from '../../../server/src/core/variable/variable.interface';
import UserType from '../../../server/src/core/user/user.interface';

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
  id: string;
  name: string;
  houseId: string;
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

export interface SessionType {
  id?: string;
  refreshToken?: string;
  revoked?: boolean;
  validUntil?: Date;
  userId?: string;
  accessToken?: string;
  user?: UserType;
}
