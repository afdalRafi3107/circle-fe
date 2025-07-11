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
      console.log("data Edit Profile : ", data);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("username", data.username);
      formData.append("bio", data.bio || "");
      if (data.photoProfile instanceof File) {
        formData.append("photoProfile", data.photoProfile);
      } else if (data.photoProfile === null) {
        formData.append("photoProfile", ""); // tanda hapus
      }
      if (data.banner instanceof File) {
        formData.append("banner", data.banner);
      } else if (data.banner === null) {
        formData.append("banner", ""); // tanda hapus
      }

      const res = await api.post("/edit-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
  return { mutateEditProfile, dataEditProfile, isPending };
}
