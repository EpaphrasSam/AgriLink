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
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { categories } from "@/lib/constants";
import { AiOutlinePlus } from "react-icons/ai";
import { ImBin2 } from "react-icons/im";

interface ProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  product,
  onSave,
}: ProductsModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Fruits");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setDescription(product.description);
      setImages(product.images || []);
    } else {
      setName("");
      setPrice(0);
      setCategory("Fruits");
      setDescription("");
      setImages([]);
    }
  }, [product]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  const handleSave = () => {
    onSave({ id: product?.id, name, price, category, description, images });
    onClose();
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
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
          <Input
            label="Product Name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <div className="flex flex-row gap-2">
            <Input
              label="Price (GHS)"
              type="number"
              placeholder="Enter product price"
              value={price.toString()}
              onChange={(e) => setPrice(Number(e.target.value))}
              fullWidth
            />
            <Select
              label="Category"
              placeholder="Select category"
              value={category}
              selectedKeys={[category]}
              onSelectionChange={(value: any) => setCategory(value.currentKey)}
              fullWidth
            >
              {categories.map((cat) => (
                <SelectItem value={cat} key={cat}>
                  {cat}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Textarea
            label="Description"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <Divider className="my-2" />
          <label htmlFor="images" className="text-lg">
            Product Images (Add at most 3 images)
          </label>
          <div className="flex flex-wrap gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative flex flex-col items-center">
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
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer flex items-center justify-center w-24 h-24"
            >
              <input {...getInputProps()} />
              <AiOutlinePlus size={24} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button radius="sm" color="danger" onClick={onClose}>
            Cancel
          </Button>
          <Button radius="sm" color="primary" onClick={handleSave}>
            {product ? "Save Changes" : "Add Product"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductsModal;
