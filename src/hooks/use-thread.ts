import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const UseThread = () => {
  return useQuery({
    queryKey: ["thread"],
    queryFn: async () => {
      const res = await api.get("/thread");

      return res.data;
    },
  });
};
