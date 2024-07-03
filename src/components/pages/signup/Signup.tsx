"use client";

import { z, ZodType } from "zod";
import { Input, Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FarmerModal from "@/components/global/FarmerModal";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import toast from "react-hot-toast";

export type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export const UserSchema: ZodType<FormData> = z
  .object({
    email: z.string().email(),
    username: z.string().min(3, { message: "Username is too short" }).max(20),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signupType, setSignupType] = useState<Role>();
  const [formData, setFormData] = useState<FormData | null>(null);
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
    if (signupType === "FARMER") {
      setFormData(data);
      onOpen();
    } else {
      try {
        const response = await axios.post("/api/signup", {
          ...data,
          role: Role.CONSUMER,
        });
        if (response.status === 200) {
          toast.success("Consumer signup successful");
        } else {
          toast.error("Consumer signup failed");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { error: errorMessage } = error.response.data;
          if (errorMessage === "Username already exists") {
            setError("username", { message: errorMessage });
          } else if (errorMessage === "Email already exists") {
            setError("email", { message: errorMessage });
          } else {
            toast.error("Consumer signup failed");
          }
        } else {
          toast.error("Consumer signup failed");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter your username"
            label="Username"
            radius="sm"
            labelPlacement="outside"
            {...register("username")}
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message}
          />
          <Input
            type="text"
            placeholder="Enter your email"
            label="Email"
            radius="sm"
            labelPlacement="outside"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            label="Password"
            radius="sm"
            labelPlacement="outside"
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
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            label="Confirm Password"
            radius="sm"
            labelPlacement="outside"
            {...register("confirmPassword")}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            endContent={
              showConfirmPassword ? (
                <FaRegEyeSlash
                  className="cursor-pointer hover:opacity-75"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <FaRegEye
                  className="cursor-pointer hover:opacity-75"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )
            }
          />
          <div className="flex justify-evenly gap-4 mt-4">
            <Button
              color="primary"
              type="submit"
              fullWidth
              isLoading={signupType === "CONSUMER" && isLoading}
              onClick={() => setSignupType("CONSUMER")}
            >
              Signup as Consumer
            </Button>
            <Button
              color="primary"
              type="submit"
              fullWidth
              isLoading={signupType === "FARMER" && isLoading}
              onClick={() => setSignupType("FARMER")}
            >
              Signup as Farmer
            </Button>
          </div>

          <div className="flex gap-1 justify-center">
            Already have an account?
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 hover:underline underline-offset-4"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
      <FarmerModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData!}
        userId={session?.user?.id}
      />
    </div>
  );
};

export default Signup;
