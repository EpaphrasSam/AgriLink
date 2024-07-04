"use client";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
  Avatar,
} from "@nextui-org/react";
import { FormData } from "../pages/signup/Signup";
import { regions } from "@/lib/constants";
import { FaCamera } from "react-icons/fa";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Role } from "@prisma/client";
import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";

export type ModalFormData = {
  name: string;
  town: string;
  bio: string;
  about: string;
  region: string;
  image: string;
};

export const ModalSchema: ZodType<ModalFormData> = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  town: z.string().min(2, { message: "Town is too short" }),
  bio: z.string().min(10, { message: "Biography is too short" }),
  about: z.string().min(10, { message: "About is too short" }),
  region: z.string().nonempty({ message: "Region is required" }),
  image: z.string().min(1, {
    message: "Image is required",
  }),
});

type FarmerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  formData?: FormData;
  userId?: string;
};

const FarmerModal = ({
  isOpen,
  onClose,
  formData,
  userId,
}: FarmerModalProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ModalFormData>({
    resolver: zodResolver(ModalSchema),
  });

  const image = watch("image");

  const onSubmitModal = async (data: ModalFormData) => {
    setIsLoading(true);
    const userIdToUse = userId || session?.user?.id;
    const payload = {
      ...formData,
      ...data,
      role: Role.FARMER,
      userId: userIdToUse,
    };

    try {
      const response = await axios.post("/api/signup", payload);

      if (response.status === 200) {
        toast.success("Farmer profile created successfully");
        onClose();
        window.location.href = "/farmer-portal";
      } else {
        toast.error("Failed to create farmer profile");
      }
    } catch (error) {
      toast.error("Failed to create farmer profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (result: any) => {
    try {
      setValue("image", result.info.secure_url);
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Farmer Information
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(onSubmitModal)}
            className="flex flex-col gap-4"
          >
            <div className="mb-4 flex flex-col items-center">
              <div className="relative">
                <Avatar
                  src={image || ""}
                  alt="Profile"
                  className="mb-2 w-32 h-32 object-cover rounded-full"
                />
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onSuccess={handleUpload}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                  className="absolute bottom-0 right-0"
                >
                  <FaCamera className="text-xl cursor-pointer hover:opacity-75" />
                </CldUploadButton>
              </div>

              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <Input
              placeholder="Enter your name"
              label="Name"
              radius="sm"
              labelPlacement="outside"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />

            <Input
              type="text"
              placeholder="Enter your Bio"
              label="Bio"
              radius="sm"
              labelPlacement="outside"
              {...register("bio")}
              isInvalid={!!errors.bio}
              errorMessage={errors.bio?.message}
            />
            <Textarea
              placeholder="Enter about your farm"
              label="About"
              radius="sm"
              labelPlacement="outside"
              {...register("about")}
              isInvalid={!!errors.about}
              errorMessage={errors.about?.message}
            />
            <div className="flex gap-2">
              <Select
                radius="sm"
                fullWidth
                label="Region"
                labelPlacement="outside"
                placeholder="Select a Region"
                {...register("region")}
                isInvalid={!!errors.region}
                errorMessage={errors.region?.message}
              >
                {regions.map((region) => (
                  <SelectItem key={region}>{region}</SelectItem>
                ))}
              </Select>
              <Input
                placeholder="Enter your town"
                label="Town"
                radius="sm"
                labelPlacement="outside"
                {...register("town")}
                isInvalid={!!errors.town}
                errorMessage={errors.town?.message}
              />
            </div>

            <ModalFooter className="px-0">
              <Button
                color="danger"
                type="button"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button color="primary" type="submit" isLoading={isLoading}>
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FarmerModal;
