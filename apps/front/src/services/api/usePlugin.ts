import { PluginAttributes, PluginInstallAttributes } from '@friday-ai/shared';
import { useMutation } from 'react-query';

import useApp from '../app/useApp';

const usePlugin = () => {
  const { request } = useApp();

  const installPlugin = useMutation((plugin: PluginInstallAttributes) => request<PluginAttributes>('post', 'api/v1/plugin', {}, plugin));
  const uninstallPlugin = useMutation((id: string) => request<boolean>('delete', '/api/v1/plugin/:id', { id }));

  return {
    installPlugin,
    uninstallPlugin,
  };
};

export default usePlugin;
