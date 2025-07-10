import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const useSearch = (keyword: string) => {
  console.log("keyword : ", keyword);

  return useQuery({
    queryKey: ["search", keyword],
    queryFn: async () => {
      const res = await api.get(`/search?q=${keyword}`);
      return res.data;
    },
  });
};
