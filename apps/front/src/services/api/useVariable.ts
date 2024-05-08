import type { VariableAttributes, VariableCreationAttributes } from "@friday-ai/shared";
import { useMutation } from "@tanstack/react-query";

import useApp from "../app/useApp";

const useVariable = () => {
  const { request } = useApp();
  const createVariable = useMutation({
    mutationFn: (variable: VariableCreationAttributes) => request<VariableAttributes>("post", "/api/v1/variable", {}, variable),
  });

  const updateVariable = useMutation({
    mutationFn: ({ id, variable }: { id: string; variable: Partial<VariableAttributes> }) =>
      request<VariableAttributes>("patch", `/api/v1/variable/${id}`, {}, variable),
  });

  const deleteVariable = useMutation({ mutationFn: (id: string) => request<boolean>("delete", "/api/v1/variable/:id", { id }) });

  return {
    createVariable,
    updateVariable,
    deleteVariable,
  };
};

export default useVariable;
