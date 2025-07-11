import { type createThreadDTO } from "@/schema/createThreadSchemas";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateThread() {
  const QueryClient = useQueryClient();
  const {
    mutateAsync: mutateCreateThread,
    data: dataCreateThread,
    isPending,
  } = useMutation({
    mutationKey: ["createThread"],
    mutationFn: async (data: createThreadDTO) => {
      const formData = new FormData();
      formData.append("content", data.content);
      if (data.img instanceof File) {
        formData.append("image", data.img);
      }
      console.log("data create thread :", data);

      const res = await api.post("/create-thread", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["thread"] });
    },
  });
  return { mutateCreateThread, dataCreateThread, isPending };
}
