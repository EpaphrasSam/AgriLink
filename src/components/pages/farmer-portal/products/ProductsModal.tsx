"use client";

import { categories } from "@/lib/constants";
import {
  Button,
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
import React, { useState, useEffect } from "react";

interface ProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
  } | null;
  onSave: (product: {
    id?: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
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
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setDescription(product.description);
      setImage(product.image);
    } else {
      setName("");
      setPrice(0);
      setCategory("Fruits");
      setDescription("");
      setImage("");
    }
  }, [product]);

  const handleSave = () => {
    onSave({ id: product?.id, name, price, category, description, image });
    onClose();
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      radius="sm"
      size="xl"
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
              label="Price"
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
              onChange={(value: any) => setCategory(value)}
              fullWidth
            >
              {categories.map((cat: string) => (
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
          <Input
            label="Image URL"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
          />
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
