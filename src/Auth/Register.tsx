import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import {
  RegisterScemas,
  type RegisterScemnasDTO,
} from "@/schema/registerScemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/use-register";
import Swal from "sweetalert2";

export function Registerpage() {
  const { mutateRegister, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterScemnasDTO>({
    mode: "onChange",
    resolver: zodResolver(RegisterScemas),
  });

  const Navigate = useNavigate();

  const onSubmit = async (data: RegisterScemnasDTO) => {
    await mutateRegister(data);
    Swal.fire({
      icon: "success",
      title: "Yay...",
      text: "successfully created an account",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-10 mx-auto mt-20 w-full max-w-md sm:mt-32">
        <p className="font-bold text-4xl text-green-600">CIRCLE</p>
        <p className="text-white text-3xl font-bold">Create Acccount Circle</p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="h-12 bg-white"
            {...register("username")}
            placeholder="Username"
            type="text"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <Input
            className="h-12 bg-white"
            {...register("email")}
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <Input
            className="h-12 bg-white"
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <Button
            className="h-10 text-2xl text-white bg-green-600 hover:bg-green-500"
            type="submit"
          >
            Register
          </Button>
        </form>
        <p className="text-white">
          Already have an account?{" "}
          <NavLink
            to={"/login"}
            className="text-green-600 font-semibold hover:text-green-500"
          >
            Login
          </NavLink>
        </p>
      </div>
    </>
  );
}
