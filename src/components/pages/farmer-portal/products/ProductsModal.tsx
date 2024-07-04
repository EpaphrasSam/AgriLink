"use client";

import {
  Button,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { categories } from "@/lib/constants";
import { AiOutlinePlus } from "react-icons/ai";
import { ImBin2 } from "react-icons/im";
import { CldUploadButton } from "next-cloudinary";
import { useForm, Controller } from "react-hook-form";

interface ProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  product?: {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
  } | null;
  onSave: (product: {
    id?: string;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
  }) => void;
}

const ProductsModal = ({
  isOpen,
  onClose,
  isLoading,
  product,
  onSave,
}: ProductsModalProps) => {
  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      category: product?.category || "Fruits",
      description: product?.description || "",
      images: product?.images || [],
    },
  });

  const images = watch("images");

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        images: product.images || [],
      });
    } else {
      reset({
        name: "",
        price: 0,
        category: "Fruits",
        description: "",
        images: [],
      });
    }
  }, [product, reset]);

  const handleSave = (data: any) => {
    onSave({ id: product?.id, ...data });
  };

  const removeImage = async (index: number) => {
    const imageToRemove = images[index];
    try {
      setValue("images", [
        ...images.slice(0, index),
        ...images.slice(index + 1),
      ]);
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleUpload = (result: any) => {
    try {
      setValue("images", [...images, result.info.secure_url]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      radius="sm"
      size="3xl"
      onOpenChange={onClose}
      placement="center"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        <ModalHeader className="flex text-2xl font-bold flex-col gap-1 items-center justify-center">
          {product ? "Edit Product" : "Add Product"}
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(handleSave)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: "Product name is required" }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Product Name"
                  placeholder="Enter product name"
                  fullWidth
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                />
              )}
            />
            <div className="flex flex-row gap-2">
              <Controller
                name="price"
                control={control}
                rules={{ required: "Price is required", min: 0 }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="Price (GHS)"
                    type="number"
                    placeholder="Enter product price"
                    fullWidth
                    errorMessage={fieldState.error?.message}
                    isInvalid={fieldState.invalid}
                    value={field.value.toString()}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category"
                    placeholder="Select category"
                    selectedKeys={[field.value]}
                    fullWidth
                  >
                    {categories.map((cat) => (
                      <SelectItem value={cat} key={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  label="Description"
                  placeholder="Enter product description"
                  fullWidth
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                />
              )}
            />
            <Divider className="my-2" />
            <Controller
              name="images"
              control={control}
              rules={{
                validate: (value) =>
                  value.length > 0 || "At least one image is required",
              }}
              render={({ field, fieldState }) => (
                <>
                  <label htmlFor="images" className="text-lg">
                    Product Images
                  </label>
                  <div className="flex flex-wrap items-start gap-4 mt-4">
                    {field.value.map((image: string, index: number) => (
                      <div
                        key={index}
                        className="relative flex flex-col items-center"
                      >
                        <Image
                          src={image}
                          alt={`Product Image ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <Button
                          radius="sm"
                          color="danger"
                          variant="light"
                          isIconOnly
                          startContent={<ImBin2 />}
                          className="text-center"
                          onClick={() => removeImage(index)}
                        />
                      </div>
                    ))}
                    <CldUploadButton
                      onSuccess={handleUpload}
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
                      }
                      className="ml-4"
                    >
                      <div className="border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer flex items-center justify-center w-24 h-24">
                        <AiOutlinePlus size={24} />
                      </div>
                    </CldUploadButton>
                  </div>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
            <ModalFooter>
              <Button radius="sm" color="danger" onClick={onClose}>
                Cancel
              </Button>
              <Button
                radius="sm"
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                {product ? "Save Changes" : "Add Product"}
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductsModal;
