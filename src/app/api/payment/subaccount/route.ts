import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/utils/auth/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const { businessName, bankCode, accountNumber } = await req.json();

  try {
    const response = await axios.post(
      "https://api.paystack.co/subaccount",
      {
        business_name: businessName,
        bank_code: bankCode,
        account_number: accountNumber,
        percentage_charge: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const subaccountCode = response.data.data.subaccount_code;
    return NextResponse.json({ success: true, subaccountCode });
  } catch (error: any) {
    console.error(
      "Paystack Error:",
      error.response ? error.response.data : error.message
    );
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get("https://api.paystack.co/bank", {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    return NextResponse.json({ success: true, banks: response.data.data });
  } catch (error: any) {
    console.error(
      "Paystack Error:",
      error.response ? error.response.data : error.message
    );
    return NextResponse.json({ success: false, error: error.message });
  }
}
