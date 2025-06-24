import { type RegisterScemnasDTO } from "@/schema/registerScemas";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";

export function useRegister() {
  const {
    mutateAsync: mutateRegister,
    data: dataRegister,
    isPending,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterScemnasDTO) => {
      const res = await api.post("/register", data);
      return res.data;
    },
  });
  return { mutateRegister, dataRegister, isPending };
}
