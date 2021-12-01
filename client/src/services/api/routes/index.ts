import HttpClient from '../HttpClient';

import Scenes from './scenes';
import Satellites from './satellites';

export interface RoutesType {
  scenes: Scenes;
  satellites: Satellites;
}

export const init = (instance: HttpClient): RoutesType => {
  const routes: RoutesType = {
    scenes: new Scenes(instance),
    satellites: new Satellites(instance),
  };

  return routes;
};
