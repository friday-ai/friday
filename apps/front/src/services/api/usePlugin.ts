import { PluginAttributes, PluginInstallAttributes } from '@friday-ai/shared';
import { useMutation } from 'react-query';

import useApp from '../app/useApp';

const usePlugin = () => {
  const { request } = useApp();

  const installPlugin = useMutation((plugin: PluginInstallAttributes) => request<PluginAttributes>('post', 'api/v1/plugin', {}, plugin));
  const uninstallPlugin = useMutation((id: string) => request<{ success: boolean }>('delete', `/api/v1/plugin/${id}`, {}));

  return {
    installPlugin,
    uninstallPlugin,
  };
};

export default usePlugin;
