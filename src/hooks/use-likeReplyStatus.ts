import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const useLikeReplyStatus = (id: number) => {
  return useQuery({
    queryKey: ["LikeReplyStatus", id],
    queryFn: async () => {
      const res = await api.get(`/like-reply-status/${id}`);
      return res.data;
    },
  });
};
