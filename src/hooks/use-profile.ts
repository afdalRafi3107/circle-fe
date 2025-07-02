import api from "@/api/axios";
import type { LoginScemaType } from "@/schema/loginSchema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const UseProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/me");

      return res.data;
    },
  });
};
