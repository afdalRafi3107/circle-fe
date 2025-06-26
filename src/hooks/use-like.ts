    import { useMutation, useQueryClient } from "@tanstack/react-query";
    import api from "@/api/axios";

    const toggleLikeThread = async (postId: number) => {
    const res = await api.post(`/all-reply/like/${postId}`);
    return res.data; // { liked: true/false }
    };

    export const useToggleLikeThread = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: number) => toggleLikeThread(postId),
        onSuccess: (_data, postId) => {
        // ✅ invalidate data thread biar refetch jika perlu
        queryClient.invalidateQueries({
            queryKey: ["detailThread", String(postId)],
        });
        },
    });
    };
