import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const usePostByUserProfile = (id: string) => {
  return useQuery({
    queryKey: ["getAnotherUserPost", id],
    queryFn: async () => {
      const res = await api.get(`/allpost-user-profile/${id}`);
      return res.data;
    },
  });
};
