import type { SessionAttributes } from "@friday-ai/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useApp from "../app/useApp";

export const useSession = () => {
  const { request } = useApp();
  const queryClient = useQueryClient();

  const revokeSession = useMutation({
    mutationFn: (id: string) => request<SessionAttributes>("patch", `/api/v1/session/revoke/${id}`),
    onSuccess: (session) => {
      queryClient.setQueryData(["getSessions"], (prevSessions: SessionAttributes[]) => prevSessions.filter((s) => s.id !== session.id));
    },
  });

  return { revokeSession };
};

export const useGetSessions = () => {
  const { request } = useApp();
  return useQuery({
    queryKey: ["getSessions"],
    queryFn: () => request<SessionAttributes[]>("get", "/api/v1/session", { order: [["CREATEDAT", "DESC"]] }),
  });
};

export default useSession;
