import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const consumerKey = process.env.CONSUMER_KEY!;
  const consumerSecret = process.env.CONSUMER_SECRET!;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    // Narrowing down the 'error' type
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 }
      );
    }

    // Handle non-Axios errors
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fallback for unexpected error types
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}
