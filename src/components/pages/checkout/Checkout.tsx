"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import useCartStore from "@/store/useCartStore";
import { Button, Divider, Image, Input, Spinner } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { ProductWithReviews } from "@/types/ProductTypes";
import { useSearchParams } from "next/navigation";

type FormFields = {
  fullName: string;
  phoneNumber: string;
  deliveryAddress: string;
};

type Cart = {
  [key: string]: (ProductWithReviews & { quantity: number })[];
};

const Checkout = () => {
  const searchParams = useSearchParams();
  const cart = useStore(useCartStore, (state) => state.cart);
  const { calculateSubtotal, calculateTotal, clearCart } = useCartStore(
    (state) => ({
      calculateSubtotal: state.calculateSubtotal,
      calculateTotal: state.calculateTotal,
      clearCart: state.clearCart,
    })
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      deliveryAddress: "",
    },
  });

  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (trxref && reference && cart) {
      toast.loading("Verifying payment and creating order", {
        id: "verify-transaction",
      });
      verifyTransaction(reference, cart);
    }
  }, [searchParams, cart]);

  const verifyTransaction = async (reference: string, cart: Cart) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference, cart }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Payment and order creation successful");
        clearCart();
        window.location.href = "/cart";
      } else {
        toast.error("Payment verification or order creation failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while verifying payment and creating order"
      );
    } finally {
      setIsLoading(false);
      const url = new URL(window.location.href);
      url.searchParams.delete("trxref");
      url.searchParams.delete("reference");
      window.history.replaceState({}, document.title, url.toString());
    }
  };

  const handlePayment = async (data: FormFields) => {
    if (!cart) {
      toast.error("Cart is empty");
      return;
    }

    setIsLoading(true);

    const totalAmount = calculateTotal();

    const splitDetails = Object.entries(cart).map(([farmer, products]) => {
      const subtotal = calculateSubtotal(farmer);
      const paystackSubaccountId = products[0].farmer.paystackSubAccountCode;

      return {
        subaccount: paystackSubaccountId,
        share: subtotal,
      };
    });

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          splitDetails,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          deliveryAddress: data.deliveryAddress,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error("Payment initialization failed");
      }

      const { authorization_url } = result.data.data;

      window.location.href = authorization_url;
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = (): boolean => {
    return !!(reference && trxref);
  };

  if (!cart)
    return (
      <div className="h-screen flex justify-center items-center text-3xl text-gray-500">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="mb-4">
        <h1 className="text-4xl text-center font-bold">Checkout</h1>
      </header>
      <Divider className="my-4" />
      <section className="shipping-info mb-8">
        <h2 className="text-xl text-gray-500 font-bold my-4 underline underline-offset-[10px]">
          Shipping Information
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handlePayment)}
        >
          <div className="flex flex-row gap-4">
            <Controller
              name="fullName"
              control={control}
              rules={{ required: "Full Name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Full Name"
                  required
                  isDisabled={isDisabled()}
                  isInvalid={!!errors.fullName?.message}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: "Phone Number is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Phone Number"
                  required
                  isDisabled={isDisabled()}
                  isInvalid={!!errors.phoneNumber?.message}
                  errorMessage={errors.phoneNumber?.message}
                />
              )}
            />
          </div>
          <Controller
            name="deliveryAddress"
            control={control}
            rules={{ required: "Delivery Address is required" }}
            render={({ field }) => (
              <Input
                {...field}
                label="Delivery Address"
                required
                isDisabled={isDisabled()}
                isInvalid={!!errors.deliveryAddress?.message}
                errorMessage={errors.deliveryAddress?.message}
              />
            )}
          />

          <Divider className="my-4" />
          <section>
            <h2 className="text-xl text-gray-500 font-bold my-4 underline underline-offset-[10px]">
              Order Summary
            </h2>
            {Object.entries(cart).map(([farmer, products]) => (
              <div key={farmer} className="mb-8">
                <h2 className="text-lg text-gray-600 font-semibold mb-2">
                  {farmer}
                </h2>
                <div className="flex flex-row overflow-x-auto gap-4 pb-4">
                  {(
                    products as (ProductWithReviews & { quantity: number })[]
                  ).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4"
                    >
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover"
                          radius="none"
                          isZoomed
                        />
                      </Link>
                      <div className="flex flex-col">
                        <h4 className="text-lg font-semibold">
                          {product.name}
                        </h4>
                        <p className="text-gray-600">
                          GHS {product.price.toFixed(2)}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-right text-gray-500 font-semibold mt-2">
                  Subtotal: GHS {calculateSubtotal(farmer)}
                </p>
                <Divider className="my-4" />
              </div>
            ))}
            <div className="flex flex-col gap-4 w-full justify-end items-end mt-8">
              <h2 className="text-xl font-bold mr-4">
                Total: GHS {calculateTotal()}
              </h2>
            </div>
          </section>
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              fullWidth
              className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
              type="submit"
              isLoading={isLoading}
            >
              Place Order
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Checkout;
