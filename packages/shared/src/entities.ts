import { ActionsType, AvailableConditions, AvailableLanguages, AvailableState, StateOwner, UserRole, VariableOwner } from './constants';
import { DeviceCapabilitySettingsSchema, DevicesCapabilities, DevicesTypes } from './devices';
import { Color, Optional, PartlyRequired } from './utils';

/**
 * Action type
 */
export type ActionAttributes = {
  id: string;
  name: string;
  description: string;
  type: ActionsType;
  subType: string;
  variableKey: unknown;
  variableValue: string;
  sceneId: string;
  scene: SceneAttributes;
};

export type ActionCreationAttributes = Optional<Omit<ActionAttributes, 'id' | 'scene'>, 'variableKey' | 'variableValue'>;
export const ActionCreationKeys = ['name', 'description', 'type', 'subType', 'sceneId', 'variableKey', 'variableValue'];

/**
 * Device type.
 */
export type DeviceAttributes = {
  id: string;
  defaultName: string;
  defaultManufacturer: string;
  defaultModel: string;
  name: string;
  type: DevicesTypes;
  manufacturer: string;
  model: string;
  externalId: string;
  viaDevice: string;
  roomId: string;
  pluginId: string;
  device: DeviceAttributes;
  room: RoomAttributes;
  plugin: PluginAttributes;
  capabilities: Array<DeviceCapabilityAttributes>;
};

export type DeviceCreationAttributes = PartlyRequired<
  Partial<Omit<DeviceAttributes, 'id' | 'room' | 'plugin' | 'capabilities' | 'device'>>,
  'type' | 'defaultName' | 'defaultManufacturer' | 'defaultModel' | 'pluginId'
>;

export const DeviceCreationKeys = [
  'defaultName',
  'defaultManufacturer',
  'defaultModel',
  'name',
  'type',
  'manufacturer',
  'model',
  'externalId',
  'viaDevice',
  'roomId',
  'pluginId',
];

/**
 * Device capability type.
 */
export type DeviceCapabilityAttributes = {
  id: string;
  defaultName: string;
  name: string;
  type: DevicesCapabilities;
  externalId: string;
  deviceId: string;
  roomId: string;
  device: DeviceAttributes;
  room: RoomAttributes;
  settings: DeviceCapabilitySettingsAttributes;
  state: DeviceCapabilityStateAttributes;
};

/** Syntactic sugar for "DeviceCapabilityAttributes" */
export type DcAttributes = DeviceCapabilityAttributes;

export type DeviceCapabilityCreationAttributes = PartlyRequired<Partial<Omit<DcAttributes, 'id' | 'room' | 'device'>>, 'defaultName' | 'type'>;

/** Syntactic sugar for "DeviceCapabilityCreationAttributes" */
export type DcCreationAttributes = DeviceCapabilityCreationAttributes;

export const DeviceCapabilityCreationKeys = ['defaultName', 'name', 'type', 'externalId', 'deviceId', 'roomId', 'settings', 'state'];

/** Syntactic sugar for "DeviceCapabilityCreationKeys" */
export const DcCreationKeys = DeviceCapabilityCreationKeys;

/**
 * Device capability settings type.
 */
export type DeviceCapabilitySettingsAttributes = {
  id: string;
  settings: DeviceCapabilitySettingsSchema;
  capabilityId: string;
  capability: DeviceCapabilityAttributes;
};

/** Syntactic sugar for "DeviceCapabilitySettingsAttributes" */
export type DcsAttributes = DeviceCapabilitySettingsAttributes;

export type DeviceCapabilitySettingsCreationAttributes = PartlyRequired<Partial<Omit<DcsAttributes, 'id' | 'capability'>>, 'capabilityId'>;

/** Syntactic sugar for "DeviceCapabilitySettingsCreationAttributes" */
export type DcsCreationAttributes = DeviceCapabilitySettingsCreationAttributes;

/**
 * Device capability state type.
 */
export type DeviceCapabilityStateAttributes = {
  id: string;
  value: string | number | boolean | Color;
  last: boolean;
  capabilityId: string;
  capability: DeviceCapabilityAttributes;
};

/** Syntactic sugar for "DeviceCapabilityStateAttributes" */
export type DcstAttributes = DeviceCapabilityStateAttributes;

export type DeviceCapabilityStateCreationAttributes = PartlyRequired<Partial<Omit<DcstAttributes, 'id' | 'capability'>>, 'value' | 'capabilityId'>;

/** Syntactic sugar for "DeviceCapabilityStateCreationAttributes" */
export type DcstCreationAttributes = DeviceCapabilityStateCreationAttributes;

export const DeviceCapabilityStateCreationKeys = ['value', 'last', 'capabilityId'];

/** Syntactic sugar for "DeviceCapabilityStateCreationKeys" */
export const DcstCreationKeys = DeviceCapabilityStateCreationKeys;

/**
 * House type.
 */
export type HouseAttributes = {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  rooms: Array<RoomAttributes>;
  state: StateAttributes;
};

export type HouseCreationAttributes = Optional<Omit<HouseAttributes, 'id'>, 'rooms' | 'state'>;
export const HouseCreationKeys = ['name', 'latitude', 'longitude', 'rooms', 'state'];

/**
 * Plugin type.
 */
export type PluginAttributes = {
  id: string;
  dockerId: string;
  name: string;
  version: string;
  url: string;
  enabled: boolean;
  satelliteId: string;
  satellite: SatelliteAttributes;
  state: StateAttributes;
  devices: Array<DeviceAttributes>;
  variables: Array<VariableAttributes>;
  lastHeartbeat: Date;
};

export type PluginCreationAttributes = Optional<Omit<PluginAttributes, 'id' | 'satellite' | 'devices'>, 'state' | 'variables'>;
export const PluginCreationKeys = ['dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'state', 'variables', 'lastHeartbeat'];

export type PluginInstallAttributes = {
  name: string;
  repo: string;
  version: string;
  satelliteId: string;
  variables: Array<{ key: string; value: string }> | [];
};

/**
 * Room type.
 */
export type RoomAttributes = {
  id: string;
  name: string;
  houseId: string;
  house: HouseAttributes;
  devices: Array<DeviceAttributes>;
  state: StateAttributes;
  satellites: Array<SatelliteAttributes>;
};

export type RoomCreationAttributes = Optional<Omit<RoomAttributes, 'id' | 'house' | 'devices' | 'satellites'>, 'state'>;
export const RoomsCreationKeys = ['name', 'houseId', 'state'];

/**
 * Satellite type.
 */
export type SatelliteAttributes = {
  id: string;
  name: string;
  roomId: string;
  room: RoomAttributes;
  plugins: Array<PluginAttributes>;
  variables: Array<VariableAttributes>;
  state: StateAttributes;
  lastHeartbeat: Date;
};

export type SatelliteCreationAttributes = Optional<Omit<SatelliteAttributes, 'id' | 'room' | 'plugins'>, 'variables' | 'state'>;
export const SatelliteCreationKeys = ['name', 'roomId', 'variables', 'state', 'lastHeartbeat'];

/**
 * Scene type.
 */
export type SceneAttributes = {
  id: string;
  name: string;
  description: string;
  triggerId: string;
  trigger: Array<TriggerAttributes>;
  actions: Array<ActionAttributes>;
};

export type SceneCreationAttributes = Optional<Omit<SceneAttributes, 'id' | 'trigger'>, 'triggerId' | 'actions'>;
export const SceneCreationKeys = ['name', 'description', 'triggerId', 'actions'];

/**
 * Script type.
 */
export type ScriptAttributes = {
  id: string;
  name: string;
  code: string;
};

export type ScriptCreationAttributes = Optional<Omit<ScriptAttributes, 'id'>, 'code'>;
export const ScriptCreationKeys = ['name', 'code'];

/**
 * Session type.
 */
export type SessionAttributes = {
  id: string;
  refreshToken: string;
  revoked: boolean;
  validUntil: Date;
  userId: string;
  accessToken: string;
  userAgent: string;
  user: SessionCredentials;
  createdAt: Date;
};

export type SessionCreationAttributes = Omit<SessionAttributes, 'id' | 'user' | 'accessToken' | 'createdAt'>;
export type SessionCredentials = Optional<Omit<UserAttributes, 'password' | 'state' | 'variables'>, 'theme' | 'language'>;

export const SessionCreationKeys = ['refreshToken', 'revoked', 'validUntil', 'userId', 'userAgent'];

/**
 * State type.
 */
export type StateAttributes = {
  id: string;
  owner: string;
  ownerType: StateOwner;
  value: AvailableState | number | Color;
  last: boolean;
  user: UserAttributes;
  room: RoomAttributes;
  house: HouseAttributes;
  plugin: PluginAttributes;
  satellite: SatelliteAttributes;
  device: DeviceAttributes;
};

export type StateCreationAttributes = Omit<StateAttributes, 'id' | 'user' | 'room' | 'house' | 'plugin' | 'satellite' | 'device'>;
export const StateCreationKeys = ['owner', 'ownerType', 'value', 'last'];

/**
 * Trigger type.
 */
export type TriggerAttributes = {
  id: string;
  name: string;
  description: string;
  type: AvailableConditions;
  rules: unknown;
  scenes: Array<SceneAttributes>;
};

export type TriggerCreationAttributes = Optional<Omit<TriggerAttributes, 'id'>, 'rules' | 'scenes'>;
export const TriggerCreationKeys = ['name', 'description', 'type', 'rules', 'scenes'];

/**
 * User type.
 */
export type UserAttributes = {
  id: string;
  userName: string;
  email: string;
  password: string;
  theme: string;
  role: UserRole;
  language: AvailableLanguages;
  state: StateAttributes;
  variables: Array<VariableAttributes>;
};

export type UserCreationAttributes = Optional<Omit<UserAttributes, 'id'>, 'theme' | 'state' | 'variables'>;
export type UserCredentialsAttributes = Optional<
  Omit<UserAttributes, 'id' | 'theme' | 'role' | 'language' | 'state' | 'variables'>,
  'userName' | 'email'
>;
export type UserUpdateAttributes = Optional<UserCreationAttributes, 'userName' | 'email' | 'language' | 'password' | 'role'>;
export const UserCreationKeys = ['userName', 'email', 'password', 'theme', 'role', 'language', 'state'];

/**
 * Variable type.
 */
export type VariableAttributes = {
  id: string;
  key: string;
  value: string;
  owner: string;
  ownerType: VariableOwner;
};

export type VariableCreationAttributes = Omit<VariableAttributes, 'id'>;
export const VariableCreationKeys = ['key', 'value', 'owner', 'ownerType'];
