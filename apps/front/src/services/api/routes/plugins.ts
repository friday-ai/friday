import HttpClient from '../HttpClient';
import { PluginInstallType, PluginType } from '../../../utils/interfaces';
import DemoClient from '../DemoClient';

class Plugins {
  readonly api: HttpClient | DemoClient;

  constructor(api: HttpClient | DemoClient) {
    this.api = api;
  }

  install = async (data: PluginInstallType): Promise<PluginType> => {
    return this.api.post<PluginType>(`/api/v1/plugin`, data);
  };
}

export default Plugins;
