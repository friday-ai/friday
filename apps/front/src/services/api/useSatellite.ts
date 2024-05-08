import type { SatelliteAttributes, SatelliteCreationAttributes } from "@friday-ai/shared";
import { useMutation, useQuery } from "@tanstack/react-query";

import useApp from "../app/useApp";

const useSatellite = () => {
  const { request } = useApp();
  const createSatellite = useMutation({
    mutationFn: (satellite: SatelliteCreationAttributes) => request<SatelliteAttributes>("post", "/api/v1/satellite", {}, satellite),
  });
  const deleteSatellite = useMutation({ mutationFn: (id: string) => request<boolean>("delete", "/api/v1/satellite/:id", { id }) });
  const stopAllPlugins = useMutation({
    mutationFn: (id: string) => request<{ success: boolean }>("patch", `/api/v1/satellite/stop/plugins/${id}`, {}),
  });
  const restartAllPlugins = useMutation({
    mutationFn: (id: string) => request<{ success: boolean }>("patch", `/api/v1/satellite/restart/plugins/${id}`, {}),
  });

  return {
    createSatellite,
    deleteSatellite,
    stopAllPlugins,
    restartAllPlugins,
  };
};

export const useGetSatellites = () => {
  const { request } = useApp();
  return useQuery({ queryKey: ["getSatellites"], queryFn: () => request<SatelliteAttributes[]>("get", "/api/v1/satellite") });
};

export const useGetSatelliteById = (id: string) => {
  const { request } = useApp();
  return useQuery({
    queryKey: ["getSatelliteById"],
    queryFn: () => request<SatelliteAttributes>("get", `api/v1/satellite/${id}`, { scope: "full" }),
  });
};

export default useSatellite;
