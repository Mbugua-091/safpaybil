import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Confirmation Request:", body);

  return NextResponse.json({
    ResultCode: 0,
    ResultDesc: "Confirmation received successfully",
  });
}
