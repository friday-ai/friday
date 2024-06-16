import type { DeviceAttributes } from "@friday-ai/shared";
import { useQuery } from "@tanstack/react-query";

import useApp from "../app/useApp";

export const useGetDevices = () => {
  const { request } = useApp();
  return useQuery({
    queryKey: ["getDevices"],
    queryFn: () => request<DeviceAttributes[]>("get", "/api/v1/device", { scope: "withCapabilities" }),
  });
};
