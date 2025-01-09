"use client";

import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function generateToken() {
    const res = await fetch("/api/generateToken");
    const data = await res.json();
    setToken(data.access_token);
  }

  async function registerURLs() {
    const res = await fetch("/api/registerURLs", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
  // If token is expired, regenerate it and retry the request
  if (data.error && data.error.errorCode === "401.003.01") {
    alert("Token expired! Regenerating token...");
    await generateToken(); // Regenerate token
    return registerURLs(); // Retry the register URLs call
  }
 
    setMessage(`Register URLs: ${JSON.stringify(data)}`);
  }

  async function simulateTransaction() {
    const res = await fetch("/api/simulateTransaction", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    setMessage(`Transaction Simulation: ${JSON.stringify(data)}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="space-y-4">
        <button
          onClick={generateToken}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 disabled:bg-gray-400"
        >
          Generate Token
        </button>
        <button
          onClick={registerURLs}
          disabled={!token}
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 disabled:bg-gray-400"
        >
          Register URLs
        </button>
        <button
          onClick={simulateTransaction}
          disabled={!token}
          className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600 disabled:bg-gray-400"
        >
          Simulate Transaction
        </button>
      </div>
      <p className="mt-4 text-center text-gray-700">{message}</p>
    </div>
  );
}
