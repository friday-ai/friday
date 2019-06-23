import Scene from '../scene/scene.interface';

export default interface SatelliteType {
  id: string;
  name?: string;
  description?: string;
  type?: string;
  rules?: any;
  scenes?: Array<Scene[]>;
}
