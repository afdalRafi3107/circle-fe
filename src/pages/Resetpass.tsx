import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export function ResetPasswordpage() {
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <>
      <div className="flex flex-col gap-3 m-auto w-md mt-50 align-text-bottom text-left">
        <p className="font-bold text-4xl text-green-600">CIRCLE</p>
        <p className="text-white text-3xl font-bold">Reset Password</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit((data) => {
            alert(data);
            Navigate("/login");
          })}
        >
          <Input
            className="h-12 bg-white"
            {...register("password", {
              required: "Harap masukkan password",
              minLength: {
                value: 6,
                message: "password harus leboh dari 6 karakter",
              },
            })}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500">Masukkan Password Baru</p>
          )}

          <Input
            className="h-12 bg-white"
            {...register("confirmPassword", {
              required: "Ulagi password",
              minLength: {
                value: 6,
                message: "password harus leboh dari 6 karakter",
              },
            })}
            placeholder="Confirm Password"
            type="password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">Ulangi Masukkan Password baru</p>
          )}
          <Button
            className="h-10 text-2xl bg-green-600 hover:bg-green-500"
            type="submit"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </>
  );
}
