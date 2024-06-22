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
    path: ["confirmPassword"], // path of error
  });

export default function Signup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRegion, setSelectedRegion] = useState(
    new Set(["Select Region"])
  );

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

  const regions = [
    "Greater Accra Region",
    "Ashanti Region",
    "Central Region",
    "Oti Region",
    "Eastern Region",
    "Brong Ahafo Region",
    "Northern Region",
    "Upper East Region",
    "Upper West Region",
    "Western Region",
    "Savannah Region",
    "Bono East Region",
    "Ahafo Region",
    "North East Region",
    "Western North Region",
    "Volta Region",
  ];

  const selectedValue = useMemo(
    () => Array.from(selectedRegion).join(", ").replaceAll("_", " "),
    [selectedRegion]
  );
  const handleSelectionChange = (keys: any) => {
    setSelectedRegion(new Set(keys));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
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
            <label className="block text-gray-700">Email</label>
            <Input
              type="text"
              placeholder="Enter your email"
              // className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="Confirm your password"
              {...register("password")}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
              onPress={onOpen}
            >
              Signup as Farmer
            </Button>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
            >
              Signup as Customer
            </Button>
          </div>
          <div className="text-center">
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Farmer Additional Information
          </ModalHeader>
          <ModalBody>
            <div>
              <label className="block text-gray-700">Town</label>
              <Input type="text" placeholder="Enter your town" />
            </div>
            <div>
              <Select label="Select a Region" className="max-w-xs">
                {regions.map((region) => (
                  <SelectItem key={region}>{region}</SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-gray-700">Image</label>
              <Input type="file" accept="image/*" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
