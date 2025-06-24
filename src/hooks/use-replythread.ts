import api from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import type { replyScemasDTO } from "@/schema/replySchema";

export function useReply(id: string) {
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
  });
  return { mutateReply, dataReply, isPending };
}
