import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { useQueryClient } from "@tanstack/react-query";

export function useLikeReply() {
  const QueryClient = useQueryClient();
  const { mutateAsync: mutateLikeReply } = useMutation({
    mutationKey: ["LikeReply"],
    mutationFn: async (id: number) => {
      const res = await api.post(`/like-reply/${id}`);
      return res;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["reply"] });
      QueryClient.invalidateQueries({ queryKey: ["LikeReplyStatus"] });
    },
  });
  return { mutateLikeReply };
}
