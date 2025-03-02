/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { PrimaryButton } from "../components/buttons/PrimaryButton";
import { CheckFeature } from "../components/CheckFeature";
import { BACKEND_URL } from "../config";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setError(null); // Reset error before making request

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username: email,
        password,
        name,
      });

      if (response.status === 201 || response.status === 200) {
        router.push("/login"); // ✅ Redirect after successful signup
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred during signup.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
      console.error("Signup error:", err);
    }
  };

  return (
    <>
      <Appbar />
      <div className="flex justify-center items-center p-12 mx-auto max-w-4xl">
        {/* Left Section - Features */}
        <div className="w-1/2 pr-8">
          <div className="font-bold text-2xl">
            Join millions worldwide who automate their work using Kraven.
          </div>
          <div className="mt-4 space-y-2">
            <CheckFeature label="Easy setup, no coding required." />
            <CheckFeature label="Save time with automation." />
            <CheckFeature label="Integrate with your favorite apps." />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-1/2 flex flex-col items-center p-8 rounded-lg border shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="w-full max-w-sm">
            <label className="block text-sm font-medium text-gray-700">* Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700">* Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700">* Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded-md mb-4"
            />

            <div className="pt-4 flex justify-center">
              <PrimaryButton onclick={handleSignup} size="big">
                Get started FREE
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
