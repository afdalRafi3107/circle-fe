import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useDetailThread = (id: string) => {
  return useQuery({
    queryKey: ["detailThread", id],
    queryFn: async () => {
      const res = await api.get(`/detail-thread/${id}`);
      return res.data; // Kembalikan data
    },
    enabled: !!id, // Jangan jalankan query jika id belum ada
  });
};

//reply thread
