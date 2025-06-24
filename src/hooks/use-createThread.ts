import { type createThreadDTO } from "@/schema/createThreadSchemas";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";

export function useCreateThread() {
  const {
    mutateAsync: mutateCreateThread,
    data: dataCreateThread,
    isPending,
  } = useMutation({
    mutationKey: ["createThread"],
    mutationFn: async (data: createThreadDTO) => {
      const formData = new FormData();
      formData.append("content", data.content);
      formData.append("img", data.img[0]); // file dari input file

      const res = await api.post("/create-thread", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
  });
  return { mutateCreateThread, dataCreateThread, isPending };
}
