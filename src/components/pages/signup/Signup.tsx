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

export type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type ModalFormData = {
  town: string;
  biography: string;
  about: string;
  region: string;
  image: FileList;
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

export const ModalSchema: ZodType<ModalFormData> = z.object({
  town: z.string().min(2, { message: "Town is too short" }),
  biography: z.string().min(10, { message: "Biography is too short" }),
  about: z.string().min(10, { message: "About is too short" }),
  region: z.string().nonempty({ message: "Region is required" }),
  image: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Image is required",
  }),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRegion, setSelectedRegion] = useState(
    new Set(["Select Region"])
  );
  const [signupType, setSignupType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  console.log(errors);

  const {
    register: registerModal,
    handleSubmit: handleSubmitModal,
    formState: { errors: modalErrors },
  } = useForm<ModalFormData>({
    resolver: zodResolver(ModalSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Check for errors
    if (Object.keys(errors).length === 0) {
      console.log("SUCCESS", data);
      // Open the modal if signing up as farmer
      if (signupType === "farmer") {
        onOpen();
      } else {
        // Handle customer signup success
        console.log("Customer signup successful");
      }
    }
  };

  const onSubmitModal = async (data: ModalFormData) => {
    console.log("MODAL SUCCESS", data);
    onClose();
  };

  const handleFarmerSignup = () => {
    setSignupType("farmer");
    handleSubmit(onSubmit)();
  };
  const handleCustomerSignup = () => {
    setSignupType("customer");
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
          <div className="flex gap-4">
            <Button
              type="button"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
              onPress={handleFarmerSignup}
            >
              Signup as Farmer
            </Button>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
              onPress={handleCustomerSignup}
            >
              Signup as Customer
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Farmer Additional Information
          </ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <form onSubmit={handleSubmitModal(onSubmitModal)}>
              <div>
                <Input
                  type="text"
                  placeholder="Enter your town"
                  label="Town"
                  radius="sm"
                  labelPlacement="outside"
                  {...registerModal("town")}
                  isInvalid={!!modalErrors.town}
                  errorMessage={modalErrors.town?.message}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Enter your Biography"
                  label="Biography"
                  radius="sm"
                  labelPlacement="outside"
                  {...registerModal("biography")}
                  isInvalid={!!modalErrors.biography}
                  errorMessage={modalErrors.biography?.message}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Enter about your farm"
                  label="About"
                  radius="sm"
                  labelPlacement="outside"
                  {...registerModal("about")}
                  isInvalid={!!modalErrors.about}
                  errorMessage={modalErrors.about?.message}
                />
              </div>
              <div>
                <Select
                  radius="sm"
                  label="Select a Region"
                  className="max-w-xs"
                  onChange={handleSelectionChange}
                  isInvalid={!!modalErrors.region}
                  errorMessage={modalErrors.region?.message}
                >
                  {regions.map((region) => (
                    <SelectItem key={region}>{region}</SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  label="Upload your farm image"
                  radius="sm"
                  labelPlacement="outside"
                  {...registerModal("image")}
                  isInvalid={!!modalErrors.image}
                  errorMessage={modalErrors.image?.message}
                />
              </div>

              <ModalFooter>
                <Button
                  color="danger"
                  type="button"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Signup;
