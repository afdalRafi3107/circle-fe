import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginScemas, type LoginScemaType } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { login } from "@/api/axios";
import api from "@/api/axios";
import { useAuth } from "./AuthContext/AuthContext";
import { useLogin } from "@/hooks/use-login";

export function LoginPage() {
  const Navigate = useNavigate();
  const { logIn, isAuth } = useAuth();
  const { mutateLogin, isPending } = useLogin();
  if (isAuth) {
    Navigate("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginScemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginScemas),
  });

  const onSubmit = async (data: LoginScemaType) => {
    await mutateLogin(data);
    logIn();
    Navigate("/");
  };

  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-10 mx-auto mt-20 w-full max-w-md sm:mt-32">
        <p className="font-bold text-4xl text-green-600">CIRCLE</p>
        <p className="text-white text-3xl font-bold">Login To Circle</p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="h-12 bg-white"
            {...register("email")}
            placeholder="Username"
            type="email"
          />

          <Input
            className="h-12 bg-white"
            {...register("password")}
            placeholder="Password"
            type="password"
          />

          <NavLink
            className="text-right text-white text-md hover:text-green-600"
            to={"/forgotpassword"}
          >
            Forgot Password?
          </NavLink>
          <Button
            className="h-10 text-2xl text-white bg-green-600 hover:bg-green-500"
            type="submit"
          >
            Login
          </Button>
        </form>
        <p className="text-white">
          Don't have an account yet?{" "}
          <NavLink
            to={"/register"}
            className="font-semibold text-green-600 hover:text-green-500"
          >
            register
          </NavLink>
        </p>
      </div>
    </>
  );
}
