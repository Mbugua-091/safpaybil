import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const response = NextResponse.next();

  // Allow all origins (you can replace '*' with specific URLs)
  response.headers.set("Access-Control-Allow-Origin", "*");
  
  // Allow the necessary methods
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  
  // Allow specific headers
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // If it's an OPTIONS request, return a successful response without further processing
  if (req.method === "OPTIONS") {
    return response;
  }

  return response;
}
