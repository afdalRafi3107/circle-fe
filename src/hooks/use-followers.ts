import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export function useFollowres() {
  return useQuery({
    queryKey: ["Followers"],
    queryFn: async () => {
      const res = await api.get("/followers");
      return res.data;
    },
  });
}
