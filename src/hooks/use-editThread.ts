import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { type editThreadSchmeasDTO } from "@/schema/editThreadSchemas";

export function useEditThread(id: number) {
  return useMutation({
    mutationKey: ["editThread"],
    mutationFn: async (data: editThreadSchmeasDTO) => {
      const formData = new FormData();
      formData.append("content", data.content);
      if (data.img) {
        formData.append("img", data.img);
      }
      if (data.removeImg) {
        formData.append("removeImg", "true");
      }
      const res = await api.patch(`/edit-thread/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
  });
}
