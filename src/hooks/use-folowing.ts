import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useFollowing = () => {
  return useQuery({
    queryKey: ["follwoing"],
    queryFn: async () => {
      const res = await api.get("/following");
      return res.data;
    },
  });
};
