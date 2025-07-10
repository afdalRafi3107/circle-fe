import api from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import type { replyScemasDTO } from "@/schema/replySchema";
import { useQueryClient } from "@tanstack/react-query";

export function useReply(id: string) {
  const QueryClient = useQueryClient();
  const {
    mutateAsync: mutateReply,
    data: dataReply,
    isPending,
  } = useMutation({
    mutationKey: ["reply", id],
    mutationFn: async (data: replyScemasDTO) => {
      const res = await api.post(`/detail-thread/reply/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["reply"] });
      QueryClient.invalidateQueries({ queryKey: ["detailThread"] });
    },
  });
  return { mutateReply, dataReply, isPending };
}
