import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/utils/prisma";
import { ProductWithReviews } from "@/types/ProductTypes";
import { auth } from "@/utils/auth/auth";

function generateOrderID(): string {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

export async function POST(req: NextRequest) {
  const { reference, cart } = await req.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, data } = response.data;
    if (!status) {
      return NextResponse.json({
        success: false,
        message: "Transaction verification failed",
      });
    }

    const { fullName, phoneNumber, deliveryAddress } = data.metadata;

    for (const [farmer, products] of Object.entries(cart)) {
      for (const product of products as (ProductWithReviews & {
        quantity: number;
      })[]) {
        await prisma.order.create({
          data: {
            orderID: generateOrderID(),
            amount: product.price * product.quantity,
            name: fullName,
            address: deliveryAddress,
            contact: phoneNumber,
            quantity: product.quantity,
            user: { connect: { id: session.user.id } },
            product: { connect: { id: product.id } },
            status: "Pending",
            farmer: { connect: { id: product.farmer.id } },
          },
        });
      }
    }

    return NextResponse.json(
      { success: true, message: "Order placed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
