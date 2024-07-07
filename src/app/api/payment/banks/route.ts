import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(
      "https://api.paystack.co/bank?country=ghana",
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return NextResponse.json({ success: true, banks: response.data.data });
  } catch (error: any) {
    console.error(
      "Paystack Error:",
      error.response ? error.response.data : error.message
    );
    return NextResponse.json({ success: false, error: error.message });
  }
}
