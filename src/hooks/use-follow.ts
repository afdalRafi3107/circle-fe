import api from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { data } from "react-router-dom";

export const useFollow = () => {
  const { mutateAsync: mutateFollowing, data: dataFollowing } = useMutation({
    mutationKey: ["following"],
    mutationFn: async (followingId: number) => {
      const res = await api.post("/follow", { followingId });
      return res.data;
    },
  });

  return { mutateFollowing };
};
