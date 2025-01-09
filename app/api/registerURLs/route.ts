import { NextResponse } from "next/server";
import axios from "axios";

interface RegisterURLsRequest {
  token: string;
}

export async function POST(req: Request) {
  const body: RegisterURLsRequest = await req.json();
  const { token } = body;

  const data = {
    ShortCode: "600000", // Sandbox shortcode
    ResponseType: "Completed",
    ConfirmationURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirmation`,
    ValidationURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/validation`,
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl",
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
