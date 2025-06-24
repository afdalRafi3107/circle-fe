import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetReplay = (id: string) => {
  return useQuery({
    queryKey: ["reply", id],
    queryFn: async () => {
      const res = await api.get(`/all-reply/${id}`);
      return res.data;
    },
  });
};
