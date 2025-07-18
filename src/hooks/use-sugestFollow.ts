import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useSugestFollow = () => {
  return useQuery({
    queryKey: ["sugestFollow"],
    queryFn: async () => {
      const res = await api.get("/sugest-follow");

      return res.data;
    },
  });
};
