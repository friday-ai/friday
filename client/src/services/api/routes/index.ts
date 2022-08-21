import HttpClient from '../HttpClient';
import DemoClient from '../DemoClient';

import Scenes from './scenes';
import Satellites from './satellites';
import Users from './users';
import Variables from './variables';
import Houses from './houses';
import Rooms from './rooms';
import System from './system';
import Plugins from './plugins';

export interface RoutesType {
  scenes: Scenes;
  satellites: Satellites;
  users: Users;
  variables: Variables;
  houses: Houses;
  rooms: Rooms;
  system: System;
  plugins: Plugins;
}

export const init = (instance: HttpClient | DemoClient): RoutesType => {
  return {
    scenes: new Scenes(instance),
    satellites: new Satellites(instance),
    users: new Users(instance),
    variables: new Variables(instance),
    houses: new Houses(instance),
    rooms: new Rooms(instance),
    system: new System(instance),
    plugins: new Plugins(instance),
  };
};
