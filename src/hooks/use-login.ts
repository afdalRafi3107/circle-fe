import { type LoginScemaType } from "@/schema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
export function useLogin() {
  const {
    mutateAsync: mutateLogin,
    data: dataLogin,
    isPending,
  } = useMutation({
    mutationKey: ["logIn"],
    mutationFn: async (data: LoginScemaType) => {
      const res = await api.post("/login", data);
      Cookies.set("token", res.data.token);
      return res.data;
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  return { mutateLogin, dataLogin, isPending };
}
