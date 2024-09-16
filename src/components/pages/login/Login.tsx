"use client";

import { Input, Button } from "@nextui-org/react";
import { z, ZodType } from "zod";

import { passwordValidator } from "@/helpers/bcryptValidator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Role } from "@prisma/client";
import { loginAction } from "@/services/authService";
import toast from "react-hot-toast";

export type FormData = {
  username: string;
  password: string;
};

export const UserSchema: ZodType<FormData> = z.object({
  username: z.string().min(3, { message: "Username is too short" }).max(20),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<Role>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const result = await loginAction(data.username, data.password, loginType!);
    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
    } else {
      window.location.href = "/";
      toast.success("Login successful");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white-100 p-4">
      <div className="w-full max-w-md bg-white sm:p-8 p-2 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            labelPlacement="outside"
            radius="sm"
            {...register("username")}
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message}
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            labelPlacement="outside"
            radius="sm"
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            endContent={
              showPassword ? (
                <FaRegEyeSlash
                  className="cursor-pointer hover:opacity-75"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaRegEye
                  className="cursor-pointer hover:opacity-75"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />
          <Link href="#" className="text-red-600 hover:opacity-75 text-xs">
            Forgot your password?
          </Link>
          <div className="flex sm:flex-row flex-col justify-evenly gap-4 mt-4">
            <Button
              color="primary"
              type="submit"
              fullWidth
              onClick={() => setLoginType("CONSUMER")}
              isLoading={loginType === "CONSUMER" && isLoading}
            >
              Login as Consumer
            </Button>
            <Button
              color="primary"
              type="submit"
              fullWidth
              onClick={() => setLoginType("FARMER")}
              isLoading={loginType === "FARMER" && isLoading}
            >
              Login as Farmer
            </Button>
          </div>
          <div className="flex gap-1 justify-center">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="text-indigo-600 hover:text-indigo-800 hover:underline underline-offset-4"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
