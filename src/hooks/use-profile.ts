import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const UseProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/me");

      return res.data;
    },
  });
};
