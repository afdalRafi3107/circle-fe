import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteReply = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteReply"],
    mutationFn: async (id: number) => {
      const res = await api.delete(`/delete-reply/${id}`);
      return res;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["detailThread"] });
    },
  });
};
