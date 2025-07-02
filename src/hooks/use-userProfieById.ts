import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useUserPofile = (id: string) => {
  return useQuery({
    queryKey: ["UserProfileById", id],
    queryFn: async () => {
      const res = await api.get(`/user-profile/${id}`);
      return res.data;
    },
  });
};
