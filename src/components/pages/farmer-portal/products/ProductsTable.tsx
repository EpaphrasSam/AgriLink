"use client";

import React, { useState, useMemo } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
} from "@nextui-org/react";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import ProductsModal from "./ProductsModal";
import { categories } from "@/lib/constants";

interface ProductsTableProps {
  products: {
    id: string;
    name: string;
    price: number;
    rating: number;
    category: string;
    description: string;
    images: string[];
  }[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filtered;
  }, [products, searchTerm, selectedCategory]);

  const pages = Math.ceil(filteredProducts.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredProducts.slice(start, end);
  }, [page, filteredProducts]);

  const isEmpty = filteredProducts.length === 0;

  const handleSaveProduct = (product: any) => {
    console.log("Saved product:", product);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          color="primary"
          radius="sm"
          startContent={<AiOutlinePlus size={24} />}
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <Card className="w-full my-6 overflow-x-auto">
        <CardHeader>
          <div className="w-full lg:flex-row flex-col items-center flex justify-between gap-4">
            <div className="flex overflow-x-auto space-x-4">
              {["All", ...categories].map((category) => (
                <button
                  key={category}
                  className={`text-blue-500 font-semibold underline underline-offset-4 transition ease-in-out duration-300 hover:text-blue-600 ${
                    selectedCategory === category
                      ? "text-blue-500 underline underline-offset-4"
                      : "text-gray-500 no-underline"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <Input
              className="max-w-sm"
              startContent={<CiSearch size={24} />}
              placeholder="Search for a product"
              variant="bordered"
              radius="full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="Products table"
            bottomContent={
              pages > 1 && (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              )
            }
            classNames={{
              table: isEmpty ? "min-h-[400px]" : "",
            }}
          >
            <TableHeader>
              <TableColumn key="name">Product</TableColumn>
              <TableColumn key="price">Price</TableColumn>
              <TableColumn key="rating">Rating</TableColumn>
              <TableColumn key="category">Category</TableColumn>
              <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>

            {isEmpty ? (
              <TableBody emptyContent={"No products available."}>
                {[]}
              </TableBody>
            ) : (
              <TableBody items={items} aria-colspan={3}>
                {(item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>GHS {item.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <AiFillStar size={20} color="#FFC107" />
                        {item.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip color="default">{item.category}</Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <span
                          className="text-blue-500 underline underline-offset-4 cursor-pointer hover:opacity-70 transition ease-in-out duration-300"
                          onClick={() => {
                            setSelectedProduct(item);
                            setIsModalOpen(true);
                          }}
                        >
                          Edit
                        </span>
                        <span className="text-red-500 underline underline-offset-4 cursor-pointer hover:opacity-70 transition ease-in-out duration-300">
                          Delete
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </CardBody>
      </Card>
      {isModalOpen && (
        <ProductsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onSave={handleSaveProduct}
        />
      )}
    </>
  );
};

export default ProductsTable;
