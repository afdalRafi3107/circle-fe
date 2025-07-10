import api from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
export const useFollow = () => {
  const { mutateAsync: mutateFollowing } = useMutation({
    mutationKey: ["following"],
    mutationFn: async (followingId: number) => {
      const res = await api.post("/follow", { followingId });
      return res.data;
    },
  });

  return { mutateFollowing };
};
