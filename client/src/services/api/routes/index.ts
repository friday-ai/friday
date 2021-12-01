import HttpClient from '../HttpClient';
import DemoClient from '../DemoClient';

import Scenes from './scenes';
import Satellites from './satellites';

export interface RoutesType {
  scenes: Scenes;
  satellites: Satellites;
}

export const init = (instance: HttpClient | DemoClient): RoutesType => {
  const routes: RoutesType = {
    scenes: new Scenes(instance),
    satellites: new Satellites(instance),
  };

  return routes;
};
