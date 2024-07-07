import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/utils/auth/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const { amount, splitDetails, fullName, phoneNumber, deliveryAddress, cart } =
    await req.json();

  try {
    const splitResponse = await axios.post(
      "https://api.paystack.co/split",
      {
        name: "Order Split",
        type: "flat",
        currency: "GHS",
        subaccounts: splitDetails.map((detail: any) => ({
          ...detail,
          share: detail.share * 100,
        })),
        bearer_type: "all-proportional",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const splitGroupId = splitResponse.data.data.split_code;

    const transactionResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: session?.user?.email,
        amount: amount * 100,
        currency: "GHS",
        split_code: splitGroupId,
        channels: ["card", "mobile_money"],
        callback_url: `${process.env.AUTH_URL}/checkout`,
        metadata: {
          fullName,
          phoneNumber,
          deliveryAddress,
          cart,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ success: true, data: transactionResponse.data });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
