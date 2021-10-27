import Scenes from './scenes';
import apiInstance from '../apiInstance';

export interface RoutesType {
  scenes: Scenes;
}

export const init = (instance: typeof apiInstance): RoutesType => {
  const routes: RoutesType = {
    scenes: new Scenes(instance),
  };

  return routes;
};
