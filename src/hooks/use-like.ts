import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { useQueryClient } from "@tanstack/react-query";

// const toggleLikeThread = async (postId: number) => {
// const res = await api.post(`/all-reply/like/${postId}`);
// return res.data; // { liked: true/false }
// };

// export const useToggleLikeThread = () => {
// const queryClient = useQueryClient();

// return useMutation({
//     mutationFn: (postId: number) => toggleLikeThread(postId),
//     onSuccess: (_data, postId) => {
//     // ✅ invalidate data thread biar refetch jika perlu
//     queryClient.invalidateQueries({
//         queryKey: ["detailThread", String(postId)],
//     });
//     },
// });
// };

export const useLike = () => {
  const QueryClient = useQueryClient();
  const { mutateAsync: muatateLike, data: dataLike } = useMutation({
    mutationKey: ["like"],
    mutationFn: async (id: number) => {
      const res = await api.post(`/like/${id}`);
      //di sini;
      return res;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["thread"] });
      QueryClient.invalidateQueries({ queryKey: ["likestatus"] });
      QueryClient.invalidateQueries({ queryKey: ["detailThread"] });
      QueryClient.invalidateQueries({ queryKey: ["getAnotherUserPost"] });
      QueryClient.invalidateQueries({ queryKey: ["postByUser"] });
    },
  });
  return { muatateLike };
};
