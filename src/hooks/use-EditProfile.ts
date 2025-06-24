import { type editProfileDTO } from "@/schema/editProfileSchemas";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { useQueryClient } from "@tanstack/react-query";

export function useEdtProfile() {
  const QueryClient = useQueryClient();
  const {
    mutateAsync: mutateEditProfile,
    data: dataEditProfile,
    isPending,
  } = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: async (data: editProfileDTO) => {
      const res = await api.post("/edit-profile", data);
      return res.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["profile"] });
      
    },
  });
  return { mutateEditProfile, dataEditProfile, isPending };
}
