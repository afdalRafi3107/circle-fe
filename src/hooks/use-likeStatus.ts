import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export function useLikeStatus(likeStatus: number) {
  return useQuery({
    queryKey: ["likestatus", likeStatus],
    queryFn: async () => {
      const res = await api.get(`/like-status/${likeStatus}`);
      return res.data;
    },
  });
}
