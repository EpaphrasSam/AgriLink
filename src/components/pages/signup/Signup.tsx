"use client";

import { z, ZodType } from "zod";
import { useMemo } from "react";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

import { passwordValidator } from "@/helpers/bcryptValidator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FarmerModal from "@/components/global/FarmerModal";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signupType, setSignupType] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  const onSubmit = async (data: FormData) => {
    // Check for errors
    if (Object.keys(errors).length === 0) {
      console.log("SUCCESS", data);
      // Open the modal if signing up as farmer
      if (signupType === "farmer") {
        setFormData(data);
        onOpen();
      } else {
        // Handle customer signup success
        console.log("Customer signup successful");
      }
    }
  };

  const handleFarmerSignup = () => {
    setSignupType("farmer");
  };

  const handleCustomerSignup = () => {
    setSignupType("customer");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div className="flex justify-evenly gap-4 mt-4">
            <Button
              color="primary"
              type="submit"
              fullWidth
              onClick={handleCustomerSignup}
            >
              Signup as Customer
            </Button>
            <Button
              color="primary"
              type="submit"
              fullWidth
              onClick={handleFarmerSignup}
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
      <FarmerModal isOpen={!isOpen} onClose={onClose} formData={formData!} />
    </div>
  );
};

export default Signup;
