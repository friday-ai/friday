import type { PluginAttributes, PluginInstallAttributes } from "@friday-ai/shared";
import { useMutation } from "@tanstack/react-query";

import useApp from "../app/useApp";

const usePlugin = () => {
  const { request } = useApp();

  const installPlugin = useMutation({
    mutationFn: (plugin: PluginInstallAttributes) => request<PluginAttributes>("post", "api/v1/plugin", {}, plugin),
  });

  const stopPlugin = useMutation({ mutationFn: (id: string) => request<{ success: boolean }>("patch", `/api/v1/plugin/stop/${id}`, {}) });
  const restartPlugin = useMutation({ mutationFn: (id: string) => request<{ success: boolean }>("patch", `/api/v1/plugin/restart/${id}`, {}) });
  const uninstallPlugin = useMutation({ mutationFn: (id: string) => request<{ success: boolean }>("delete", `/api/v1/plugin/${id}`, {}) });

  return {
    installPlugin,
    stopPlugin,
    restartPlugin,
    uninstallPlugin,
  };
};

export default usePlugin;
