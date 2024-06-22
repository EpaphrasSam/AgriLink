"use client";

import { Input, Button } from "@nextui-org/react";
import { z, ZodType } from "zod";

import { passwordValidator } from "@/helpers/bcryptValidator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function Login() {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              // className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("username")}
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              // className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
            >
              Login
            </Button>
          </div>
          <div className="text-center">
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
