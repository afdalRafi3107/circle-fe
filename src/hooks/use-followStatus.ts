import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export function useFollowStatus(followingId: number) {
  console.log("id follow  status:", followingId);
  return useQuery({
    queryKey: ["followStatus", followingId],
    queryFn: async () => {
      const res = await api.get(`/status-follow/${followingId}`);
      return res.data;
    },
  });
}
