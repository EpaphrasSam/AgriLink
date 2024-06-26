"use client";

import { Input, Button } from "@nextui-org/react";
import { z, ZodType } from "zod";

import { passwordValidator } from "@/helpers/bcryptValidator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export type FormData = {
  email: string;
  username: string;

  password: string;
  confirmPassword: string;
};

export const UserSchema: ZodType<FormData> = z.object({
  email: z.string().email(),

  username: z.string().min(3, { message: "Username is too short" }).max(20),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
  confirmPassword: z.string(),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  console.log(errors);

  const onSubmit = async (data: FormData) => {
    console.log("SUCCESS", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
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
          </div>
          <div>
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
            <a href="#" className="text-red-600 hover:opacity-75 text-xs">
              Forgot your password?
            </a>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
            >
              Login
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
