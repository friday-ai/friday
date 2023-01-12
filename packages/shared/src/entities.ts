import { ActionsType, AvailableConditions, AvailableLanguages, AvailableState, StateOwner, UserRole, VariableOwner } from './constants';
import { Color, Optional, PartlyRequired } from './utils';
import { DeviceCapabilitySettingsSchema, DevicesCapabilities, DevicesTypes } from './devices';

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
  pluginSelector: string;
  viaDevice: string;
  roomId: string;
  pluginId: string;
  device: DeviceAttributes;
  room: RoomAttributes;
  plugin: PluginAttributes;
  capabilities: Array<DeviceCapabilityAttributes>;
};

export type DeviceCreationAttributes = PartlyRequired<
  Partial<Omit<DeviceAttributes, 'id' | 'room' | 'plugin'>>,
  'type' | 'defaultName' | 'defaultManufacturer' | 'defaultModel' | 'pluginId'
>;

/**
 * Device capability type.
 */
export type DeviceCapabilityAttributes = {
  id: string;
  defaultName: string;
  name: string;
  type: DevicesCapabilities;
  deviceId: string;
  roomId: string;
  device: DeviceAttributes;
  room: RoomAttributes;
  settings: DeviceCapabilitySettingsSchema;
  state: DeviceCapabilityStateAttributes;
};

/** Syntactic sugar for "DeviceCapabilityAttributes" */
export type DcAttributes = DeviceCapabilityAttributes;

export type DeviceCapabilityCreationAttributes = PartlyRequired<Partial<Omit<DcAttributes, 'id' | 'room' | 'device'>>, 'defaultName' | 'type'>;

/** Syntactic sugar for "DeviceCapabilityCreationAttributes" */
export type DcCreationAttributes = DeviceCapabilityCreationAttributes;

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

/**
 * Script type.
 */
export type ScriptAttributes = {
  id: string;
  name: string;
  code: string;
};

export type ScriptCreationAttributes = Optional<Omit<ScriptAttributes, 'id'>, 'code'>;

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
  user: Omit<UserAttributes, 'password'>;
};

export type SessionCreationAttributes = Omit<SessionAttributes, 'id' | 'user' | 'accessToken'>;

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
