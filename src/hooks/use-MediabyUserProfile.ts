import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useMediaByProfile = (id: string) => {
  return useQuery({
    queryKey: ["postByUser", id],
    queryFn: async () => {
      const res = await api.get(`/allpost-media-profile/${id}`);

      return res.data;
    },
  });
};
