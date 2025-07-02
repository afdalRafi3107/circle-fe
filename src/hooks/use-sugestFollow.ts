import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useSugestFollow = (datass: string) => {
  return useQuery({
    queryKey: ["sugestFollow"],
    queryFn: async () => {
      console.log("sugset k : ", datass);
      const res = await api.get("/sugest-follow");

      console.log("sugset gagal : ", datass);
      return res.data;
    },
  });
};
