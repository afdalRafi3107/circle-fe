import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useMediaByUser = () => {
  return useQuery({
    queryKey: ["postByUser"],
    queryFn: async () => {
      const res = await api.get("/allpost-media");

      return res.data;
    },
  });
};
