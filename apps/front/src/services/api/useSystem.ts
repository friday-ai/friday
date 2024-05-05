import { useMutation, useQuery } from "@tanstack/react-query";

import type { SystemSettings } from "@friday-ai/shared";
import useApp from "../app/useApp";

const useSystem = () => {
  const { request } = useApp();
  const initSystem = useMutation({ mutationFn: () => request<boolean>("post", "/api/v1/system/init") });

  return {
    initSystem,
  };
};

export const useGetSystemSettings = () => {
  const { request } = useApp();
  return useQuery({
    queryKey: ["getSystemSettings"],
    queryFn: () => request<SystemSettings>("get", "/api/v1/system/settings"),
  });
};

export default useSystem;
