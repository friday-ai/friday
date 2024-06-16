import type { DevicesActions } from "@friday-ai/shared";
import { useMutation } from "@tanstack/react-query";

import useApp from "../app/useApp";

const useCapabilities = () => {
  const { request } = useApp();

  const setState = useMutation({
    mutationFn: (state: { action: DevicesActions; capabilityId: string; value: unknown }) =>
      request<{ success: boolean }>("post", `api/v1/capability/${state.capabilityId}`, {}, { action: state.action, value: state.value }),
  });

  return {
    setState,
  };
};

export default useCapabilities;
