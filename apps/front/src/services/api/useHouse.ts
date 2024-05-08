import type { HouseAttributes, HouseCreationAttributes } from "@friday-ai/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useApp from "../app/useApp";

const useHouse = () => {
  const { request } = useApp();
  const queryClient = useQueryClient();

  const createHouse = useMutation({
    mutationFn: (house: HouseCreationAttributes) => request<HouseAttributes>("post", "/api/v1/house", {}, house),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getHouses"] });
    },
  });

  const updateHouse = useMutation({
    mutationFn: ({ id, house }: { id: string; house: HouseCreationAttributes }) =>
      request<HouseAttributes>("patch", `/api/v1/house/${id}`, {}, house),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getHouses"] });
    },
  });

  const deleteHouse = useMutation({
    mutationFn: (id: string) => request<boolean>("delete", `/api/v1/house/${id}`),
    onSuccess: (_res, id) => {
      queryClient.setQueryData(["getHouses"], (prevHouses: HouseAttributes[]) => prevHouses.filter((h) => h.id !== id));
    },
  });

  return {
    createHouse,
    updateHouse,
    deleteHouse,
  };
};

export const useGetHouses = () => {
  const { request } = useApp();
  return useQuery({ queryKey: ["getHouses"], queryFn: () => request<HouseAttributes[]>("get", "/api/v1/house", { scope: "withRooms" }) });
};

export default useHouse;
