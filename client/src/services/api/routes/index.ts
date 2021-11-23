import Scenes from './scenes';
import Satellites from './satellites';
import apiInstance from '../apiInstance';

export interface RoutesType {
  scenes: Scenes;
  satellites: Satellites;
}

export const init = (instance: typeof apiInstance): RoutesType => {
  const routes: RoutesType = {
    scenes: new Scenes(instance),
    satellites: new Satellites(instance),
  };

  return routes;
};
