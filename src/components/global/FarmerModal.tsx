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

export type ModalFormData = {
  town: string;
  biography: string;
  about: string;
  region: string;
  image: string;
};

export const ModalSchema: ZodType<ModalFormData> = z.object({
  town: z.string().min(2, { message: "Town is too short" }),
  biography: z.string().min(10, { message: "Biography is too short" }),
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
};

const FarmerModal = ({ isOpen, onClose, formData }: FarmerModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ModalFormData>({
    resolver: zodResolver(ModalSchema),
  });

  const image = watch("image");

  const onSubmitModal = async (data: ModalFormData) => {
    console.log("MODAL SUCCESS", { ...formData, ...data });
    onClose();
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
                <label
                  htmlFor="profilePictureUpload"
                  className="absolute bottom-0 right-0"
                >
                  <FaCamera className="text-xl cursor-pointer hover:opacity-75" />
                </label>
                <input
                  id="profilePictureUpload"
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="hidden"
                />
              </div>
            </div>

            <Input
              type="text"
              placeholder="Enter your Biography"
              label="Biography"
              radius="sm"
              labelPlacement="outside"
              {...register("biography")}
              isInvalid={!!errors.biography}
              errorMessage={errors.biography?.message}
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
              <Button color="primary" type="submit">
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
