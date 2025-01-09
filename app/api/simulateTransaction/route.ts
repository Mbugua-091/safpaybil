import { NextResponse } from "next/server";
import axios from "axios";

interface SimulateTransactionRequest {
  token: string;
}

export async function POST(req: Request) {
  const body: SimulateTransactionRequest = await req.json();
  const { token } = body;

  const data = {
    ShortCode: "600000", // Sandbox shortcode
    CommandID: "CustomerPayBillOnline",
    Amount: "100",
    Msisdn: "254708374149", // Sandbox phone number
    BillRefNumber: "Test123",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
