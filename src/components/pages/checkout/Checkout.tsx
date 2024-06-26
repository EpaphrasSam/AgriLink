"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import useCartStore from "@/store/useCartStore";
import {
  Button,
  Divider,
  Image,
  Input,
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";

const Checkout = () => {
  const cart = useStore(useCartStore, (state) => state.cart);
  const { calculateSubtotal, calculateTotal } = useCartStore((state) => ({
    calculateSubtotal: state.calculateSubtotal,
    calculateTotal: state.calculateTotal,
  }));

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phoneNumber: "",
    deliveryAddress: "",
    saveAddress: false,
  });

  const [paymentInfo, setPaymentInfo] = useState({
    mobileNumber: "",
    network: "",
  });

  const handleShippingChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentChange = (e: any) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!cart) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="mb-4 ]">
        <h1 className="text-4xl text-center font-bold">Checkout</h1>
      </header>
      <Divider className="my-4" />
      <section className="shipping-info mb-8">
        <h2 className="text-xl text-gray-500 font-bold my-4 underline underline-offset-[10px]">
          Shipping Information
        </h2>
        <form className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Input
              label="Full Name"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleShippingChange}
              required
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={shippingInfo.phoneNumber}
              onChange={handleShippingChange}
              required
            />
          </div>
          <Input
            label="Delivery Address"
            name="deliveryAddress"
            value={shippingInfo.deliveryAddress}
            onChange={handleShippingChange}
            required
          />

          <Checkbox
            name="saveAddress"
            checked={shippingInfo.saveAddress}
            onChange={handleShippingChange}
          >
            Save address
          </Checkbox>
        </form>
      </section>

      <Divider className="my-4" />

      <section className="payment-info mb-8">
        <h2 className="text-xl text-gray-500 font-bold my-4 underline underline-offset-[10px]">
          Payment Information
        </h2>
        <form className="flex gap-4">
          <Select
            label="Network"
            name="network"
            value={paymentInfo.network}
            onChange={handlePaymentChange}
          >
            <SelectItem key="MTN" value="MTN">
              MTN Mobile Money
            </SelectItem>
            <SelectItem key="Telecel" value="Telecel">
              Telecel Cash
            </SelectItem>
            <SelectItem key="AirtelTigo" value="AirtelTigo">
              AirtelTigo Cash
            </SelectItem>
          </Select>
          <Input
            label="Mobile Number"
            type="number"
            name="mobileNumber"
            value={paymentInfo.mobileNumber}
            onChange={handlePaymentChange}
          />
        </form>
      </section>

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
              {products.map((product) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover"
                      radius="none"
                      isZoomed
                    />
                  </Link>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{product.title}</h4>
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
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
