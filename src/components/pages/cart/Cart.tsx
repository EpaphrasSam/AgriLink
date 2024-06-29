"use client";

import React from "react";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { MdAddCircle, MdRemoveCircle, MdDelete } from "react-icons/md";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";

const Cart = () => {
  const cart = useStore(useCartStore, (state) => state.cart);
  const {
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    calculateSubtotal,
    calculateTotal,
  } = useCartStore((state) => ({
    removeProduct: state.removeProduct,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
    calculateSubtotal: state.calculateSubtotal,
    calculateTotal: state.calculateTotal,
  }));

  if (!cart) return null;

  return (
    <>
      {Object.keys(cart).length === 0 ? (
        <div className="h-screen flex justify-center items-center">
          <div className="flex items-center justify-center flex-col gap-y-6">
            <div className="text-xl text-gray-600 tracking-wider font-semibold">
              YOUR CART IS EMPTY
            </div>
            <Link href="/products">
              <Button
                color="primary"
                radius="none"
                size="lg"
                className="w-[200px]"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl text-gray-600 font-bold">Your Cart</h1>
            <Link
              href="/products"
              className="text-blue-500 hover:text-blue-600 hover:underline underline-offset-8"
            >
              Continue Shopping
            </Link>
          </header>
          <Divider className="my-4" />
          {Object.entries(cart).map(([farmer, products]) => (
            <>
              <div key={farmer} className="mb-8">
                <h2 className="text-lg text-gray-600 font-semibold mb-2">
                  {farmer}
                </h2>
                <div className="flex overflow-x-auto space-x-4 pb-4">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      radius="none"
                      className="w-64 h-72 flex-shrink-0 m-4 rounded-lg"
                    >
                      <CardBody className="p-0">
                        <Link href={`/products/${product.id}`}>
                          <Image
                            src={product.image}
                            alt={product.title}
                            className="w-64 h-32 object-cover mb-2"
                            radius="none"
                            isZoomed
                          />
                        </Link>
                      </CardBody>
                      <CardFooter className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">
                          {product.title}
                        </h3>
                        <p className="text-gray-600">
                          GHS {(product.price * product.quantity).toFixed(2)}
                        </p>
                        <div className="flex justify-center border border-gray-200 p-2 rounded-full items-center mt-2 space-x-2">
                          <MdRemoveCircle
                            size={30}
                            onClick={() => decreaseQuantity(product.id, farmer)}
                            className="text-red-500 text-2xl hover:text-red-600 cursor-pointer"
                          />
                          <span className="text-gray-700">
                            {product.quantity}
                          </span>
                          <MdAddCircle
                            size={30}
                            onClick={() => increaseQuantity(product.id, farmer)}
                            className="text-green-500 text-2xl hover:text-green-600 cursor-pointer"
                          />
                          <Divider orientation="vertical" />
                          <MdDelete
                            size={30}
                            onClick={() => removeProduct(product.id, farmer)}
                            className="text-red-500 text-2xl hover:text-red-700 cursor-pointer"
                          />
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <p className="text-right text-gray-500 font-semibold mt-2">
                  Subtotal: GHS {calculateSubtotal(farmer)}
                </p>
                <Divider className="my-4" />
              </div>
            </>
          ))}
          <div className="flex flex-col gap-4 w-full justify-end items-end mt-8">
            <h2 className="text-xl text-gray-600 font-bold mr-4">
              Total: GHS {calculateTotal()}
            </h2>
            <Link href="/checkout">
              <Button
                size="lg"
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
