import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

export function useDeleteThread() {
  const QueryClient = useQueryClient();

  const { mutateAsync: mutateDelete } = useMutation({
    mutationKey: ["deletethread"],
    mutationFn: async (id: number) => {
      console.log("id yang masuk : ", id);
      const res = await api.delete(`/delete-thread/${id}`);
      return res;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["thread"] });
      QueryClient.invalidateQueries({ queryKey: ["postByUser"] });
    },
  });
  return { mutateDelete };
}
