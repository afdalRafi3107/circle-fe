import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const usePostByUser = () => {
  return useQuery({
    queryKey: ["postByUser"],
    queryFn: async () => {
      const res = await api.get("/allpost-user");

      return res.data;
    },
  });
};
