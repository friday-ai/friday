import { PluginAttributes, PluginInstallAttributes } from '@friday-ai/shared';
import { useMutation } from 'react-query';

import useApp from '../app/useApp';

const usePlugin = () => {
  const { request } = useApp();

  const installPlugin = useMutation((plugin: PluginInstallAttributes) => request<PluginAttributes>('post', 'api/v1/plugin', {}, plugin));
  const stopPlugin = useMutation((id: string) => request<{ success: boolean }>('patch', `/api/v1/plugin/stop/${id}`, {}));
  const restartPlugin = useMutation((id: string) => request<{ success: boolean }>('patch', `/api/v1/plugin/restart/${id}`, {}));
  const uninstallPlugin = useMutation((id: string) => request<{ success: boolean }>('delete', `/api/v1/plugin/${id}`, {}));

  return {
    installPlugin,
    stopPlugin,
    restartPlugin,
    uninstallPlugin,
  };
};

export default usePlugin;
