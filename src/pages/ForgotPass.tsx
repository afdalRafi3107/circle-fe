import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export function ForgotPasspage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-3 m-auto w-md mt-40 align-text-bottom text-left">
        <p className="font-bold text-4xl text-green-600">CIRCLE</p>
        <p className="text-white text-3xl font-bold">Forgot Password</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit((data) => {
            alert(data);
            Navigate("/resetpassword");
          })}
        >
          <Input
            className="h-12 bg-white"
            {...register("email", {
              required: "email di perlukan",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "email salah",
              },
            })}
            placeholder="Email"
            type="email"
          />
          {errors.email && <p className="text-red-500">Masukkan Email !!</p>}

          <Button
            className="h-10 text-2xl bg-green-600 hover:bg-green-500"
            type="submit"
          >
            Send Instructions
          </Button>
        </form>
        <p className="text-white">
          Don't have an account yet?{" "}
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
