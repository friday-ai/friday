
import Scene from '../scene/scene.interface';

export default interface DeviceType {
  id: string;
  name?: string;
  description?: string;
  type?: string;
  subType?: string;
  variableKey?: any;
  variableValue?: string;
  sceneId?: string;
  scene?: Scene;
}
